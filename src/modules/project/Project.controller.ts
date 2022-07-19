import { Request, Response } from "express";
import { DB } from "../../database/models";

class ProjectController {
  public async getActiveProjects(req: Request, res: Response) {
    const projects = await DB.Project.findAll({ where: { status: 'pending' } });

    return res.send(projects);
  }
}

export { ProjectController };