import React from 'react'

const CustomeBackground = () => {
  return (
    <div className='fixed w-full h-full -z-10'>
        <div className='absolute w-56 h-52 rounded-3xl bg-[#FFFCB2] -left-36 top-28 md:-left-10 animate-wiggle '></div>
        <div className='absolute w-32 h-72 rounded-3xl bg-[#B7FFB6] right-1 bottom-10 md:right-10 animate-wiggle'></div>
        <div className='absolute w-80 h-72 rounded-3xl bg-[#B7FFB6] -left-48 -bottom-48 md:-left-16 md:-bottom-24 animate-wiggle'></div>
    </div>
  )
}

export default CustomeBackground