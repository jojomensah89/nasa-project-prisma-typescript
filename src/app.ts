import express, { Express, Request, Response, Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import v1Router from "./routes/v1Router";

const app = express();

app.use(morgan("dev"));
// app.use(morgan("combined"));
app.use(helmet());
app.use(express.json());

app.use("/v1", v1Router);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript  Nasa Launches Server");
});
export default app;
