import express, { Express, Request, Response, Application } from "express";
import morgan from "morgan";
import helmet from "helmet";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const app = express();

app.use(morgan("dev"));
// app.use(morgan("combined"));
app.use(helmet());


app.get("/", async (req: Request, res: Response) => {
  const allLaunches= await prisma.launches.findMany();

  return res.status(200).json(allLaunches);
});

export default app;


