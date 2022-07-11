import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter } from "./routes/api.router";
import localConfig from "./config/config";

require("dotenv").config();

const app: express.Application = express();

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "application/json" }));
app.use(cors());

app.use("/api", userRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500);

  return res.send({
    message: err.message
  });
});

const port = process.env.APP_PORT || 3000;

app.listen(port, () => {
  console.log(`listening to port ${port}...`);
});
