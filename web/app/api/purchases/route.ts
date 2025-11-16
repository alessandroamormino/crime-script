import { prisma } from '@/lib/prisma';

export async function GET() {
  const purchases = await prisma.purchase.findMany({ include: { user: true, episode: true } });
  return new Response(JSON.stringify(purchases), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}