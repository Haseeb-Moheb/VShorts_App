import React from 'react';

interface TotalLikesProps {
  totalLikes: number;
}

const TotalLikes: React.FC<TotalLikesProps> = ({ totalLikes }) => {
  console.log(`Rendering TotalLikes with totalLikes: ${totalLikes}`);
  return (
    <div>
      <span className='font-bold'>{totalLikes}</span>
      <span className='text-gray-700 dark:text-gray-300'> Likes</span>
    </div>
  );
};

export default TotalLikes;
