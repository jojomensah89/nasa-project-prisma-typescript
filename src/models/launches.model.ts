import { PrismaClient } from "@prisma/client";
import { Launch } from "../types/launches";

const prisma = new PrismaClient();

async function getAllLaunches(skip: number, take: number) {
  const allLaunches = await prisma.launches.findMany({
    skip: skip,
    take: take,
    orderBy: {
      flightNumber: "asc",
    },
  });
  return allLaunches;
}

async function scheduleNewLaunch(launch: Launch) {}

async function abortLaunchById(launchId: number) {
//   try {
//     const aborted = await prisma.launches.update({
//       where: {
//         flightNumber: launchId,
//       },
//       data: {
//         upcoming: false,
//         success: false,
//       },
//     });
//   } catch (error) {
//     console.error("Failed to abort to launch", error);
//   }
}

export { getAllLaunches, scheduleNewLaunch, abortLaunchById };
