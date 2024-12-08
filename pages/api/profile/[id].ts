import type { NextApiRequest, NextApiResponse } from 'next';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from './../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const query = singleUserQuery(id as string);
      const userVideosQuery = userCreatedPostsQuery(id as string);
      const userLikedVideosQuery = userLikedPostsQuery(id as string);

      const user = await client.fetch(query);
      const userVideos = await client.fetch(userVideosQuery);
      const userLikedVideos = await client.fetch(userLikedVideosQuery);

      const data = { user: user[0], userVideos, userLikedVideos };

      res.status(200).json(data);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching user data' });
    }
  } else if (req.method === 'POST') {
    const { followerId, followingId } = req.body;

    try {
      await client.create({
        _type: 'follow',
        followerId: {
          _type: 'reference',
          _ref: followerId
        },
        followingId: {
          _type: 'reference',
          _ref: followingId
        }
      });
      res.status(200).json({ message: 'Followed successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error following user' });
    }
  } else if (req.method === 'DELETE') {
    const { followerId, followingId } = req.body;

    try {
      const query = `*[_type == "follow" && followerId._ref == $followerId && followingId._ref == $followingId][0]`;
      const followRecord = await client.fetch(query, { followerId, followingId });

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
