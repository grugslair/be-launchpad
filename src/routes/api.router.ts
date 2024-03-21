import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../modules/auth/Auth.controller";
import { ProjectController } from "../modules/project/Project.controller";
import { ReportController } from "../modules/report/Report.controller";
import { WalletBindingController } from "../modules/walletBinding/WalletBinding.controller";

const userRouter: Router = express.Router();
// Can define more router if needed

// Controller initialization
const authController = new AuthController();
const projectController = new ProjectController();
const reportController = new ReportController();
const walletController = new WalletBindingController();

const wrap = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = fn(req, res, next);
    return result.catch(next);
  } catch (err) {
    return next(err);
  }
};

userRouter.get("/ping", wrap(authController.test))

/* --- Authentication Route --- */
/**
 * Flow:
 * 1. .....
 */
// userRouter.post("/auth/login", wrap(AuthControllerObj.login))

const apiRouter = express.Router();

apiRouter.get('/projects', wrap(projectController.getActiveProjects));
apiRouter.get('/projects/:projectId', wrap(projectController.getProjectById));
apiRouter.post('/projects/register', wrap(projectController.registerForProject));
apiRouter.post('/projects/invest', wrap(projectController.investForProject));
apiRouter.post('/projects/signature', wrap(projectController.generateSignature));

apiRouter.get('/reports', wrap(reportController.getAllReports));

apiRouter.get('/wallet/whitelist', wrap(walletController.checkWhitelist));
apiRouter.get('/wallet/binding', wrap(walletController.checkBinding));
apiRouter.put('/wallet/binding', wrap(walletController.binding));
apiRouter.put('/wallet/unbinding', wrap(walletController.unbinding));

export { userRouter, apiRouter };
