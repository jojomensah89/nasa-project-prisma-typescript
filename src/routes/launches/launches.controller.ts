import { Request, Response } from "express";

import { getAllLaunches } from "../../models/launches.model";

async function httpGetAllLaunches(req: Request, res: Response) {
  return res.status(200).json(await getAllLaunches());
}

export { httpGetAllLaunches };
