import type { NextApiRequest, NextApiResponse } from 'next';
import { allUsersQuery } from './../../utils/queries';
import { publicClient as client } from '@/lib/sanity.public';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const data = await client.fetch(allUsersQuery());
  
  if(data) {
    res.status(200).json(data);
  } else {
    res.json([]);
  }
}
