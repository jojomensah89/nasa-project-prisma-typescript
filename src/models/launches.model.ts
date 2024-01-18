import { PrismaClient } from "@prisma/client";
import { Launch } from "../types/launches";

const prisma = new PrismaClient();

let DEFAULT_FLIGHT_NUMBER = 100;

async function getLatestFlightNumber() {
  try {
    const latestLaunch = await prisma.launches.findFirst({
      orderBy: {
        flightNumber: "desc",
      },
    });

    if (!latestLaunch) {
      return DEFAULT_FLIGHT_NUMBER;
    }

    return latestLaunch.flightNumber;
  } catch (error) {
    console.error("Error in getLatestFlightNumber:", error);
    throw new Error("Failed to retrieve the latest flight number");
  }
}
// async function saveLaunch(launch: Launch) {
//   try {
//     const planet = await prisma.planets.findFirst({
//       where: { keplerName: launch.target },
//     });
//     if (!planet) {
//       throw new Error("No matching planet found");
//     }
//     await prisma.launches.upsert({
//       where: {
//         flightNumber: launch.flightNumber,
//       },
//       upsert: { ...launch },
//       create: { ...launch },
//     });
//   } catch (err) {
//     console.error(`Could not save launch ${err}`);
//   }
// }

async function getAllLaunches(skip: number, take: number) {
  try {
    const allLaunches = await prisma.launches.findMany({
      skip: skip,
      take: take,
      orderBy: {
        flightNumber: "asc",
      },
    });

    return allLaunches;
  } catch (error) {
    console.error("Error fetching launches:", error);
  }
}

async function scheduleNewLaunch(launch: Launch) {
  const planet = await prisma.planets.findFirst({
    where: { keplerName: launch.target },
  });
  if (!planet) {
    throw new Error("No mathcing planet found");
  }
  const newFlightNumber = (await getLatestFlightNumber()) + 1;

  const newLaunchData = {
    ...launch,
    success: true,
    upcoming: true,
    v: 0,
    customers: ["Zero to Mastery", "NASA"],
    flightNumber: newFlightNumber,
    target: { connect: { id: planet.id } },
  };
  //   saveLaunch(newLaunchData);

  const newLaunch = await prisma.launches.create({
    data: newLaunchData,
  });

  return newLaunch;
}

async function abortLaunchById(launchId: number) {
  try {
    const aborted = await prisma.launches.update({
      where: {
        flightNumber: launchId,
      },
      data: {
        upcoming: false,
        success: false,
      },
    });
  } catch (error) {
    console.error("Failed to abort to launch", error);
  }
}

export { getAllLaunches, scheduleNewLaunch, abortLaunchById };
