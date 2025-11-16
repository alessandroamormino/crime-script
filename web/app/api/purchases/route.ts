import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const purchases = await prisma.purchase.findMany({
      include: { user: true, episode: true },
    });
    return res.status(200).json(purchases);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}