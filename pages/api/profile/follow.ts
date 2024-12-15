import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { followerId, followingId } = req.body;

    try {
      await client.create({
        _type: 'follow',
        follower: {
          _type: 'reference',
          _ref: followerId,
        },
        followee: {
          _type: 'reference',
          _ref: followingId,
        },
      });
      res.status(200).json({ message: 'Followed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error following user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
