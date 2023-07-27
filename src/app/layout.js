'use client'
import React, { useEffect, useState } from 'react';
import CustomeBackground from './components/CustomeBackground';
import './globals.css';
import { Poppins } from 'next/font/google';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Header from './components/Header';
import Providers from './context/providers';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300'],
});

export const metadata = {
  title: 'Kedai | Your favorite shop',
  description: 'Web Application untuk Kedai.',
};

export default function RootLayout({ children }) {

  const [isLoginPage, setIsLoginPage] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const isLoginPage = window.location.pathname === '/login' ? true : false;
    setIsLoginPage(isLoginPage);
  }, []); 

  useEffect(()=>{
    if(isLoginPage !== null){
      setIsLoading(prev=>!prev)
    }
  }, [isLoginPage])

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`h-full flex flex-col ${poppins.className}`}>
            <Providers>
          <CustomeBackground />
          {
            isLoading && 
            <div className='fixed h-screen w-screen bg-white flex items-center justify-center z-10'>
              <Loading />
            </div>
          }

          {
            isLoginPage ? <> { children } </> 
            :
            <>
              <Header />
              <main className=' mt-20 border py-5'>{ children }</main>
            </>
          }
          <Footer />
            </Providers>
      </body>
    </html>
  );
}
