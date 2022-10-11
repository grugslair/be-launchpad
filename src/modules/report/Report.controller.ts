import { Request, Response } from "express";
import { DB } from "../../database/models";

class ReportController {
  public async getAllReports(req: Request, res: Response) {
    const reports = await DB.Report.findAll();

    return res.send(reports);
  }
}

export { ReportController };