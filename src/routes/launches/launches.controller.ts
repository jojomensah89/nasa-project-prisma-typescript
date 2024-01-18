import { Request, Response } from "express";

import { getAllLaunches } from "../../models/launches.model";
import { getPagination } from "../../services/query";
async function httpGetAllLaunches(req: Request, res: Response) {
    // console.log(req.query)
  const { skip, take } = getPagination(req.query);
//   console.log({ skip, take });

  return res.status(200).json(await getAllLaunches(skip, take));
}

export { httpGetAllLaunches };
