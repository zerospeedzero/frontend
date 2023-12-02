'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import NavBar from '@/components/AdminNavBar'
import { useRouter } from 'next/navigation'
import CreateActivity from '@/components/CreateActivity'

const Dashboard  = () => {
  const { data: session, status } = useSession();
  const [isCreateActivityVisible, setIsCreateActivityVisible] = React.useState(false);
  const openPopup = () => {
    setIsCreateActivityVisible(true);
  };
  const closePopup = () => {
    setIsCreateActivityVisible(false);
  };  
  if (status != 'authenticated') {
    const router = useRouter();
    router.push("/");
  }  
  return (
    <>
      <Header/>
      <div className='flex flex-row justify-start items-center'>
        <NavBar/>
        <div className='w-full h-[100vh] bg-gray-200 p-8 flex flex-col justify-start items-start'>
          <div className='h-[3rem align-baseline'>
            <button className='bg-green-500 text-white p-2 m-2 rounded mb-4'>Volunteers Signed</button>
            <button className='bg-green-500 text-white p-2  m-2 rounded mb-4'
              onClick={openPopup}
            >
              + Create Activity
            </button>
            {isCreateActivityVisible && (
              <CreateActivity onClose={closePopup}/>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard