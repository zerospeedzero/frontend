'use client'
import React from 'react'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import { useRouter } from 'next/navigation'
import ActivityList from '@/components/ActivityList';


const PDFViewer = () => {
  const router = useRouter();
  const [isCreateActivityVisible, setIsCreateActivityVisible] = React.useState(false);
  const openPopup = () => {
    setIsCreateActivityVisible(true);
  };
  const closePopup = () => {
    setIsCreateActivityVisible(false);
  };  
  return (
    <>
      <Header/>
      <div className='flex flex-row justify-start items-center'>
        {/* <NavBar/> */}
        {/* <div className='w-full h-[100vh] bg-gray-200  p-8 flex flex-col justify-start items-start'> */}
          {/* <div className='h-[3rem align-baseline'> */}
          <iframe className='w-screen  h-screen' src='./instructions.pdf'  ></iframe>
          {/* </div> */}
        {/* </div> */}
      </div>
    </>
  )
}

export default PDFViewer


// 'use client'
// import React from 'react'
// import { useSession } from 'next-auth/react'
// import Header from '@/components/Header'
// import NavBar from '@/components/NavBar'
// import { useRouter } from 'next/navigation'
// import ActivityList from '@/components/ActivityList';

// const Dashboard  = () => {
//   const router = useRouter();
//   const [isCreateActivityVisible, setIsCreateActivityVisible] = React.useState(false);
//   const openPopup = () => {
//     setIsCreateActivityVisible(true);
//   };
//   const closePopup = () => {
//     setIsCreateActivityVisible(false);
//   };  
//   return (
//     <>
//       <Header/>
//       <div className='flex flex-row justify-start items-center'>
//         <NavBar/>
//         <div className='w-full h-[100vh] bg-gray-200  p-8 flex flex-col justify-start items-start'>
//           <div className='h-[3rem align-baseline'>
//           <iframe className='h-screen w-screen' src='./instructions.pdf'  ></iframe>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Dashboard