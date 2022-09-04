import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter, projectRouter } from "./routes/api.router";

require("dotenv").config();

const app: express.Application = express();

const allowedOrigins = [
    '*',
];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200 // For legacy browser support
}

app.use(morgan("combined"));
app.use(bodyParser.json({ type: "application/json" }));
app.use(cors(corsOptions));

app.use("/api", userRouter);
app.use("/api", projectRouter);

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
