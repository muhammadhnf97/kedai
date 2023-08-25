'use client'
import React, { useEffect, useState } from 'react';
import CustomeBackground from './components/CustomeBackground';
import './globals.css';
import { Poppins } from 'next/font/google';
import Footer from './components/Footer';
import Header from './components/Header';
import Providers from './context/providers';
import { usePathname } from 'next/navigation';

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

  const pathname = usePathname()
  const [isLoginPage, setIsLoginPage] = useState(pathname)
  let renderPage

  if(isLoginPage === '/login'){
    renderPage = ( 
      <>
        {children}
        <Footer />
      </>
     )
  } else {
    renderPage = (
      <>
        <Header />
        <main className='mt-20 py-5'>
          {children}
        </main>
        <Footer />
      </>)
  }

  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className={`h-full flex flex-col bg-slate-100 ${poppins.className}`}>
          <Providers>
            {/* <CustomeBackground /> */}
              { renderPage }
          </Providers>
      </body>
    </html>
  );
}
