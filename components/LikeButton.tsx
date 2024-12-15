import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils';
import useAuthStore from '@/store/authStore'; // Import your auth store

interface LikeButtonProps {
  userId: string;
  postId: string;
  updateCounts: (action: 'like' | 'unlike') => void;
}

const LikeButton: React.FC<LikeButtonProps> = ({ userId, postId, updateCounts }) => {
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
        await axios.post(`${BASE_URL}/api/like`, { userId: userProfile._id, postId });
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
        await axios.delete(`${BASE_URL}/api/unlike`, { data: { userId: userProfile._id, postId } });
        setIsLiked(false);
        updateCounts('unlike');
      } catch (error) {
        console.error('Error unliking post', error);
      }
    }
  };

  if (!userProfile) return null; // Return null if userProfile is not available

  return (
    <button onClick={isLiked ? handleUnlike : handleLike}>
      {isLiked ? 'Unlike' : 'Like'}
    </button>
  );
};

export default LikeButton;
