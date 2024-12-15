import type { NextApiRequest, NextApiResponse } from 'next';
import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '../../../utils/queries';
import { client } from '../../../utils/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, subPath } = req.query;

  if (req.method === 'GET') {
    try {
      if (subPath === 'followers') {
        const followersQuery = `count(*[_type == "follow" && followee._ref == "${id}"])`;
        const userFollowersCount = await client.fetch(followersQuery);
        return res.status(200).json({ count: userFollowersCount });
      } else if (subPath === 'following') {
        const followingQuery = `count(*[_type == "follow" && follower._ref == "${id}"])`;
        const userFollowingCount = await client.fetch(followingQuery);
        return res.status(200).json({ count: userFollowingCount });
      } else if (subPath === 'likes') {
        const likesQuery = `count(*[_type == "like" && user._ref == "${id}"])`;
        const userLikesCount = await client.fetch(likesQuery);
        return res.status(200).json({ count: userLikesCount });
      }

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
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
