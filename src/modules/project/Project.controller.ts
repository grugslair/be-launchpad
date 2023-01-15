import { Request, Response } from "express";
import * as Joi from 'joi';
import { DB } from "../../database/models";
import Web3 from "web3";

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
      const error = process.env.NODE_ENV === 'production' ?
      {} :
      validationResult.error.details;

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
    const userAddress = "0x9167FBAC997122F1Eb2B8c1757c2b4eF831a7440" // get this from request body payload
    const commitAmount = 100 // get this from request body payload
    const web3 = new Web3('wss://goerli-light.eth.linkpool.io/ws'); // for goerli, for mainnet wss://main-light.eth.linkpool.io/ws -- can store this to .env
    const crowdSmartContract = "0x8F617f24476334EF73dC2aD8De1F07cC00c9dE46" // need to store crowd smart contract for each project in DB
    const salt = Date.now(); // random unique number

    // 
    const account = web3.eth.accounts.privateKeyToAccount(process.env.AUTHORIZED_SIGNER_PRIVATE_KEY!);
    console.log(account);
    
    // concat & hash the message
    const hashMsg = web3.utils.soliditySha3(userAddress, commitAmount, crowdSmartContract, salt);

    // generate signature from the concated data
    const signature = await web3.eth.accounts.sign(hashMsg!, account.privateKey);
    console.log("Sample signature: ", signature.signature);
    return res.send({message: signature.signature})
  }
}

export { ProjectController };
