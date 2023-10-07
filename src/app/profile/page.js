'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import { useNotification } from '../context/notification'
import { useLogin } from '../context/login'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { AiOutlineEye } from 'react-icons/ai'

const Home = () => {

    const { notif, handleNotif } = useNotification()
    const { loginData } = useLogin()
    const [isLoading, setIsLoading] = useState(false)

    const [entryPassword, setEntryPassword] = useState({})

    const fetchUser = async() => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/user/changepassword', {
                method: 'POST',
                headers: {
                    authorization: '',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: loginData.userId,
                    entryPassword
                })
            })
    
            const data = await response.json()
            handleNotif(true, data.message)
            setIsLoading(false)
            setEntryPassword({})
        } catch (error) {
            console.error("Ada kesalahan saat mengirim data", error)
        }
    }

    const entryField = [{
        id: 1,
        label: "Password lama",
        key: "oldPassword",
        type: 'password'
    },{
        id: 2,
        label: "Password Baru",
        key: "newPassword",
        type: 'password'
    },{
        id: 3,
        label: "Konfirmasi Password Baru ",
        key: "newPasswordConfirm",
        type: 'password'
    },]
    
    const handleChange = (e) => {
        const { name, value } = e.target
        setEntryPassword(prev=>{
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const [visible, setVisible] = useState({
        oldPassword: false,
        newPassword: false,
        newPasswordConfirm: false
    })

    const handleClickVisible = (key) => {
        setVisible(prev=>{
            return {
                ...prev,
                [key] : !prev[key]
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (entryPassword.newPassword !== entryPassword.newPasswordConfirm) {
            handleNotif(true, "Password baru dan konfirmasi password baru tidak sesuai")
            return
        }

        fetchUser()
    }

  return (
    <>
    {
        isLoading && <Loading />
    }
    {
        notif?.showNotif && 
            <Notification 
                notif={notif}
                handleNotif={handleNotif}
                />
    }
    
    <div className='max-w-7xl mx-auto space-y-3 mt-20 py-5'>
      <h3 className='text-center text-3xl font-semibold'>Ubah Password</h3>
        <div className='w-full bg-white rounded-lg shadow-md shadow-gray-300 p-5 flex justify-center'>
            <form onSubmit={(e)=>handleSubmit(e)}>
                {
                    entryField.map(fields=>{
                        const defaultValue = entryPassword[fields.key] || ''
                        const type = visible[fields.key] ? 'text' : fields.type
                        return (
                        <label key={fields.id} htmlFor={fields.key} className='flex flex-col'>
                            {fields.label}
                            <div className='w-96 flex gap-2 items-center'>
                                <input 
                                    type={type} 
                                    name={fields.key} 
                                    value={defaultValue}
                                    className='w-full h-8 border border-gray-300 rounded-sm
                                        outline-none px-2 hover:border-blue-300'
                                    onChange={(e)=>handleChange(e)}
                                    disabled={isLoading}  />
                                    <button
                                        type='button'
                                        onClick={()=>handleClickVisible(fields.key)}
                                        className='w-6 h-6'
                                        disabled={isLoading}>{ type === 'text' ? 
                                            <AiOutlineEye className='w-full h-full' /> :  
                                            <AiOutlineEyeInvisible className='w-full h-full' />  }</button>
                            </div>
                        </label>
                    )})
                }
                <button className='w-full py-1 mt-2 rounded-lg shadow-md shadow-gray-300 bg-green-300 hover:bg-green-400'
                disabled={isLoading}>Ubah</button>
            </form>
        </div>
    </div>
    </>
  )
}

export default Home