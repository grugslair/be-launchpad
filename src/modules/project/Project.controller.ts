import { Request, Response } from "express";
import * as Joi from 'joi';
import { DB } from "../../database/models";

class ProjectController {
  public async getActiveProjects(req: Request, res: Response) {
    const projects = await DB.Project.findAll({
      where: { status: 'pending' },
      include: [
        {
          model: DB.VestingRule
        }
      ]
    });

    return res.send(projects);
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

    await DB.Registration.create(req.body);

    return res.send('Ok');
  }
}

export { ProjectController };