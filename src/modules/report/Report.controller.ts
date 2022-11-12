import { Request, Response } from "express";
import { DB } from "../../database/models";

class ReportController {
  public async getAllReports(req: Request, res: Response) {
    const isVerified = req.query.isVerified;

    const reports = await DB.Report.findAll();

    const filtered = isVerified ?
      reports :
      reports.map((r) => {
        if (r.type === 'private') r.pdfUrl = '';

        return r;
      });

    return res.send(reports);
  }
}

export { ReportController };
