import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { topics } from '../utils/constants';

const Discover: NextPage = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle = 'text-[#F51997] dark:text-[#F51997] xl:border-2 hover:bg-primary dark:hover:bg-gray-700 xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer';
  const topicStyle = 'text-black dark:text-white xl:border-2 hover:bg-primary dark:hover:bg-gray-700 xl:border-gray-300 dark:xl:border-gray-600 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer';

  return (
    <div className='xl:border-b-2 xl:border-gray-200 dark:border-gray-700 pb-6'>
      <p className='text-gray-500 dark:text-gray-400 font-semibold m-3 mt-4 hidden xl:block'>
        Popular Topics
      </p>
      <div className='text-primary dark:text-white flex gap-3 flex-wrap'>
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div className={topic === item.name ? activeTopicStyle : topicStyle}>
              <span className='text-primary dark:text-white font-bold text-2xl xl:text-md'>
                {item.icon}
              </span>
              <span className='text-primary dark:text-white font-medium text-md hidden xl:block capitalize'>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
