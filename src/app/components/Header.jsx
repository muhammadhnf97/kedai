'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'
import { IoIosArrowDown } from 'react-icons/io'
import { usePathname } from 'next/navigation'
import { useLogin } from '../context/login'

const Header = () => {
    const currentPathname = usePathname()
    const menu = [{
        label: 'Home',
        pathName: '/',
        child: null
    },{
        label: 'Master',
        pathName: '/',
        child: [{
            label: 'Barang',
            pathName: '/barang',
            child: null
        },{
            label: 'Kategori Barang',
            pathName: '/kategori',
            child: null
        },{
            label: 'Satuan Barang',
            pathName: '/satuan',
            child: null
        },{
            label: 'Supplier',
            pathName: '/supplier',
            child: null
        },{
            label: 'Pegawai',
            pathName: '/pegawai',
            child: null
        }]
    },{
        label: 'Transaksi',
        pathName: '/',
        child: [{
            label: 'Pembelian',
            pathName: '/pembelian',
            child: null
        },{
            label: 'Kategori Barang',
            pathName: '/penjualan',
            child: null
        }]
    },{
        label: 'Hutang/Piutang',
        pathName: '/',
        child: [{
            label: 'Hutang',
            pathName: '/hutang',
            child: null
        },{
            label: 'Piutang',
            pathName: '/piutang',
            child: null
        }]
    },{
        label: 'Laporan',
        pathName: '/laporan',
        child: null
    },]

    const { loginData, handleClickSaveLoginData } = useLogin()

    const renderUsernameAndStatus = (
        <div className='leading-3'>
            <h3 className='text-2xl font-bold text-[#293241]'>{loginData.nmPegawai}</h3>
            <h3 className='text-sml font-bold text-[#3D5A80]'>{loginData.status}</h3>
        </div>
    )

    const [showMobileView, setShowMobileView] = useState(false)

    const handleClickMobileNavbar = () => {
        setShowMobileView(prev=>!prev)
    }

  return (
    <>
    <div className='fixed hidden md:block w-full h-20 bg-white shadow-md z-10'>
        <div className='max-w-7xl h-full  px-5 mx-auto flex justify-between items-center relative'>
            { renderUsernameAndStatus }
            <ul className='flex gap-5 justify-center items-center'>
            {
                menu.map((listmenu)=>{
                    if(!listmenu.child){
                        return (
                            <Link key={listmenu.pathName} href={listmenu.pathName} as={Link}>
                                <li>
                                    <p className={`py-1 px-2 hover:bg-[#98C1D9] hover:rounded-full duration-150 ease-out rounded-full ${listmenu.pathName === currentPathname && 'font-semibold bg-violet-300'}`}>{listmenu.label}</p>
                                    </li>
                            </Link>
                        )
                    } else {
                        return (
                        <div className='group leading-7'>
                            <div className='flex items-center justify-center gap-1'>{listmenu.label}<IoIosArrowDown /></div>
                            <ul className='absolute invisible origin-top scale-0 border-2 border-black rounded-lg duration-200 ease-out bg-white p-1 group-hover:scale-100 group-hover:visible '>
                            {
                                listmenu.child.map(childmenu=>(
                                    <Link key={childmenu.pathName} href={childmenu.pathName} as={Link}>
                                        <li><p className={`px-2 hover:bg-[#98C1D9] hover:rounded-full ${childmenu.pathName === currentPathname && 'font-semibold bg-violet-300 rounded-full'}`}>{childmenu.label}</p></li>
                                    </Link>
                                ))
                            }
                            </ul>
                        </div>
                        )
                    }
                })
            }
            </ul>
        </div>
    </div>
    <div className='md:hidden fixed w-full h-20 px-5 flex items-center justify-between bg-white shadow-md'>
        { renderUsernameAndStatus }
        <button className='flex items-center md:hidden' onClick={handleClickMobileNavbar}>
            <RiMenu3Fill className='w-7 h-7 ' />
        </button>
    </div>
    <div className={`fixed w-full h-full bg-black bg-opacity-70 ${showMobileView ? 'visible' : 'invisible'}`} onClick={handleClickMobileNavbar}>
        <div className={`w-full h-fit shadow-md bg-white text-center leading-7 py-5 px-10`}>
            <ul className='leading-6'>
                {
                    menu.map(listmenu=>{
                        if(!listmenu.child){
                            return (
                                <Link key={listmenu.pathName} href={listmenu.pathName}>
                                    <li><p className={`px-2 hover   :bg-[#98C1D9] hover:rounded-full ${listmenu.pathName === currentPathname && 'font-semibold bg-violet-300 rounded-full'}`}>{listmenu.label}</p></li>
                                </Link>
                            )
                        } else {
                            return (
                                <div className='group leading-7 my-2 rounded-lg'>
                                    <ul className='border-t-2 border-blue-500 bg-white p-1'>
                                    {
                                        listmenu.child.map(childmenu=>(
                                            <Link href={childmenu.pathName}>
                                                <li><p className={`px-2 hover:bg-[#98C1D9] hover:rounded-full ${childmenu.pathName === currentPathname && 'font-semibold bg-violet-300 rounded-full'}`}>{childmenu.label}</p></li>
                                            </Link>
                                        ))
                                    }
                                    </ul>
                                </div>
                            )
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