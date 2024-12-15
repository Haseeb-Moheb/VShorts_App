import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, postId } = req.body;

    try {
      await client.create({
        _type: 'like',
        user: {
          _type: 'reference',
          _ref: userId,
        },
        post: {
          _type: 'reference',
          _ref: postId,
        },
      });
      res.status(200).json({ message: 'Liked successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error liking post' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
