import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const cases = await prisma.case.findMany({
      include: { episodes: true },
    });
    return res.status(200).json(cases);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}