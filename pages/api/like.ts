import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    try {
      const data = like
        ? await client
            .patch(postId) // Ensure postId is a valid document ID
            .setIfMissing({ likes: [] })
            .insert('after', 'likes[-1]', [
              {
                _key: uuid(),
                _ref: userId,
              },
            ])
            .commit()
        : await client
            .patch(postId) // Ensure postId is a valid document ID
            .unset([`likes[_ref=="${userId}"]`])
            .commit();

      res.status(200).json(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error updating like status:', error.message);
      } else {
        console.error('Error updating like status:', error);
      }
      res.status(500).json({ message: 'Error updating like status' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
