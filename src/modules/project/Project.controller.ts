import { Promise as BluePromise } from "bluebird";
import { Request, Response } from "express";
import * as Joi from 'joi';
import Web3 from "web3";
import moment from "moment";
import { DB } from "../../database/models";
import { RedisClient } from "../../utils/redis";
import { TRANSACTION_STATUS } from "../../utils/constants";
import { Includeable } from "sequelize/types";
const { env } = process;


const isProd = () => env.NODE_ENV === 'production';

const SIGNATURE_REDIS_KEY = 'user:signature';

interface CachedSignature {
  convertedAmount: number
  signature: string
  salt: number
  expiryAt: Date
}

class ProjectController {
  constructor() {
    this.getProjectById = this.getProjectById.bind(this);
    this.getActiveProjects = this.getActiveProjects.bind(this);
  }

  async #getTotalLock(projectId: number) {
    let totalLock = 0;

    const scanResult = RedisClient.scanPattern(`${SIGNATURE_REDIS_KEY}:${projectId}`);
    await BluePromise.mapSeries(scanResult, async (key) => {
      const cachedSignature = await RedisClient.client.get(key);

      if (cachedSignature) {
        const cacheObj = JSON.parse(cachedSignature) as CachedSignature;
        totalLock += cacheObj.convertedAmount;
      }
    });

