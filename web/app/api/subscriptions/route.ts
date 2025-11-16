import { prisma } from '@/lib/prisma';

export async function GET() {
  const subs = await prisma.subscription.findMany({ include: { user: true } });
  return new Response(JSON.stringify(subs), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}