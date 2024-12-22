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
    console.log('userProfile:', userProfile);
    console.log('postId:', postId);

    if (userProfile && postId) {
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

  const handleLikeClick = async () => {
    console.log('Attempting to like post:', postId);
    if (userProfile && postId) {
      try {
        setIsLiked(true);
        updateCounts('like');
        const res = await axios.put(`${BASE_URL}/api/like`, { userId: userProfile._id, postId, like: true });
        console.log('Liked post:', postId, res.data);
      } catch (error) {
        console.error('Error liking post', error);
      }
    } else {
      console.log('userProfile or postId is missing');
    }
  };

  const handleUnlikeClick = async () => {
    console.log('Attempting to unlike post:', postId);
    if (userProfile && postId) {
      try {
        setIsLiked(false);
        updateCounts('unlike');
        const res = await axios.put(`${BASE_URL}/api/like`, { userId: userProfile._id, postId, like: false });
        console.log('Unliked post:', postId, res.data);
      } catch (error) {
        console.error('Error unliking post', error);
      }
    } else {
      console.log('userProfile or postId is missing');
    }
  };

  if (!userProfile) {
    console.log('User profile not available');
    return null; // Return null if userProfile is not available
  }

  return (
    <button
      onClick={() => (isLiked ? handleUnlikeClick() : handleLikeClick())}
      className='flex items-center justify-center px-3 py-2 mt-2 text-base font-semibold rounded-md'
    >
      {isLiked ? <FaHeart className='text-red-500 text-lg' /> : <FaRegHeart className='text-gray-500 text-lg' />}
    </button>
  );
};

export default LikeButton;
