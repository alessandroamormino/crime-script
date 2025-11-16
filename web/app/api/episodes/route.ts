import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const episodes = await prisma.episode.findMany({
      include: { case: true },
    });
    return res.status(200).json(episodes);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}