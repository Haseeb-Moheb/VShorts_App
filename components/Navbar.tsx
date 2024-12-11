import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AiOutlineLogout } from 'react-icons/ai';
import { BiSearch } from 'react-icons/bi';
import { IoMdAdd } from 'react-icons/io';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { MdDarkMode, MdLightMode } from 'react-icons/md';
import useAuthStore from '../store/authStore';
import { IUser } from '../types';
import { createOrGetUser } from '../utils';
import Logo from '../utils/vshorts.png';
import DarkLogo from '../utils/vshortsd.png';

const Navbar = () => {
  const [user, setUser] = useState<IUser | null>();
  const [searchValue, setSearchValue] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const router = useRouter();
  const { userProfile, addUser, removeUser } = useAuthStore();

  useEffect(() => {
    setUser(userProfile);
  }, [userProfile]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (searchValue) {
      router.push(`/search/${searchValue}`);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  return (
    <div className='w-full flex justify-between items-center border-b-2 border-gray-200 dark:border-gray-700 py-2 px-4 bg-white dark:bg-gray-900'>
      <Link href='/'>
        <div className='w-[120px] md:w-[160px] md:h-[30px] h-[30px]'>
          <Image
            className='cursor-pointer'
            src={isDarkMode ? DarkLogo : Logo}
            alt='logo'
            layout='responsive'
          />
        </div>
      </Link>

      <div className='relative hidden md:block'>
        <form
          onSubmit={handleSearch}
          className='absolute md:static top-10 -left-20 bg-white dark:bg-gray-900'
        >
          <input
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className='bg-primary dark:bg-gray-700 p-3 md:text-md font-medium border-2 border-gray-100 dark:border-gray-600 focus:outline-none focus:border-2 focus:border-gray-300 dark:focus:border-gray-400 w-[300px] md:w-[350px] rounded-full dark:text-white'
            placeholder='Search accounts and videos'
          />
          <button
            onClick={handleSearch}
            className='absolute md:right-5 right-6 top-4 border-l-2 border-gray-300 dark:border-gray-600 pl-4 text-2xl text-gray-400 dark:text-gray-200'
            title='search'
            type='submit'
          >
            <BiSearch />
          </button>
        </form>
      </div>

      <div className='flex gap-5 md:gap-10 items-center'>
        {user ? (
          <>
            <Link href='/upload'>
              <button className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'>
                <IoMdAdd className='text-xl' />{' '}
                <span className='hidden md:block'>Upload</span>
              </button>
            </Link>
            <button
              type='button'
              className='border-2 px-2 md:px-4 text-md font-semibold flex items-center gap-2'
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <MdLightMode className='text-xl' /> : <MdDarkMode className='text-xl' />}
              <span className='hidden md:block'>
                {isDarkMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            </button>
            {user.image && (
              <Link href={`/profile/${user._id}`}>
                <div>
                  <Image
                    className='rounded-full cursor-pointer'
                    src={user.image}
                    alt='user'
                    width={40}
                    height={40}
                  />
                </div>
              </Link>
            )}
            <button
              type='button'
              className='border-2 p-2 rounded-full cursor-pointer outline-none shadow-md'
              onClick={() => {
                googleLogout();
                removeUser();
              }}
              title='logout'
            >
              <AiOutlineLogout color='red' fontSize={21} />
            </button>
          </>
        ) : (
          <GoogleLogin
            onSuccess={(response) => createOrGetUser(response, addUser)}
            onError={() => console.log('Login Failed')}
          />
        )}
      </div>
    </div>
  );
};

export default Navbar;
