'use client'
import React from 'react'
import { useSession } from 'next-auth/react'
const index = () => {
  const { data: session, status } = useSession();
  if (status === 'authenticated') {
    const router = useRouter();
    router.push("/");
    return null;
  }  
  return (
    <>
      <div className='w-screen h-screen flex flex-col justify-center items-center'>
        <h2 className='text-4xl mb-8'>P.L.A.Y. Volunteer</h2>
        <p className='m-4'>Your account will be reviewed by our coordinator.</p>
        <p className='mx4 my-2'>You will receive email that your account is approved.</p>
        <img className="h-[50%] mx-auto" src='/images/welcome.jpg'/>
      </div>
    </>
  )
}

export default index 