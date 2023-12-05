'use client'
import React from 'react'
import Header from '@/components/Header';
import NavBar from '@/components/NavBar';
const page = () => {
  return (
    <>
      <Header/>
      <div className='flex flex-row w-full h-full bg-gray-200 justify-start items-center'>
        <NavBar/>
        <div className='w-full bg-gray-200  p-8 flex flex-col justify-center items-center'>
          <h1>Under Construction</h1>
        </div>
      </div>
    </>

  );
}

export default page