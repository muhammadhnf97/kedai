'use client'
import Link from 'next/link'
import React, { useState } from 'react'
import { RiMenu3Fill } from 'react-icons/ri'
import { IoIosArrowDown } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'

const Header = () => {

    const [dropdownMaster, setDropdownMaster] = useState(false)
    const [dropdownTransaksi, setDropdownTransaksi] = useState(false)
    const [dropdownHutangPiutang, setDropdownHutangPiutang] = useState(false)
    const [showMobileView, setShowMobileView] = useState(false)

    const handleClickMobileNavbar = () => {
        setShowMobileView(prev=>!prev)
    }

    const handleClickDropdownMaster = () => {
        setDropdownMaster(prev=>!prev)
    }
    const handleClickDropdownTransaksi = () => {
        setDropdownTransaksi(prev=>!prev)
    }
    const handleClickDropdownHutangPiutang = () => {
        setDropdownHutangPiutang(prev=>!prev)
    }

  return (
    <>
    <div className={`fixed w-full h-20 px-5 bg-white`}>
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
                    <p className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>Home</p>
                </Link>
                <div className='relative'>
                    <button id='dropdownHoverButton' className='flex items-center gap-2' onClick={handleClickDropdownMaster}><span className=''>Master</span><IoIosArrowDown /></button>
                    <div className={`absolute w-48 p-3 group flex flex-col -bottom-[8rem] left-7 border-2 border-[#293241] shadow-lg bg-[#E0FBFC] rounded-lg duration-200 origin-top-left ${dropdownMaster ? 'visible scale-100' : 'invisible scale-0'}`}>
                        <div className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'><Link href={'/barang'}>Barang</Link></div>
                        <div className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'><Link href={'/supplier'}>Supplier</Link></div>
                        <div className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'><Link href={'/kategori'}>Kategori</Link></div>
                    </div>
                </div>
                <div className='relative'>
                    <button id='dropdownHoverButton' className='flex items-center gap-2' onClick={handleClickDropdownTransaksi}><span>Transaksi</span><IoIosArrowDown /></button>
                    <div className={`absolute w-48 p-3 group flex flex-col -bottom-[6rem] left-7 border-2 border-[#293241] shadow-lg bg-[#E0FBFC] rounded-lg duration-200 origin-top-left ${dropdownTransaksi ? 'visible scale-100' : 'invisible scale-0'}`}>
                        <div className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'><Link href={'/penjualan'}>Penjualan</Link></div>
                        <div className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'><Link href={'/pembelian'}>Pembelian</Link></div>
                    </div>
                </div>
                <div className='relative'>
                    <button id='dropdownHoverButton' className='flex items-center gap-2' onClick={handleClickDropdownHutangPiutang}><span>Hutang/Piutang</span><IoIosArrowDown /></button>
                    <div className={`absolute w-48 p-3 group flex flex-col -bottom-[6rem] left-7 border-2 border-[#293241] shadow-lg bg-[#E0FBFC] rounded-lg duration-200 origin-top-left ${dropdownHutangPiutang ? 'visible scale-100' : 'invisible scale-0'}`}>
                        <div className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'><Link href={'/hutang'}>Hutang</Link></div>
                        <div className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'><Link href={'/piutang'}>Piutang</Link></div>
                    </div>
                </div>
                <p className='py-1 px-2 hover:bg-[#98C1D9] duration-150 ease-out rounded-full'>Laporan</p>
            </div>
        </div>
    </div>
    <section className={`fixed w-screen h-screen bg-black bg-opacity-80 duration-300 ${showMobileView ? 'visible' : 'invisible'}`}>
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