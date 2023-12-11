'use client';
import { useEffect } from 'react'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import {motion} from 'framer-motion';
import {CgProfile} from 'react-icons/cg';
import { useRouter } from 'next/navigation';
import { isAuth } from '@/lib/isAuth';
import Link from 'next/link';

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();
  useEffect(() => {
    if (session === null) {
      router.push("/auth/login");
    }
  }, [session]);
  // if (session == null) {
  //   router.push("/auth/login");
  // }
  // if (!isAuth()) {router.push("/auth/login");}
  // console.log(session)
  return (
    <>
      <motion.div className='h-22 p-4  flex flex-row justify-between items-center  text-white'
        // initial={{ backgroundColor: '#146152' }}
        // animate={{ backgroundColor: '#146152' }}
        // initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          // initial={{ opacity: 0, scale: 3 }}
          // animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 100, duration: 1 }}
          whileHover={{ scale: 1.1 }}
          
        >
          <Link href='/'>
            <img className='h-14 ml-16' src='/images/logo.png' alt='logo'/>
          </Link>
        </motion.div>
        {session && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, type: 'spring', stiffness: 100, duration: 3 }}
              className='flex flex-col justify-center items-end space-y-4'
            > 
              <span className='text-semibold'>Hello, {session.user.name}</span>
              <span className='text-xs font-thin'>You are logged in {session.user.email} for PLAY Volunteer Management</span>

            </motion.div>
         )}
         {/* {session && (
          <CgProfile className='text-p2 h-10 w-10' />
         )}  */}
      </motion.div>
    </>
  )
}

export default Header