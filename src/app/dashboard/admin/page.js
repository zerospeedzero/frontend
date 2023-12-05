'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import NavBar from '@/components/AdminNavBar'
import { useRouter } from 'next/navigation'
import CreateActivity from '@/components/CreateActivity'
import AdminActivityList from '@/components/AdminActivityList'

const Dashboard  = () => {
  const router = useRouter();
  const [page, setPage] = React.useState('AdminActivityList');
  const [isCreateActivityVisible, setIsCreateActivityVisible] = React.useState(true);
  const openPopup = () => {
    setIsCreateActivityVisible(true);
  };
  const closePopup = () => {
    setIsCreateActivityVisible(false);
  };
  const switchPage = (page) => {
    // setPage(page);
  }

  return (
    <>
      <Header/>
      <div className='flex w-full min-h-screen flex-row justify-start items-start'>
        <NavBar/>
        <div className='w-full min-h-[screen]  bg-gray-200 p-8 flex flex-col justify-start items-end'>
          <div className='h-[3rem align-baseline'>
            <button className='bg-green-500 text-white p-2 m-2 rounded mb-4 hover:bg-green-900'>Volunteers Signed</button>
            <button className='bg-green-500 text-white p-2  m-2 rounded mb-4 hover:bg-green-900'
            >
              + Create Activity
            </button>
              <CreateActivity />
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard