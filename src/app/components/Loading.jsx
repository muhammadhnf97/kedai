import React from 'react'
import Image from 'next/image'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loading = () => {
  return (
    <div className='w-fit h-fit animate-spin'>
        <AiOutlineLoading3Quarters className='w-10 h-10 text-[#EE6C4D]' />
    </div>
  )
}

export default Loading