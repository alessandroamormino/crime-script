import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const cases = await prisma.case.findMany({ include: { episodes: true } });
  return NextResponse.json(cases);
}