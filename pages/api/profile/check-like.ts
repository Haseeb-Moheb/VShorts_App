// import type { NextApiRequest, NextApiResponse } from 'next';
// import { client } from '@/utils/client';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   const { userId, postId } = req.query;

//   try {
//     const query = `*[_type == "post" && _id == "${postId}" && "${userId}" in likes[]._ref][0]`;
//     const likeStatus = await client.fetch(query);

//     if (likeStatus) {
//       res.status(200).json({ isLiked: true });
//     } else {
//       res.status(200).json({ isLiked: false });
//     }
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to check like status' });
//   }
// }
