import { prisma } from '@/lib/prisma';

export async function GET() {
  const episodes = await prisma.episode.findMany({ include: { case: true } });
  return new Response(JSON.stringify(episodes), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}