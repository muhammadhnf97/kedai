import React from 'react'
import { RxCross1 } from 'react-icons/rx'
import { AiOutlineInfoCircle } from 'react-icons/ai'

const Notification = ({ notif, handleNotif }) => {
    
  return (
    <section className='w-full h-full fixed top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
      <div className='w-56 bg-white rounded-lg overflow-hidden'>
          <div className='flex flex-col items-center pb-3'>
              <div className='w-full bg-blue-300 flex justify-between items-center p-2'>
                  <div className='flex items-center justify-center gap-2'>
                      <AiOutlineInfoCircle />
                      <p>Info</p>
                  </div>
                  <button onClick={()=>handleNotif()}><RxCross1 /></button>
              </div>
              <div className='p-3 w-full text-center'>
                  <p>{notif.message}</p>
              </div>
              <button className='py-2 px-5 w-fit rounded-lg shadow-md bg-blue-300 hover:bg-blue-400 active:bg-blue-500' autoFocus onClick={()=>handleNotif()}>Ok</button>
          </div>
      </div>
    </section>
  )
}

export default Notification