    return totalLock;
  }

  public async getActiveProjects(req: Request, res: Response) {
    const { query: { walletAddress } } = req;

    const where = { status: 'on_going' };
    const include: Includeable[] = [
      {
        model: DB.Chain
      },
      {
        model: DB.VestingRule
      },
      {
        model: DB.Currency,
        include: [{
          model: DB.Chain,
          through: { attributes: [] },
        }]
      },
    ];

    if (walletAddress) {
      include.push(
        {
          model: DB.Registration,
          required: false,
          where: { walletAddress },
        },
      );
    }

    const options = { where, include };

    const projects = await DB.Project.findAll(options);

    const response = await BluePromise.mapSeries(projects, async prj => {
      const project = JSON.parse(JSON.stringify(prj));
      let investedAmount = 0; // invested by user
      let totalInvestedAmount = 0; // invested by all users

      const commits = await DB.Commit.findAll({
        where: {
          projectId: project.id,
          status: TRANSACTION_STATUS.SUCCESS
        }
      });

      const totalLock = await this.#getTotalLock(Number(project.id));
      const totalInvested = commits.reduce((a, b) => a += b.amount, 0);
      const totalInvestedByUser = commits
        .filter((a) => a.walletAddress === walletAddress)
        .reduce((a, b) => a += b.amount, 0);

      investedAmount = totalInvestedByUser + totalLock;
      totalInvestedAmount = totalInvested + totalLock;
      Object.assign(project, { investedAmount, totalInvestedAmount });

      return project;
    });

    return res.send(response);
  }

  public async getProjectById(req: Request, res: Response) {
    const { params: { projectId }, query: { walletAddress } } = req;
    let isRegistered = false;
    let investedAmount = 0; // invested by user
    let totalInvestedAmount = 0; // invested by all users
    let maxAllocation = 0;

    const project = await DB.Project.findByPk(req.params.projectId, {
      include: [
        {
          model: DB.VestingRule
        },
        {
          model: DB.Currency,
          include: [{
            model: DB.Chain,
            through: { attributes: [] },
          }]
        },
        {
          model: DB.Chain
        }
      ]
    });
    
    if (walletAddress && project) {
      const registrations = await DB.Registration.findAll({
        where: { projectId }
      });

      const userRegistration = registrations.filter((reg) => reg.walletAddress === walletAddress);

      if (userRegistration.length) isRegistered = true;

      const commits = await DB.Commit.findAll({
        where: {
          projectId,
          status: TRANSACTION_STATUS.SUCCESS
        }
      });

      const totalLock = await this.#getTotalLock(Number(projectId));
      const totalInvested = commits.reduce((a, b) => a += b.amount, 0);
      const totalInvestedByUser = commits
        .filter((a) => a.walletAddress === walletAddress)
        .reduce((a, b) => a += b.amount, 0);

      investedAmount = totalInvestedByUser + totalLock;
      totalInvestedAmount = totalInvested + totalLock;

      const totalStake = registrations.reduce((a, b) => a += b.amount, 0);
      const totalStakeByUser = userRegistration.reduce((a, b) => a += b.amount, 0);
      maxAllocation = totalStakeByUser / totalStake * project.maxAllocation;
    }

    return res.send({
      isRegistered,
      investedAmount,
      totalInvestedAmount,
      maxAllocation,
      project
    });
  }

  public async registerForProject(req: Request, res: Response) {
    const schema = Joi.object().keys({
      projectId: Joi.number().required(),
      walletAddress: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const error = isProd() ? {} : validationResult.error.details;

      return res.status(422).json({ message: 'Invalid request', error });
    }

    try {
      const registration = await DB.Registration.findOne({
        where: {
          projectId: req.body.projectId,
          walletAddress: req.body.walletAddress,
        }
      });
  
      if (registration) return res.send({ success: true, alreadyRegister: true });
  
      await DB.Registration.create(req.body);
  
      return res.send({ success: true, alreadyRegsiter: false });
    } catch (e) {
      console.log('Registration failed', e);
      return res.send({ success: false, alreadyRegister: false });
    }
  }

  public async investForProject(req: Request, res: Response) {
    const schema = Joi.object().keys({
      hash: Joi.string().required(),
      projectId: Joi.number().required(),
      walletAddress: Joi.string().required(),
      amount: Joi.number().required()
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const error = isProd() ? {} : validationResult.error.details;

      return res.status(422).json({ message: 'Invalid request', error });
    }

    try {
      const { hash, ...rest } = req.body;
      await DB.Commit.create({ ...rest, trxTimestamp: new Date(), trxHash: hash });
      const redisKey = `${req.body.projectId}:${req.body.walletAddress}`;
      await RedisClient.delKey(SIGNATURE_REDIS_KEY, redisKey);

      return res.send({ success: true });
    } catch (e) {
      console.log('Registration failed', e);
      return res.send({ success: false });
    }
  }

  public async generateSignature(req: Request, res: Response) {
    const schema = Joi.object().keys({
      projectId: Joi.number().required(),
      commitAmount: Joi.number().required(),
      decimal: Joi.number().required(),
      walletAddress: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const error = isProd() ? {} : validationResult.error.details;

      return res.status(422).json({ message: 'Invalid request', error });
    }

    const { commitAmount, decimal, projectId, walletAddress } = req.body;

    const convertedAmount = commitAmount / Math.pow(10, decimal);
    const key = `${projectId}:${walletAddress}`;
    const cachedSignature = await RedisClient.getKey(SIGNATURE_REDIS_KEY, key);
    
    if (cachedSignature) {
      const cacheObj = JSON.parse(cachedSignature) as CachedSignature;

      if (convertedAmount === cacheObj.convertedAmount) {
        return res.send({
          success: true,
          signature: cacheObj.signature,
          salt: cacheObj.salt,
          duration: null,
        });
      } else {
        const duration = moment(cacheObj.expiryAt).diff(moment(), 'minutes');

        return res.send({ success: false, signature: null, salt: null, duration });
      }
    }
    
    const project = await DB.Project.findByPk(projectId);

    if (!project) return res.status(422).json({ message: 'Project not found' }); 

    try {
      const WEB3_URL = isProd() ? env.PRD_WEB3_URL : env.STG_WEB3_URL;
      const web3 = new Web3(WEB3_URL as string);
      const salt = Date.now(); // random unique number
      const account = web3.eth.accounts.privateKeyToAccount(env.AUTHORIZED_SIGNER_PRIVATE_KEY!);
  
      // concat & hash the message
      const hashMsg = web3.utils.soliditySha3(
        walletAddress,
        commitAmount,
        project.crowdSmartContract,
        salt
      );
  
      // generate signature from the concated data
      const { signature } = await web3.eth.accounts.sign(hashMsg!, account.privateKey);

      const cachePayload: CachedSignature = {
        convertedAmount,
        signature,
        salt,
        expiryAt: moment().add(5, 'minutes').toDate()
      }
      const payload: string = JSON.stringify(cachePayload);
      await RedisClient.setKeyWithExpiry(SIGNATURE_REDIS_KEY, key, payload, 300); // 5 minutes

      return res.send({ success: true, signature, salt, duration: null });
    } catch (e) {
      console.log(`Failed to generate signature for project: ${project.name} & address: ${walletAddress}`);
      console.error(e);
      return res.send({ success: false, signature: null, salt: null, duration: null });
    }
  }
}

export { ProjectController };
