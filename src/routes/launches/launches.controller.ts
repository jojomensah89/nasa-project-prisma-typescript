import { Request, Response } from "express";
import { getAllLaunches, scheduleNewLaunch } from "../../models/launches.model";
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

export { httpGetAllLaunches, httpAddNewLaunch };
