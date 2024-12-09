import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { GoVerified } from 'react-icons/go';
import axios from 'axios';
import VideoCard from '../../components/VideoCard';
import NoResults from '../../components/NoResults';
import FollowButton from '../../components/FollowButton';
import MessageField from '@/components/MessageField'; // Import MessageField component
import useAuthStore from '../../store/authStore';
import { IUser, Video } from '../../types';
import { BASE_URL } from '@/utils';
// import styles from '../../styles/globals.css';
import { client } from '@/utils/client'; // Import the Sanity client

interface IProps {
  data: {
    user: IUser;
    userVideos: Video[];
    userLikedVideos: Video[];
  };
}

const Profile = ({ data }: IProps) => {
  const [showUserVideos, setShowUserVideos] = useState<Boolean>(true);
  const [videosList, setVideosList] = useState<Video[]>([]);
  const [showMessageField, setShowMessageField] = useState<Boolean>(false);
  const { user, userVideos, userLikedVideos } = data;
  const { userProfile }: any = useAuthStore();

  const videos = showUserVideos ? 'border-b-2 border-black dark:border-white' : 'text-gray-400 dark:text-gray-500';
  const liked = !showUserVideos ? 'border-b-2 border-black dark:border-white' : 'text-gray-400 dark:text-gray-500';

  useEffect(() => {
    const fetchVideos = async () => {
      if (showUserVideos) {
        setVideosList(userVideos);
      } else {
        setVideosList(userLikedVideos);
      }
    };

    fetchVideos();
  }, [showUserVideos, userLikedVideos, userVideos]);

  const openMessageField = () => {
    setShowMessageField(true);
  };

  const closeMessageField = () => {
    setShowMessageField(false);
  };

  const promotePost = () => {
    alert('Promote post');
  };

  return (
    <div className='w-full bg-white dark:bg-gray-900 text-primary dark:text-white'>
      <div className='flex gap-6 md:gap-10 mb-4 bg-white dark:bg-gray-800 p-4 rounded'>
        <div className='w-16 h-16 md:w-32 md:h-32'>
          <Image
            width={120}
            height={120}
            layout='responsive'
            className='rounded-full'
            src={user.image}
            alt='user-profile'
          />
        </div>

        <div className='flex flex-col'>
          <div className='text-md md:text-2xl font-bold tracking-wider flex gap-2 items-center lowercase'>
            <span>{user.userName.replace(/\s+/g, '')}</span>
            <GoVerified className='text-blue-400 md:text-xl text-md' />
          </div>
          <p className='text-sm font-medium text-gray-700 dark:text-gray-300'>{user.userName}</p>
          {userProfile?._id === user._id ? (
            <div className='flex gap-2 mt-2 items-center'>
              <button type="button" className={`button-common button-edit-profile`}>
                Edit Profile
              </button>
              <button type="button" onClick={promotePost} className={`button-common button-promote`}>
                Promote Post
              </button>
            </div>
          ) : (
            <div className='flex gap-2 mt-2 items-center'>
              <FollowButton userId={user._id} currentUserId={userProfile?._id} />
              <button type="button" onClick={openMessageField} className={`button-common button-message`}>
                Message
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className='flex gap-10 mb-10 mt-10 border-b-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4'>
          <p className={`text-xl font-semibold cursor-pointer ${videos}`} onClick={() => setShowUserVideos(true)}>
            Videos
          </p>
          <p className={`text-xl font-semibold cursor-pointer ${liked}`} onClick={() => setShowUserVideos(false)}>
            Liked
          </p>
        </div>
        <div className='flex gap-6 flex-wrap md:justify-start bg-white dark:bg-gray-900 p-4'>
          {videosList.length > 0 ? (
            videosList.map((post: Video, idx: number) => (
              <VideoCard key={idx} post={post} />
            ))
          ) : (
            <NoResults text={`No ${showUserVideos ? '' : 'Liked'} Videos Yet`} />
          )}
        </div>
      </div>
      {showMessageField && <MessageField recipientId={user._id} onClose={closeMessageField} />} {/* Show MessageField component when openMessageField is triggered */}
    </div>
  );
};

export const getServerSideProps = async ({ params: { userId } }: any) => {
  const res = await axios.get(`${BASE_URL}/api/profile/${userId}`);

  return {
    props: { data: res.data },
  };
};

export default Profile;
