import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils';
import useAuthStore from '@/store/authStore'; // Import your auth store
import { FaHeart, FaRegHeart } from 'react-icons/fa'; // Import heart icons

interface LikeButtonProps {
  postId: string;
  updateCounts: (action: 'like' | 'unlike') => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, updateCounts }) => {
  const [isLiked, setIsLiked] = useState(false);
  const { userProfile }: any = useAuthStore(); // Get the current user profile

  useEffect(() => {
    if (userProfile) {
      const checkLikeStatus = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/check-like?userId=${userProfile._id}&postId=${postId}`);
          setIsLiked(res.data.isLiked);
        } catch (error) {
          console.error('Error checking like status', error);
        }
      };

      checkLikeStatus();
    }
  }, [postId, userProfile]);

  const handleLike = async () => {
    if (userProfile) {
      try {
        const response = await axios.put(`${BASE_URL}/api/like`, { userId: userProfile._id, postId, like: true });
        setIsLiked(true);
        updateCounts('like');
      } catch (error) {
        console.error('Error liking post', error);
      }
    }
  };

  const handleUnlike = async () => {
    if (userProfile) {
      try {
        const response = await axios.put(`${BASE_URL}/api/like`, { userId: userProfile._id, postId, like: false });
        setIsLiked(false);
        updateCounts('unlike');
      } catch (error) {
        console.error('Error unliking post', error);
      }
    }
  };

  if (!userProfile) return null; // Return null if userProfile is not available

  return (
    <button onClick={isLiked ? handleUnlike : handleLike} className='flex items-center justify-center px-3 py-2 mt-2 text-base font-semibold rounded-md'>
      {isLiked ? <FaHeart className='text-red-500 text-lg' /> : <FaRegHeart className='text-gray-500 text-lg' />}
    </button>
  );
};

export default LikeButton;
