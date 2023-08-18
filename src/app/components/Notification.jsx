import React from 'react'
import { ImWarning } from 'react-icons/im'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const Notification = ({ desc, alertTitle, handleClickResponseNotif }) => {
    let answer
    if(alertTitle === 'info'){
        answer = ( <button autoFocus className='w-20 px-2 py-1 bg-green-400 rounded-md shadow-md h-2/3 hover:bg-green-500 active:bg-green-600' onClick={()=>handleClickResponseNotif(false)}>Ok</button> )
    } else {
        answer = (
        <div className='flex flex-col gap-2'>
            <button className='w-20 px-2 py-1 bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500 active:bg-yellow-600' onClick={()=>handleClickResponseNotif(true)}>Ok</button>
            <button autoFocus className='w-20 px-2 py-1 bg-red-400 rounded-md shadow-md hover:bg-red-500 active:bg-red-600' onClick={()=>handleClickResponseNotif(false)}>Cancel</button>
        </div>
        )
    }

  return (
    <div className='fixed w-full h-full bg-black flex items-center justify-center top-0 bg-opacity-60 z-30 p-5'>
        <div className='w-80 h-40 bg-white rounded-lg overflow-hidden flex flex-col'>
            <div className='w-full flex items-center justify-center bg-blue-200 py-1 gap-2'>
                { alertTitle === 'info' ?  <AiOutlineInfoCircle className='w-6 h-6 text-blue-600' /> : <ImWarning className='text-red-600 w-6 h-6'/>}
                <p className='text-lg font-semibold'>{alertTitle.charAt(0).toUpperCase() + alertTitle.slice(1)}</p>
            </div>
            <div className='flex-1 flex gap-5 items-center justify-center px-5 py-3'>
                <p>{desc}</p>
                {answer}
            </div>
        </div>
    </div>
  )
}

export default Notification