import express, { Express, Request, Response, Application } from "express";
import morgan from "morgan";
import helmet from "helmet";

const app = express();

app.use(morgan("dev"));
// app.use(morgan("combined"));
app.use(helmet());


app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
