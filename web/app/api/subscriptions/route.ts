import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const subs = await prisma.subscription.findMany({
      include: { user: true },
    });
    return res.status(200).json(subs);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}