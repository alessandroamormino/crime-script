import * as dotenv from 'dotenv';
dotenv.config();  // legge .env nella root del progetto

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const episodes = await prisma.episodes.findMany();
  console.log(episodes);
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());