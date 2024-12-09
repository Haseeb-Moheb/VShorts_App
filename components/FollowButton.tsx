import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BASE_URL } from '@/utils';
import useAuthStore from '@/store/authStore'; // Import your auth store
import { BsPeopleFill } from 'react-icons/bs'; // Import the two-person icon

interface FollowButtonProps {
  userId: string;
  currentUserId: string;
}

const FollowButton: React.FC<FollowButtonProps> = ({ userId, currentUserId }) => {
  const [isFollowing, setIsFollowing] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const { userProfile }: any = useAuthStore(); // Get the current user profile

  useEffect(() => {
    if (userProfile) {
      const checkFollowStatus = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/api/profile/check-follow?followerId=${userProfile._id}&followingId=${userId}`);
          setIsFollowing(res.data.isFollowing);
          setIsRequested(res.data.isRequested); // Assuming isRequested field in response
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
        const response = await axios.post(`${BASE_URL}/api/profile/${userId}`, { followerId: userProfile._id, followingId: userId });
        if (response.data.status === 'requested') {
          setIsRequested(true);
        } else {
          setIsFollowing(true);
        }
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
        setIsRequested(false);
      } catch (error) {
        console.error('Error unfollowing user', error);
      }
    }
  };

  if (!userProfile) return null; // Return null if userProfile is not available

  return (
    <button
      onClick={isFollowing ? handleUnfollow : handleFollow}
      className={`flex items-center justify-center px-3 py-2 mt-2 text-sm font-semibold rounded-md ${
        isFollowing ? 'bg-gray-500 text-white' : isRequested ? 'bg-yellow-500 text-white' : 'bg-red-500 text-white'
      }`}
      style={{ width: '110px', height: '45px' }} // Adjusted width and height
      disabled={isRequested} // Disable button if request is pending
    >
      {isFollowing ? (
        <span className="flex items-center gap-1">
          <BsPeopleFill className="text-lg" />
          <span className="text-base">Following</span> {/* Adjusted font size */}
        </span>
      ) : isRequested ? (
        <span className="text-base">Requested</span>
      ) : (
        <span className="text-base">Follow</span>
      )}
    </button>
  );
};

export default FollowButton;
