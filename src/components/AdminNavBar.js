import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import {motion} from 'framer-motion';
import Link from 'next/link';
const NavBar = () => {
  return (
    <>
      <motion.div className='w-[16rem]  min-h-screen p-8 mr-4 flex flex-col justify-start items-start space-y-5 bg-white text-p1 font-semibold'
        // initial={{ opacity: 0, x: -100 }}
        // animate={{ opacity: 1, x: 0 }}
        // transition={{ delay: 1.5, duration: 1}}      
      >
        <h2 className='text-bold text-xl text-start'>Home</h2>
        <ul className='text-md space-y-1'>
          <Link href={'/dashboard/admin'}>
            <li className='cursor-pointer hover:text-s1 mb-2'>Activities</li>
          </Link>
          <Link href={'/underconstruction'}>
            <li className='cursor-pointer hover:text-s1'>Reports</li>
          </Link>
        </ul>
        <div className='border-b-1'></div>
        <ul className='text-md space-y-3'>
          <li className='cursor-pointer hover:text-s1'>Instruction pdf</li>
          <Link href={'/about'}>
          <li className='cursor-pointer hover:text-s1'>About</li>
          </Link>
          <li onClick={signOut} className='cursor-pointer hover:text-s1'>Log out</li>
        </ul>
      </motion.div>
    </>
  )
}

export default NavBar