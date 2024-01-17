import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function getAllPlanets() {
  const allPlanets = await prisma.planets.findMany();
  return allPlanets;
}

export { getAllPlanets };
