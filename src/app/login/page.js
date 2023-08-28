'use client'
import React, { useState } from 'react'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import Loading from '../components/Loading'
import { useLogin } from '../context/login'
import { useRouter } from 'next/navigation'

const Home = () => {
    const router = useRouter()

    const { loginData, handleClickSaveLoginData } = useLogin()
    
    const [isLoading, setIsLoading] = useState(false)

    const [isNotif, setIsNotif] = useState({
        showNotif: false,
        desc: null
      })
  
      const makeNotif = (showNotif = false, desc = null) => {
          setIsNotif(prev=>{
              return {
                  ...prev,
                  showNotif, desc
              }
          })
      }

    const handleClickNotification = () => {
        setIsNotif({
            showNotif: false,
            desc: null
        })
    }


    const [user, setUser] = useState({
        email: '',
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
    const handleSubmitAuth = async(e) => {
        e.preventDefault()

        if(user.email.length < 1 || user.password.length < 1){
            makeNotif(true, 'Email dan password tidak boleh kosong')
            return
        }
        
        setIsLoading(true)
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user
                })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            setIsLoading(false)

            console.log(data)

            if (data.response !== 401){
                handleClickSaveLoginData(true, data.data.userId, data.data.email, data.data.nmPegawai, data.data.jabatan, data.data.token )
                localStorage.setItem("auth", JSON.stringify({ data: data.data}))
                router.push('/')
                setIsLoading(true)
            } else {
                makeNotif(true, data.message)
            }

        } catch (error) {
            makeNotif(true, "Ada kesalahan")
        }
    }

  return (
    <>
    {isLoading && <Loading />}
    {
      isNotif.showNotif &&
      <section className='w-full h-full fixed top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center'>
        <div className='w-56 bg-white rounded-lg overflow-hidden'>
            <div className='flex flex-col items-center pb-3'>
                <div className='w-full bg-blue-300 flex justify-between items-center p-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <AiOutlineInfoCircle />
                        <p>Info</p>
                    </div>
                    <button onClick={handleClickNotification}><RxCross1 /></button>
                </div>
                <div className='p-3'>
                    <p>{isNotif.desc}</p>
                </div>
                <button className='py-2 px-5 w-fit rounded-lg shadow-md bg-blue-300 hover:bg-blue-400 active:bg-blue-500' onClick={handleClickNotification}>Ok</button>
            </div>
        </div>
      </section>
    }
    <div className='w-full h-screen flex flex-col items-center justify-between'>
        <div className='h-full w-full flex flex-col justify-center items-center gap-10 md:flex-row md:justify-evenly'>
            <section className='leading-3'>
                <h1 className='text-[#FF4141] font-bold text-8xl'>Kedai.</h1>
                <h2 className='text-[#293241] italic text-3xl font-semibold'>Your favorite shop</h2>
            </section>
            <form onSubmit={(e)=>handleSubmitAuth(e)}>
                <section className='w-full bg-[#293241] px-6 py-8 rounded-lg space-y-5 md:w-96'>
                    <div className='space-y-2'>
                        <div className='flex text-white'>
                            <p className='w-24'>Email</p>
                            <input type='text' name='email' value={user.email} onChange={(e)=>handleChangeUser(e)} className='flex-1 rounded-sm px-1 text-sm w-full text-black' />
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