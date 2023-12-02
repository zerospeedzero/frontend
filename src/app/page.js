'use client'
import React, { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Spinner from '@/components/Spinner'

const index = () => {
  const { data: session, status } = useSession();
  const [isloading, setIsLoading] = React.useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  },[])
  console.log('session', session)
  // console.log('status', status)
  if (status === 'authenticated') {
    const router = useRouter();
    if (session.user.email === 'temp6666temp@gmail.com') {
      router.push("/dashboard/admin");
    } else {
      router.push("/dashboard/users");
    }
    // console.log(session)
    // router.push("/dashboard");
    // return null;
  }  
  return (
    <>
      { isloading ? (
        <Spinner/>
      ):(
        <div className='w-screen h-screen flex flex-col justify-center items-center'>
          <h2 className='text-4xl mb-6'>P.L.A.Y. Volunteer</h2>
          <p className='mb-6'>To access this service. Please click below button for login</p>
          <Link href="/auth/login">
            <button className='bg-p1/70 px-4 text-white py-2 rounded mb-6'>Login</button>
          </Link>
          <img className="h-[50%] mx-auto" src='/images/welcome.jpg'/>
        </div>
      )}
    </>
  )
}

export default index 