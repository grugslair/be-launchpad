import { Request, Response } from "express";
import * as Joi from 'joi';
import { DB } from "../../database/models";
import Web3 from "web3";
import Redis from "../../utils/redis";
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
          model: DB.Currency
        },
        {
          model: DB.Chain
        }
      ]
    });

    return res.send(projects);
  }

  public async getProjectById(req: Request, res: Response) {
    let isRegistered = false;

    if (req.query.walletAddress) {
      const registration = await DB.Registration.findOne({
        where: {
          projectId: req.params.projectId,
          walletAddress: req.query.walletAddress,
        }
      });

      if (registration) isRegistered = true;
    }

    const project = await DB.Project.findByPk(req.params.projectId, {
      include: [
        {
          model: DB.VestingRule
        },
        {
          model: DB.Currency
        },
        {
          model: DB.Chain
        }
      ]
    });

    return res.send({ isRegistered, project });
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
