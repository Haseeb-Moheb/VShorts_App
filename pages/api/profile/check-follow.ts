import type { NextApiRequest, NextApiResponse } from 'next';
import { client } from '@/utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { followerId, followingId } = req.query;

  try {
    const query = `*[_type == "follow" && follower._ref == "${followerId}" && followee._ref == "${followingId}"][0]`;
    const followStatus = await client.fetch(query);

    if (followStatus) {
      res.status(200).json({ isFollowing: true, isRequested: false }); // Assuming immediate follow
    } else {
      res.status(200).json({ isFollowing: false, isRequested: false });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to check follow status' });
  }
}
