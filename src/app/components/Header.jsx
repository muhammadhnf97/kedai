'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'
import { IoIosArrowDown } from 'react-icons/io'
import { useRouter, usePathname } from 'next/navigation'
import { useLogin } from '../context/login'
import { RxCross1 } from 'react-icons/rx'
import { menu } from '../utils/tableName'
import { logoutAuth } from '../utils/fetchingdata'
import Loading from './Loading'

const Header = () => {
    const currentPathname = usePathname()
    const router = useRouter()

    const { loginData } = useLogin()
    const { nmPegawai, jabatan } = loginData

    const renderUsernameAndStatus = (
        <div className='leading-3'>
            <h3 className='text-2xl font-bold text-[#293241]'>{nmPegawai}</h3>
            <h3 className='text-sml font-bold text-[#3D5A80]'>{jabatan}</h3>
        </div>
    )

    const [showMobileView, setShowMobileView] = useState(false)

    const handleClickMobileNavbar = () => {
        setShowMobileView(prev=>!prev)
    }

    const [isLoading, setIsLoading] = useState(false)

    const handleClickLogout = async() => {
        logoutAuth(loginData).then(values=>{
            if(values.status === 200){
                router.push('/login')
                setIsLoading(true)
            }
        }).catch((error) => {
            console.error("Terjadi kesalahan:", error);
        })
    }
    

  return (
    <>
    {isLoading && <Loading />}
    {}
    <div className='fixed hidden md:block w-full h-20 bg-white shadow-md z-30'>
        <div className='max-w-7xl h-full  px-5 mx-auto flex justify-between items-center relative'>
            { renderUsernameAndStatus }
            <ul className='flex gap-5 justify-center items-center'>
            {
                menu.map((listmenu)=>{
                    if(listmenu.jabatan.includes(jabatan)){
                        if(!listmenu.child){
                            return (
                                <div key={listmenu.id}>
                                    <Link href={listmenu.pathName}>
                                        <li>
                                            <p className={`py-1 px-2 hover:bg-[#98C1D9] hover:rounded-full duration-150 ease-out rounded-full ${listmenu.pathName === currentPathname && 'font-semibold bg-violet-300'}`}>{listmenu.label}</p>
                                            </li>
                                    </Link>
                                </div>
                            )
                        } else {
                            return (
                            <div key={listmenu.id} className='group leading-7'>
                                <div className='flex items-center justify-center gap-1'>{listmenu.label}<IoIosArrowDown /></div>
                                <ul className='absolute invisible origin-top scale-0 border-2 border-black rounded-lg duration-200 ease-out bg-white p-1 group-hover:scale-100 group-hover:visible '>
                                {
                                    listmenu.child.map(childmenu=>{
                                        if(childmenu.jabatan.includes(jabatan)){
                                            return (
                                            <div key={childmenu.id}>
                                                <Link href={childmenu.pathName}>
                                                    <li><p className={`px-2 hover:bg-[#98C1D9] hover:rounded-full ${childmenu.pathName === currentPathname && 'font-semibold bg-violet-300 rounded-full'}`}>{childmenu.label}</p></li>
                                                </Link>
                                            </div>
                                            )
                                        }
                                    })
                                }
                                </ul>
                            </div>
                            )
                        }
                    }
                })
            }
            </ul>
            <button 
            className='px-5 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 shadow-sm rounded-full py-1'
            onClick={handleClickLogout}>Logout</button>
        </div>
    </div>
    <div className='md:hidden fixed w-full h-20 px-5 flex items-center justify-between bg-white shadow-md z-30'>
        { renderUsernameAndStatus }
        <button className='flex items-center md:hidden' onClick={handleClickMobileNavbar}>
            <RiMenu3Fill className='w-7 h-7 ' />
        </button>
    </div>
    <div className={`fixed w-full h-full bg-black bg-opacity-70 z-30 ${showMobileView ? 'visible' : 'invisible'}`}>
        <div className={`w-full h-fit shadow-md bg-white text-center leading-7 relative`}>
            <button className='absolute right-3 top-2 rounded-full border-white border p-2'onClick={handleClickMobileNavbar}>
                <RxCross1 className='w-5 h-5' />
            </button>
            <div className='bg-indigo-200 space-y-3 p-3 shadow-inner'>
                { renderUsernameAndStatus }
                <button 
                className='px-5 bg-orange-400 hover:bg-orange-500 active:bg-orange-600 shadow-sm rounded-full py-1'
                onClick={handleClickLogout}>Logout</button>
            </div>
            <ul className='leading-6 px-10 py-2'>
                {
                    menu.map(listmenu=>{
                        if (listmenu.jabatan.includes(jabatan)){
                            if(!listmenu.child){
                                return (
                                    <div key={listmenu.id}>
                                        <Link href={listmenu.pathName}>
                                            <li className=' border-b-2 border-blue-500 bg-white p-1'><p className={`px-2 hover:bg-[#98C1D9] hover:rounded-full ${listmenu.pathName === currentPathname && 'font-semibold bg-violet-300 rounded-full'}`}>{listmenu.label}</p></li>
                                        </Link>
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={listmenu.id} className='group leading-7 my-2 rounded-lg'>
                                        <ul className='border-b-2 border-blue-500 bg-white p-1'>
                                        {
                                            listmenu.child.map(childmenu=>{
                                                if (childmenu.jabatan.includes(jabatan)){
                                                    return (
                                                    <div key={childmenu.id}>
                                                        <Link href={childmenu.pathName}>
                                                            <li><p className={`px-2 hover:bg-[#98C1D9] hover:rounded-full ${childmenu.pathName === currentPathname && 'font-semibold bg-violet-300 rounded-full'}`}>{childmenu.label}</p></li>
                                                        </Link>
                                                    </div>
                                                    )
                                                }
                                            })
                                        }
                                        </ul>
                                    </div>
                                )
                            }    
                        }
                    })
                }
            </ul>
        </div>
    </div>
    </>
  )
}

export default Header