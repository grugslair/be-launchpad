import { Request, Response } from "express";

class AuthController {
  public async test(req: Request, res: Response) {
    return res.send({message: "Ok"})
  }
}

export { AuthController };