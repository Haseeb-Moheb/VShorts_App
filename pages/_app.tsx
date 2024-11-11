import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useEffect, useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google'; 
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);  

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}>
      <Head>
        <link rel="icon" href={`${process.env.NEXT_PUBLIC_BASE_URL}/favi.png`} />
        <meta name="theme-color" content="#000000" />
        <meta name="description" content="VShorts - Making Moments Unforgettable" />
        <title>VShorts</title>
      </Head>
      <div className='xl:w-[1500px] m-auto overflow-hidden h-[100vh]'>
        <Navbar />
        <div className='flex gap-6 md:gap-20'>
          <div className='h-[92vh] overflow-hidden xl:hover:overflow-auto'>
            <Sidebar />
          </div>
          <div className='mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1'>
            <Component {...pageProps} /> 
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
