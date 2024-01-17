import { PrismaClient } from "@prisma/client";
import { Launch } from "../types/launches";

const prisma = new PrismaClient();

async function getAllLaunches() {
  const allLaunches = await prisma.launches.findMany();
  return allLaunches;
}

async function scheduleNewLaunch(launch: Launch) {}

async function abortLaunchById(launchId: number) {}

export { getAllLaunches, scheduleNewLaunch, abortLaunchById };
