import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    const { followerId, followingId } = req.body;

    try {
      const query = `*[_type == "follow" && follower._ref == "${followerId}" && followee._ref == "${followingId}"][0]`;
      const followRecord = await client.fetch(query);

      if (followRecord) {
        await client.delete(followRecord._id);
        res.status(200).json({ message: 'Unfollowed successfully' });
      } else {
        res.status(404).json({ message: 'Follow record not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error unfollowing user' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
