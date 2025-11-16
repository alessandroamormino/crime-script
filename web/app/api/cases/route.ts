import { prisma } from '@/lib/prisma';

export async function GET() {
  const cases = await prisma.case.findMany({ include: { episodes: true } });
  return new Response(JSON.stringify(cases), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}