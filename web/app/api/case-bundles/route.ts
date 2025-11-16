import { prisma } from '@/lib/prisma';

export async function GET() {
  const bundles = await prisma.caseBundle.findMany({ include: { user: true, case: true } });
  return new Response(JSON.stringify(bundles), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}