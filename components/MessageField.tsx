import React, { useState, useEffect } from 'react';
import { client } from '@/utils/client'; // Import Sanity client
import useAuthStore from '@/store/authStore';
import { AiOutlineClose } from 'react-icons/ai'; // Import close icon

interface MessageFieldProps {
  recipientId: string;
  onClose: () => void; // Add onClose prop for closing the message window
}

const MessageField: React.FC<MessageFieldProps> = ({ recipientId, onClose }) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const { userProfile }: any = useAuthStore(); // Get the current user profile

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const query = `*[_type == "message" && ((sender._ref == "${userProfile._id}" && recipient._ref == "${recipientId}") || (sender._ref == "${recipientId}" && recipient._ref == "${userProfile._id}"))] | order(timestamp asc)`;
        const res = await client.fetch(query);
        setMessages(res);
      } catch (error) {
        console.error('Error fetching messages', error);
      }
    };

    fetchMessages();
  }, [recipientId, userProfile]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        const message = {
          _type: 'message',
          sender: {
            _type: 'reference',
            _ref: userProfile._id,
          },
          recipient: {
            _type: 'reference',
            _ref: recipientId,
          },
          content: newMessage,
          timestamp: new Date().toISOString(),
        };
        await client.create(message);
        setMessages([...messages, message]);
        setNewMessage('');
      } catch (error) {
        console.error('Error sending message', error);
      }
    }
  };

  return (
    <div className='fixed bottom-8 right-8 w-96 h-112 bg-white dark:bg-gray-900 p-4 shadow-lg rounded-lg'>
      <div className='flex justify-between items-center mb-4'>
        <h2 className='text-lg font-semibold'>Messages</h2>
        <button onClick={onClose}>
          <AiOutlineClose className='text-xl' />
        </button>
      </div>
      <div className='overflow-auto h-4/5'>
        {messages.map((msg, idx) => (
          <div key={idx} className='p-2 bg-gray-200 dark:bg-gray-700 rounded mb-2'>
            {msg.content}
          </div>
        ))}
      </div>
      <div className='flex mt-2'>
        <input
          type='text'
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className='flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded'
          placeholder='Type your message...'
        />
        <button type="button" onClick={sendMessage} className='px-4 py-2 ml-2 bg-blue-500 text-white rounded'>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessageField;

