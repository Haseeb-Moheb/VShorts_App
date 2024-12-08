import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils';
import useAuthStore from '@/store/authStore'; // Import your auth store

interface FollowButtonProps {
  userId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const { userProfile }: any = useAuthStore(); // Get the current user profile

  useEffect(() => {
    if (userProfile) {
      const checkFollowStatus = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/profile/check-follow?followerId=${userProfile._id}&followingId=${userId}`);
          setIsFollowing(res.data.isFollowing);
        } catch (error) {
          console.error('Error checking follow status', error);
        }
      };

      checkFollowStatus();
    }
  }, [userId, userProfile]);

  const handleFollow = async () => {
    if (userProfile) {
      try {
        await axios.post(`${BASE_URL}/api/profile/${userId}`, { followerId: userProfile._id, followingId: userId });
        setIsFollowing(true);
      } catch (error) {
        console.error('Error following user', error);
      }
    }
  };

  const handleUnfollow = async () => {
    if (userProfile) {
      try {
        await axios.delete(`${BASE_URL}/api/profile/${userId}`, { data: { followerId: userProfile._id, followingId: userId } });
        setIsFollowing(false);
      } catch (error) {
        console.error('Error unfollowing user', error);
      }
    }
  };

  if (!userProfile) return null; // Return null if userProfile is not available

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
