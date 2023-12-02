'use client';
import { useEffect } from 'react'
import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import {motion} from 'framer-motion';
import {CgProfile} from 'react-icons/cg';

const Header = () => {
  const { data: session } = useSession();  
  useEffect(() => {
    if (session == null) return;
    // console.log('session.jwt', session.jwt);
    console.log( session); 
  }, [session]);

  return (
    <>
      <motion.div className='h-22 p-4 bg-p2 flex flex-row justify-between items-center shadow-lg'
        initial={{ backgroundColor: '#146152' }}
        animate={{ backgroundColor: '#ffec5c' }}
        transition={{ delay: 1, duration: 1 }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 3 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, type: 'spring', stiffness: 100, duration: 1 }}
          whileHover={{ scale: 1.1 }}
        >
          <img className='h-14' src='/images/logo.png' alt='logo'/>
        </motion.div>
        {session && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, type: 'spring', stiffness: 100, duration: 3 }}
            > 
              <span className='text-semibold'>Hello</span> {session.user.name}
            </motion.div>
         )}
         {session && (
          <CgProfile className='text-p1 h-10 w-10' />
         )} 
      </motion.div>
    </>
  )
}

export default Header