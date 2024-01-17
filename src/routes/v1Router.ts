import express from "express";
import launchesRouter from "./launches/launches.router";
import planetsRouter from "./planets/planets.router";

const v1Router = express.Router();

v1Router.use("/launches", launchesRouter);
v1Router.use("/planets", planetsRouter);

export default v1Router;
