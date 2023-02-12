import { Request, Response } from "express";
import * as Joi from 'joi';
import { DB } from "../../database/models";
import Web3 from "web3";
import Redis from "../../utils/redis";
import { TRANSACTION_STATUS } from "../../utils/constants";
const { env } = process;


const isProd = () => env.NODE_ENV === 'production';
class ProjectController {
  public async getActiveProjects(req: Request, res: Response) {
    const projects = await DB.Project.findAll({
      where: { status: 'on_going' },
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

    return res.send(projects);
  }

  public async getProjectById(req: Request, res: Response) {
    const { params: { projectId }, query: { walletAddress } } = req;
    let isRegistered = false;
    let investedAmount = 0;

    if (walletAddress) {
      const registration = await DB.Registration.findOne({
        where: { projectId, walletAddress }
      });

      if (registration) isRegistered = true;

      const commits = await DB.Commit.findAll({
        where: {
          walletAddress,
          projectId,
          status: TRANSACTION_STATUS.SUCCESS
        }
      });

      const totalInvested = commits.reduce((a, b) => a += b.amount, 0);

      investedAmount = totalInvested;
    }

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

    return res.send({ isRegistered, investedAmount, project });
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
      timestamp: Joi.date().required(),
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
      await DB.Commit.create(req.body);

      return res.send({ success: true, alreadyRegsiter: false });
    } catch (e) {
      console.log('Registration failed', e);
      return res.send({ success: false, alreadyRegister: false });
    }
  }

  public async generateSignature(req: Request, res: Response) {
    const REDIS_KEY = 'user:signature';

    const schema = Joi.object().keys({
      projectId: Joi.number().required(),
      commitAmount: Joi.number().required(),
      walletAddress: Joi.string().required(),
    });
    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      const error = isProd() ? {} : validationResult.error.details;

      return res.status(422).json({ message: 'Invalid request', error });
    }

    const { commitAmount, projectId, walletAddress } = req.body;

    const key = `${walletAddress}:${projectId}`;
    const alreadyExist = await Redis.getKey(REDIS_KEY, key);

    if (alreadyExist) res.send({ message: alreadyExist });

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
      const signature = await web3.eth.accounts.sign(hashMsg!, account.privateKey);

      await Redis.setKeyWithExpiry(REDIS_KEY, walletAddress, signature.signature, 3000); // 5 minutes
  
      return res.send({ message: signature.signature })
    } catch (e) {
      console.log(`Failed to generate signature for project: ${project.name} & address: ${walletAddress}`);
      console.error(e);
      return res.send({ message: null })
    }
  }

}

export { ProjectController };
