import React from 'react'
import { signOut, useSession } from 'next-auth/react';
import {motion} from 'framer-motion';
import Link from 'next/link';

const NavBar = () => {
  const [sessionData, setSessionData] = React.useState(null);
  const { data: session } = useSession();
  React.useEffect(() => {
    setSessionData(session);
  }, [session]);
  console.log(sessionData);
  return (
    <>
      <motion.div className='w-[16rem]   h-[30rem] rounded-br-[20rem] p-8 mr-4 flex flex-col start items-start space-y-5 bg-white text-p1 font-semibold'
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 1 }}
      >
        {/* <h2 className='text-bold text-xl text-start'>Home {sessionData && sessionData.user && sessionData.user.data.role.name == 'superuser' && ('- Admin')}</h2> */}
        <h2 className='text-bold text-xl text-start'>Home {sessionData && sessionData.user && sessionData.user.data.role.name == 'superuser' && ('- Admin')}</h2>
        <ul className='text-md space-y-4'>
          {sessionData && sessionData.user.data.role.name == 'superuser' ? (
            <>
              <Link href={'/dashboard/admin'}>
                <li className='cursor-pointer hover:text-s1 mb-2'>Volunteers's Activities</li>
              </Link>
              <Link href={'/dashboard/admin/hoursReport'}>
                <li className='cursor-pointer hover:text-s1'>Hours Report</li>
              </Link>          
            </>
          ) : (
            <>
              <Link href={'/dashboard/users/all'}>
                <li className='cursor-pointer hover:text-s1 mb-2'>All Activities</li>
              </Link>
                <Link href={'/dashboard/users/my'}>
              <li className='cursor-pointer hover:text-s1 mb-2'>My Activities</li>
              </Link>
                <Link href={'/dashboard/users/hours'}>
              <li className='cursor-pointer hover:text-s1 mb-2'>Report Hours</li>
              </Link>
            </>
          )}
        </ul>
        <div className='border-b-1'></div>
        <ul className='text-md space-y-2'>
          <a href={'/pdfviewer'} target="_blank">
            <li className='cursor-pointer hover:text-s1 mb-2'>Instruction pdf</li>
          </a>
          <a href={'/brandguide'} target='_blank'>
            <li className='cursor-pointer hover:text-s1 mb-2'>Design reference</li>
          </a>          
          <Link href={'/about'}>
            <li className='cursor-pointer hover:text-s1 mb-2'>About</li>
          </Link>
          <div>
            <li onClick={signOut} className='cursor-pointer hover:text-s1'>Log out</li>
          </div>
        </ul>
      </motion.div>
    </>
  )
}

export default NavBar

