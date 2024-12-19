// import type { NextApiRequest, NextApiResponse } from 'next';
// import { client } from '@/utils/client';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'DELETE') {
//     const { userId, postId } = req.body;

//     try {
//       const query = `*[_type == "like" && user._ref == "${userId}" && post._ref == "${postId}"][0]`;
//       const likeRecord = await client.fetch(query);

//       if (likeRecord) {
//         await client.delete(likeRecord._id);
//         res.status(200).json({ message: 'Unliked successfully' });
//       } else {
//         res.status(404).json({ message: 'Like record not found' });
//       }
//     } catch (error) {
//       res.status(500).json({ message: 'Error unliking post' });
//     }
//   } else {
//     res.status(405).json({ message: 'Method Not Allowed' });
//   }
// }
