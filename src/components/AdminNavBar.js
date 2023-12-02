import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import {motion} from 'framer-motion';

const NavBar = () => {
  return (
    <>
      <motion.div className='w-[16rem] h-[100vh] p-8 mr-4 flex flex-col justify-start items-start space-y-5 bg-p1 text-white'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 1}}      
      >
        <h2 className='text-bold text-xl text-start'>Home</h2>
        <ul className='text-md space-y-1'>
          <li className='cursor-pointer'>Activities</li>
          <li className='cursor-pointer'>Reports</li>
        </ul>
        <div className='border-b-1'></div>
        <ul className='text-md space-y-3'>
          <li className='cursor-pointer'>Instruction pdf</li>
          <li className='cursor-pointer'>About</li>
          <li onClick={signOut} className='cursor-pointer'>Log out</li>
        </ul>
      </motion.div>
    </>
  )
}

export default NavBar