import type { NextApiRequest, NextApiResponse } from 'next';

import { serverClient } from '@/lib/sanity.server';

const ALLOWED_TYPES = ['video/mp4', 'video/webm', 'video/ogg'];

// Stream the raw request body straight to Sanity instead of parsing it.
export const config = {
  api: { bodyParser: false },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const contentType = req.headers['content-type'] ?? '';
  if (!ALLOWED_TYPES.includes(contentType)) {
    return res.status(415).json({ message: 'Unsupported file type' });
  }

  const filename = typeof req.query.filename === 'string' ? req.query.filename : undefined;

  try {
    const asset = await serverClient.assets.upload('file', req, { contentType, filename });
    res.status(200).json(asset);
  } catch (error) {
    console.error('Error uploading video:', error);
    res.status(500).json({ message: 'Error uploading video' });
  }
}
