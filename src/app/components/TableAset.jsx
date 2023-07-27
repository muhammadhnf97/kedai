import React from 'react'

const TableAset = ({ desc, nominal }) => {
  return (
    <div className='w-full bg-[#FF9880] font-semibold'>
        <div className='flex flex-col justify-center text-center items-center md:flex-row md:pl-5 md:justify-between'>
            <div className='py-1 md:py-0'><p>{desc}</p></div>
            <div className='bg-blue-100 w-full h-full py-2 px-5 md:w-fit'><p>{nominal.toLocaleString('ID-id', { style : "currency", currency: 'IDR'})}</p></div>
        </div>
    </div>
  )
}

export default TableAset