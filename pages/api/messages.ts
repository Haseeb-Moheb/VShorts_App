import type { NextApiRequest, NextApiResponse } from 'next';

import { serverClient } from '@/lib/sanity.server';

const conversationQuery = `*[_type == "message" && (
  (sender._ref == $userId && recipient._ref == $recipientId) ||
  (sender._ref == $recipientId && recipient._ref == $userId)
)] | order(timestamp asc)`;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId, recipientId } = req.query;
    if (typeof userId !== 'string' || typeof recipientId !== 'string') {
      return res.status(400).json({ message: 'userId and recipientId are required' });
    }

    try {
      const messages = await serverClient.fetch(conversationQuery, { userId, recipientId });
      res.status(200).json(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
      res.status(500).json({ message: 'Error fetching messages' });
    }
  } else if (req.method === 'POST') {
    const { senderId, recipientId, content } = req.body ?? {};
    if (
      typeof senderId !== 'string' ||
      typeof recipientId !== 'string' ||
      typeof content !== 'string' ||
      !content.trim()
    ) {
      return res.status(400).json({ message: 'senderId, recipientId and content are required' });
    }

    try {
      const message = await serverClient.create({
        _type: 'message',
        sender: { _type: 'reference', _ref: senderId },
        recipient: { _type: 'reference', _ref: recipientId },
        content,
        timestamp: new Date().toISOString(),
      });
      res.status(201).json(message);
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ message: 'Error sending message' });
    }
  } else {
    res.setHeader('Allow', 'GET, POST');
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
