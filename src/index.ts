import express from "express";
import { Request, Response, NextFunction } from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { userRouter, apiRouter } from "./routes/api.router";
import { RedisClient } from "./utils/redis";

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
app.use(cors());

app.use("/api", apiRouter);
app.use("/api", userRouter);

app.get('/:number', (req: Request, res: Response) => {
  const { number } = req.params;
  const num = parseInt(number, 10);
  if (isNaN(num)) {
    return res.status(400).send({ error: "Parameter must be a number" });
  }
  res.status(200).json({
    name: "Test Club",
    description: "This is just a description",
    image: "https://grugslair.fra1.digitaloceanspaces.com/club.gif",
    attributes: [] // This is an empty array, ready to be filled with attributes if needed
  });
});


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

app.listen(port, async () => {
  console.log(`listening to port ${port}...`);

  await RedisClient.client.connect();
});
