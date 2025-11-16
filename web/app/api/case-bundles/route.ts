import { prisma } from '@/lib/prisma';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const bundles = await prisma.caseBundle.findMany({
      include: { user: true, case: true },
    });
    return res.status(200).json(bundles);
  }

  return res.status(405).json({ message: 'Method not allowed' });
}