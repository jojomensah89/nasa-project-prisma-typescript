import { Request, Response } from "express";
import {
  getAllLaunches,
  scheduleNewLaunch,
  abortLaunchById,
  existsLaunchWithId,
} from "../../models/launches.model";
import { getPagination } from "../../services/query";
async function httpGetAllLaunches(req: Request, res: Response) {
  const { skip, take } = getPagination(req.query);

  return res.status(200).json(await getAllLaunches(skip, take));
}

async function httpAddNewLaunch(req: Request, res: Response) {
  const launch = req.body;

  if (!launch || typeof launch !== "object") {
    return res.status(400).json({
      error: "Invalid launch object",
    });
  }

  if (
    !launch.mission ||
    !launch.rocket ||
    !launch.launchDate ||
    !launch.target
  ) {
    return res.status(400).json({
      error: "Missing required launch property",
    });
  }
  launch.launchDate = new Date(launch.launchDate);
  if (
    // launch.launchDate.toString() === "Invalid Date" ||
    isNaN(launch.launchDate)
  ) {
    return res.status(400).json({
      error: "Invalid launch date",
    });
  }
  const newLaunch = await scheduleNewLaunch(launch);

  return res.status(201).json(newLaunch);
}
async function httpAbortLaunch(req: Request, res: Response) {
  const launchId = Number(req.params.id);

  //if launch doesn't exist
  const existsLanuch = await existsLaunchWithId(launchId);
  if (!existsLanuch)
    return res.status(404).json({
      error: "Launch not found",
    });

  // if launch does exist
  const aborted = await abortLaunchById(launchId);
  if (!aborted) {
    return res.status(400).json({
      error: "Launch not aborted",
    });
  }
  return res.status(200).json({ ok: true });
}

export { httpGetAllLaunches, httpAddNewLaunch, httpAbortLaunch };
