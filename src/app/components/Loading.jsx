import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <div className='w-full h-full fixed bg-black top-0 flex items-center justify-center bg-opacity-70 z-50'>
      <div className='p-10 rounded-lg shadow-md bg-white flex flex-col items-center justify-center gap-2'>
          <AiOutlineLoading3Quarters className='w-10 h-10 text-[#EE6C4D] animate-spin' />
          <p>Loading</p>
      </div>
    </div>
  )
}

export default Loading