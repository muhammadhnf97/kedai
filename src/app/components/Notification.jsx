import React from 'react'

const Notification = ({ desc, alertTitle, handleClickResetNotif }) => {
    let answer
    if(alertTitle === 'caution'){
        answer = ( <button autoFocus className='w-20 px-2 py-1 bg-green-400 rounded-md shadow-md hover:bg-green-500 active:bg-green-600' onClick={handleClickResetNotif}>Ok</button> )
    } else {
        answer = (
        <div className='flex gap-2'>
            <button className='w-20 px-2 py-1 bg-yellow-400 rounded-md shadow-md hover:bg-yellow-500 active:bg-yellow-600'>Ok</button>
            <button autoFocus className='w-20 px-2 py-1 bg-red-400 rounded-md shadow-md hover:bg-red-500 active:bg-red-600' onClick={handleClickResetNotif}>Cancel</button>
        </div>
        )
    }

    if(alertTitle === 'warning'){

    }
  return (
    <div className='fixed w-full h-full bg-black flex items-center justify-center top-0 bg-opacity-60 z-30'>
        <div className='w-72 h-56 bg-white flex flex-col items-center justify-center gap-5 rounded-lg p-5'>
            <p className='text-2xl font-semibold'>{alertTitle.charAt(0).toUpperCase() + alertTitle.slice(1)} !</p>
            <p>{desc}</p>
            {answer}
        </div>
    </div>
  )
}

export default Notification