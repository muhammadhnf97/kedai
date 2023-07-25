'use client'
import React, { useState } from 'react'
import Loading from '../components/Loading'

const Home = () => {
    const page = 'login'
    const [isLoading, setIsLoading] = useState(false)
    const [user, setUser] = useState({
        username: '',
        password: ''
    })

    const handleChangeUser = (e) => {
        const {name, value} = e.target
        setUser(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    console.log(user)

  return (
    <>
    { 
        isLoading &&
        <div className='fixed w-screen h-screen bg-white flex items-center justify-center'>
            <Loading />
        </div>
    }
    <div className='w-full h-screen flex flex-col items-center justify-between'>
        <div className='h-full w-full flex flex-col justify-center items-center gap-10 md:flex-row md:justify-evenly'>
            <section className='leading-3'>
                <h1 className='text-[#FF4141] font-bold text-8xl'>Kedai.</h1>
                <h2 className='text-[#293241] italic text-3xl font-semibold'>Your favorite shop</h2>
            </section>
            <form>
                <section className='w-full bg-[#293241] px-6 py-8 rounded-lg space-y-5 md:w-96'>
                    <div className='space-y-2'>
                        <div className='flex text-white'>
                            <p className='w-24'>Username</p>
                            <input type='text' name='username' value={user.username} onChange={(e)=>handleChangeUser(e)} className='flex-1 rounded-sm px-1 text-sm w-full text-black' />
                        </div>
                        <div className='flex text-white'>
                            <p className='w-24'>Password</p>
                            <input type='password' name='password' value={user.password} onChange={(e)=>handleChangeUser(e)} className='flex-1 rounded-sm px-1 text-sm w-full text-black' />
                        </div>
                    </div>
                    <button className='w-full bg-[#A5AEFF] text-center py-2 rounded-lg text-sm'>Login</button>
                    <p className='text-right text-xs text-white italic'>Forget password ? Call admin</p>
                </section>
            </form>
        </div>
    </div>
    </>
  )
}

export default Home