import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { followerId, followingId } = req.query;

  try {
    const query = `*[_type == "follow" && followerId._ref == $followerId && followingId._ref == $followingId][0]`;
    const followRecord = await client.fetch(query, { followerId, followingId });

    res.status(200).json({ isFollowing: !!followRecord });
  } catch (error) {
    res.status(500).json({ message: 'Error checking follow status' });
  }
}
