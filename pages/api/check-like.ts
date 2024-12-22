import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId, postId } = req.query;

    try {
      const data = await client.fetch(
        `*[_type == "post" && _id == $postId && count(likes[_ref == $userId]) > 0]`,
        { postId, userId }
      );

      const isLiked = data.length > 0;
      res.status(200).json({ isLiked });
    } catch (error) {
      console.error('Error checking like status:', error);
      res.status(500).json({ message: 'Error checking like status' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
