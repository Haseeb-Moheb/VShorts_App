import type { NextApiRequest, NextApiResponse } from 'next';
import { uuid } from 'uuidv4';
import { client } from '../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    const { userId, postId, like } = req.body;

    try {
      const postUpdate = like
        ? client.patch(postId).setIfMissing({ likes: [] }).insert('after', 'likes[-1]', [{ _key: uuid(), _ref: userId }]).commit()
        : client.patch(postId).unset([`likes[_ref=="${userId}"]`]).commit();

      const userUpdate = like
        ? client.patch(userId).setIfMissing({ totalLikes: 0 }).inc({ totalLikes: 1 }).commit()
        : client.patch(userId).setIfMissing({ totalLikes: 0 }).dec({ totalLikes: 1 }).commit();

      const [updatedPost, updatedUser] = await Promise.all([postUpdate, userUpdate]);

      res.status(200).json({ updatedPost, updatedUser });
    } catch (error) {
      console.error('Error updating like status:', error);
      res.status(500).json({ message: 'Error updating like status' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
