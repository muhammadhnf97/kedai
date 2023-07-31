'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'
import { IoIosArrowDown } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'

const Header = () => {

    const [showMobileView, setShowMobileView] = useState(false)

    const handleClickMobileNavbar = () => {
        setShowMobileView(prev=>!prev)
    }

  return (
    <>
    <div className={`fixed w-full h-20 px-5 bg-white z-10`}>
        <div className='h-full max-w-7xl mx-auto border-b-2 border-[#EE6C4D] px-5 py-2 flex justify-between'>
            <div className='leading-3'>
                <h3 className='text-2xl font-bold text-[#293241]'>Username</h3>
                <h3 className='text-sml font-bold text-[#3D5A80]'>Administrator</h3>
            </div>
            <button className='flex items-center md:hidden' onClick={handleClickMobileNavbar}>
                <RiMenu3Fill className='w-7 h-7 ' />
            </button>
            <div className='hidden h-full md:flex md:items-center md:justify-center md:gap-4'>
                <Link href={'/'} >
                    <p className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>Home</p>
                </Link>
                <div className='relative group h-full flex items-center'>
                    <button className='flex items-center gap-2'>
                        <span className=''>Master</span><IoIosArrowDown />
                    </button>
                    <div className='absolute w-48 p-3 group flex flex-col -bottom-[9rem] left-7 border-2 border-[#293241] shadow-lg bg-[#E0FBFC] rounded-lg duration-200 origin-top-left invisible scale-0 group-hover:visible group-hover:scale-100'>
                        <Link href={'/barang'}>
                            <button className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>
                                    Barang
                            </button>
                        </Link>
                        <Link href={'/kategori'}>
                            <button className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>
                                    Kategori Barang
                            </button>
                        </Link>
                        <Link href={'/satuan'}>
                            <button className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>
                                    Satuan Barang
                            </button>
                        </Link>
                        <Link href={'/supplier'}>
                            <button className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>
                                    Supplier
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='relative group h-full flex items-center'>
                    <button className='flex items-center gap-2'>
                        <span className=''>Transaksi</span><IoIosArrowDown />
                    </button>
                    <div className='absolute w-48 p-3 group flex flex-col -bottom-[5rem] left-7 border-2 border-[#293241] shadow-lg bg-[#E0FBFC] rounded-lg duration-200 origin-top-left invisible scale-0 group-hover:visible group-hover:scale-100'>
                        <Link href={'/penjualan'}>
                            <button className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>
                                    Penjualan
                            </button>
                        </Link>
                        <Link href={'/pembelian'}>
                            <button className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>
                                    Pembelian
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='relative group h-full flex items-center'>
                    <button className='flex items-center gap-2'>
                        <span className=''>Hutang/Piutang</span><IoIosArrowDown />
                    </button>
                    <div className='absolute w-48 p-3 group flex flex-col -bottom-[5rem] left-7 border-2 border-[#293241] shadow-lg bg-[#E0FBFC] rounded-lg duration-200 origin-top-left invisible scale-0 group-hover:visible group-hover:scale-100'>
                        <Link href={'/hutang'}>
                            <button className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>
                                    Hutang
                            </button>
                        </Link>
                        <Link href={'/piutang'}>
                            <button className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>
                                    Piutang
                            </button>
                        </Link>
                    </div>
                </div>
                <p className='w-full py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>Laporan</p>
            </div>
        </div>
    </div>
    <section className={`fixed w-screen h-screen bg-black bg-opacity-80 duration-300 z-20 ${showMobileView ? 'visible' : 'invisible'}`}>
        <div className={`relative w-full bg-white flex flex-col items-center gap- py-5 duration-300 ease-in-out ${showMobileView ? 'visible translate-y-0' : 'invisible -translate-y-20'}`}>
            <button className='w-10 h-10 absolute top-5 right-10 px-1 rounded-full border flex justify-center items-center duration-200 hover:bg-gray-100' onClick={handleClickMobileNavbar}>
                <RxCross1 />
            </button>
            <Link href={'/'}>
                <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-100 ease-out mb-2'>Home</p>
            </Link>
            <div className='w-56 flex flex-col items-center py-2 border-t-2 border-[#293241]'>
                <Link href={'/'} >
                    <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-100 ease-out'>Barang</p>
                </Link>
                <Link href={'/barang'} >
                    <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-100 ease-out'>Kategori</p>
                </Link>
                <Link href={'/katagori'} >
                    <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-100 ease-out'>Supplier</p>
                </Link>
            </div>
            <div className='w-56 flex flex-col items-center py-2 border-t-2 border-[#293241]'>
                <Link href={'/pembelian'} >
                    <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-100 ease-out'>Pembelian</p>
                </Link>
                <Link href={'/penjualan'} >
                    <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-100 ease-out'>Penjualan</p>
                </Link>
            </div>
            <div className='w-56 flex flex-col items-center py-2 border-t-2 border-b-2 border-[#293241]'>
                <Link href={'/hutang'} >
                    <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-100 ease-out'>Hutang</p>
                </Link>
                <Link href={'/piutang'} >
                    <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-100 ease-out'>Piutang</p>
                </Link>
            </div>
            <Link href={'/laporan'}>
                <p className='hover:bg-[#98C1D9] w-fit rounded-full px-20 py-1 hover:duration-200 ease-in mb-2 mt-2'>Laporan</p>
            </Link>
        </div>
    </section>
    </>
  )
}

export default Header