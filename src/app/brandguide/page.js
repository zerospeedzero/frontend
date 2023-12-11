'use client'
import React from 'react'
import Header from '@/components/Header'


const PDFViewer = () => {
  return (
    <>
      <Header/>
      <div className='flex flex-row justify-start items-center'>
        <iframe className='w-screen  h-screen' src='./Binder2.pdf'  ></iframe>
      </div>
    </>
  )
}

export default PDFViewer

