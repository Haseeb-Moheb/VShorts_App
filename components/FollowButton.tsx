import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils';

interface FollowButtonProps {
  userId: string;
  currentUserId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, currentUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    const checkFollowStatus = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/profile/check-follow?followerId=${currentUserId}&followingId=${userId}`);
        setIsFollowing(res.data.isFollowing);
      } catch (error) {
        console.error('Error checking follow status', error);
      }
    };

    checkFollowStatus();
  }, [userId, currentUserId]);

  const handleFollow = async () => {
    try {
      await axios.post(`${BASE_URL}/api/profile/${userId}`, { followerId: currentUserId, followingId: userId });
      setIsFollowing(true);
    } catch (error) {
      console.error('Error following user', error);
    }
  };

  const handleUnfollow = async () => {
    try {
      await axios.delete(`${BASE_URL}/api/profile/${userId}`, { data: { followerId: currentUserId, followingId: userId } });
      setIsFollowing(false);
    } catch (error) {
      console.error('Error unfollowing user', error);
    }
  };

  return (
    <button onClick={isFollowing ? handleUnfollow : handleFollow}>
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
