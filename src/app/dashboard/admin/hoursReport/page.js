'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/navigation'
import HoursReport from '@/components/UserTable'
import Registration from '@/components/RegistrationList'

const Dashboard  = () => {
  const [userId, setUserId] = React.useState(null);
  const router = useRouter();


  return (
    <>
      <Header/>
      <div className='flex w-full min-h-screen flex-row justify-start items-start'>
        <NavBar/>
        <div className='w-full min-h-[screen] bg-gray-200 p-8 flex flex-col justify-start items-end'>
        <HoursReport setUserId={setUserId} />
        {userId && (
          <Registration userId={userId}/>
        )}
        </div>
      </div>
    </>
  )
}

export default Dashboard