import { Request, Response } from "express";
import * as Joi from 'joi';
import { DB } from "../../database/models";

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
}

export { ProjectController };
