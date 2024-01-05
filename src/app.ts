import express, { Express, Request, Response, Application } from "express";
import morgan from "morgan";

const app = express();

app.use(morgan("combined"));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

export default app;
