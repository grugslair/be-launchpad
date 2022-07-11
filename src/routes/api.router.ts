import express from "express";
import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../modules/auth/Auth.controller";

const userRouter: Router = express.Router();
// Can define more router if needed

// Controller initialization
const AuthControllerObj = new AuthController();

const wrap = (fn: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = fn(req, res, next);
    return result.catch(next);
  } catch (err) {
    return next(err);
  }
};

userRouter.get("/ping", wrap(AuthControllerObj.test))

/* --- Authentication Route --- */
/**
 * Flow:
 * 1. .....
 */
// userRouter.post("/auth/login", wrap(AuthControllerObj.login))


export { userRouter };
