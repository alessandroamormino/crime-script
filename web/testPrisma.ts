import { prisma } from './lib/prisma';

async function main() {
  const c = await prisma.case.findMany({ include: { episodes: true } });
  console.log(c);
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());