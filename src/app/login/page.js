'use client'
import React, { useState } from 'react'
import { useLogin } from '../context/login'
import { useRouter } from 'next/navigation'
import { loginAuth } from '../utils/fetchingdata'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import { useNotification } from '../context/notification'

const Home = () => {

    const {notif, handleNotif} = useNotification()
    const { handleClickSaveLoginData } = useLogin()
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const [user, setUser] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target
        setUser(prev=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }
    
    const handleSubmit = async(e) => {
        setIsLoading(true)
        e.preventDefault()
        let status
        if(user?.email?.length < 1 || user?.password?.length < 1){
            makeNotif(true, "Email dan password tidak boleh kosong")
            return
        }
        try {
            loginAuth(user).then(values=>{
                console.log(values)
                status = values.data.status
                if (values.data.status === 200) {
                    const { userId, sessionId, email, nmPegawai, jabatan, token, idPegawai } = values.data.data
                    handleClickSaveLoginData( userId, sessionId, email, nmPegawai, jabatan, token, idPegawai )
                    localStorage.setItem("auth", JSON.stringify({ userId, sessionId, email, nmPegawai, jabatan, token, idPegawai }))
                    router.push('/')
                } else {
                    handleNotif(true, values?.data?.message)
                    setIsLoading(false)
                    setUser({})
                }
            })
            
        } catch (error) {
            console.error('Ada kesalahan saat mengirim username dan password')
            handleNotif(true, 'Ada kesalahan saat mengirim username dan password' )
            setIsLoading(false)
            setUser({})
            
        }
    }

  return (
    <>
    {isLoading && <Loading />}
    {
        notif?.showNotif &&
        <Notification 
           notif={notif}
           handleNotif={handleNotif} 
        />
    }
    <div className='w-full h-screen flex flex-col items-center justify-between'>
        <div className='h-full w-full flex flex-col justify-center items-center gap-10 md:flex-row md:justify-evenly'>
            <section className='leading-3'>
                <h1 className='text-[#FF4141] font-bold text-8xl'>Kedai.</h1>
                <h2 className='text-[#293241] italic text-3xl font-semibold'>Your favorite shop</h2>
            </section>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <section className='w-full bg-[#293241] px-6 py-8 rounded-lg space-y-5 md:w-96'>
                    <div className='space-y-2'>
                        <div className='flex text-white'>
                            <p className='w-24'>Email</p>
                            <input 
                                type='text' 
                                name='email' 
                                value={user?.email || ''} 
                                onChange={(e)=>handleChange(e)} 
                                className='flex-1 h-8 outline-none rounded-sm px-1 text-sm w-full text-black border' 
                                disabled={isLoading} />
                        </div>
                        <div className='flex text-white'>
                            <p className='w-24'>Password</p>
                            <input 
                                type='password' 
                                name='password' 
                                value={user?.password || ''} 
                                onChange={(e)=>handleChange(e)} 
                                className='flex-1 h-8 outline-none rounded-sm px-1 text-sm w-full text-black border' 
                                disabled={isLoading} />
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