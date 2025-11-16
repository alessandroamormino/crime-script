import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const casesList = await prisma.Case.findMany({
      include: { episodes: true },
    });
    return new Response(JSON.stringify(casesList), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('API /cases error:', error);
    return new Response(
      JSON.stringify({ error: 'Internal Server Error', details: error }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}