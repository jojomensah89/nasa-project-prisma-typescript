import express, { Express, Request, Response, Application } from "express";

import { getAllPlanets } from "../../models/planets.model";

async function httpGetAllPlanets(req: Request, res: Response) {
  return res.status(200).json(await getAllPlanets());
}

export { httpGetAllPlanets };
