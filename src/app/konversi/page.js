'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { PiMinusBold, PiPlusBold } from 'react-icons/pi'
import KonversiTable from '../components/KonversiTable'
import Notification from '../components/Notification'

const Home = () => {
    const page = 'konversi'
    const [keyword, setKeyword] = useState('')
    const [allBarang, setAllBarang] = useState([])
    const [barang, setBarang] = useState(null)
    const [barangKonversi, setBarangKonversi] = useState(null)
    const [stokKonversi, setStokKonversi] = useState(0)

    const handleChange = (e, action) => {
        const {value} = e.target
        if (action === 'keyword') {
            setKeyword(value)
        } else {
            setStokKonversi(value)
        }
    }

    const handleClickEmptyKeyword = () => {
        setKeyword('')
    }

    useEffect(()=>{
        if (keyword.length > 0){
            const getData = async() => {
                const response = await fetch(`/api/barang/getbyname?keyword=${keyword}`)
                const data = await response.json()
                setAllBarang(data)
            }
            
        getData() 
        } else {
            setAllBarang([])
        }
    }, [keyword])

    const handleClickAddNewBarang = async (init) => {
        if (!barang) {
            setBarang(init)
            setBarangKonversi(()=>{
                return allBarang.data.find(prevData=>prevData.namaBarang === init.namaBarang && prevData.namaSatuan !== init.namaSatuan)
            })
        } else {
            setBarangKonversi(init)
        }
        setKeyword('')
    }

    const handleReset = () => {
        setBarang(null)
        setBarangKonversi(null)
    }

    const handleClickStokDikonversi = (action) => {
        if (action === 'kurang') {
            setStokKonversi(prev=>prev < 1 ? 0 : prev - 1)
        } else {
            setStokKonversi(prev=>prev + 1)
        }
    }

    const handleClickKonversi = async() => {

        if (stokKonversi < 1) {
            return
        }

        const response = await fetch ('/api/konversi', {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                idBarang: barang.idBarang, 
                idBarangKonversi: barangKonversi.idBarang, 
                stokKonversi
            })
        })
        const data = await response.json()

        setBarang({})
        setBarangKonversi({})
        setStokKonversi(0)
        handleNotif ('konversi', data.message)

    }

    const [notif, setNotif] = useState({})

    const handleNotif = (showNotif = false, message = null) => {
        setNotif({
          showNotif, message
        })
    }

    return (
    <>
    { notif.showNotif && <Notification
        notif={notif}
        handleNotif={handleNotif}
    />}
    <div className='max-w-7xl mx-auto space-y-5'>
        <h3 className='text-center text-3xl font-semibold'>{page.toUpperCase().slice(0,1)+page.slice(1)}</h3>
        <div className='w-full bg-white rounded-lg shadow-md shadow-gray-300 py-2 px-3 space-y-5 border border-gray-300'>
            <h3 className='text-lg font-semibold'>{page.toUpperCase().slice(0, 1)+page.slice(1)} Barang</h3>
            <div className='flex-1 w-full relative z-20'>
                <p>Barang</p>
                <div className='flex items-center w-full'>
                    <input type='text' name='namaBarang' value={keyword || ''} autoComplete='off' className='relative z-30 px-2 w-full border rounded-sm border-gray-300 h-8 duration-150 outline-none hover:border-blue-300 focus:border-blue-400 focus:border-2' onChange={e=>handleChange(e, 'keyword')} />
                </div>
                {allBarang?.data?.length > 0 &&
                <>
                <div className='fixed w-full h-full top-0 left-0 z-20 bg-black bg-opacity-30'></div>
                <div className='bg-slate-600 shadow-md absolute z-20 w-full left-0'>
                    <div className='flex items-center justify-between py-1 font-bold px-3 w-full text-white'>
                        <p>List barang</p>
                        <button onClick={handleClickEmptyKeyword}><RxCross1 /></button>
                    </div>
                    <div className='absolute w-full h-fit max-h-60 overflow-auto border-2 border-slate-600'>
                    {
                        allBarang?.data?.map((init, index)=>(
                            <div key={init.idBarang} className={`flex w-full gap-2 items-center justify-center py-1 px-3 hover:bg-gray-400 ${index%2===0 ? 'bg-blue-200' : 'bg-blue-300'}`}>
                                <p className='flex-1'>{init.idBarang}</p>
                                <p className='flex-1'>{init.namaBarang}</p>
                                <p className='flex-1'>{init.stok} {init.namaSatuan}</p>
                                <p className='flex-1'>{init.nmKategori}</p>
                                <button type='button' className='px-2 py-1 bg-green-400 rounded-lg shadow-md hover:bg-green-500 active:bg-green-600' onClick={()=>handleClickAddNewBarang(init)}>Add</button>
                            </div>
                        ))
                    }
                    </div>
                </div>
                </> 
                }
            </div>
            <div className='w-full flex flex-col items-center justify-center gap-5 md:flex-row'>
                <KonversiTable data={barang} />
                <p className='text-xl font-semibold'>Konversi ke</p>
                <KonversiTable data={barangKonversi} />
            </div>
            <div className='w-full space-y-3'>
                <h3 className='text-center font-semibold'>Banyak stok {barang?.namaBarang} yang dikonversi</h3>
                <div className='flex w-full justify-evenly md:justify-center md:gap-5'>
                    <button className='text-blue-500 hover:text-blue-600 bg-gray-200 hover:bg-gray-200 rounded-lg hover:shadow-md px-3 py-1' onClick={()=>handleClickStokDikonversi('kurang')}>
                        <PiMinusBold className='w-7 h-7' />
                    </button>
                    <div className='flex items-center justify-center font-semibold'>
                        <input type='number' 
                            name='stokKonversi' 
                            value={stokKonversi} 
                            className='focus:border-b-2 border-blue-400 outline-none w-10'
                            onChange={e=>handleChange(e, 'stokKonversi')}
                        />
                        <p>/{barang?.namaSatuan}</p>
                    </div>
                    <button className='text-blue-500 hover:text-blue-600 bg-gray-200 hover:bg-gray-200 rounded-lg hover:shadow-md px-3 py-1' onClick={()=>handleClickStokDikonversi('tambah')}>
                        <PiPlusBold className='w-7 h-7' />
                    </button>
                </div>
                <div className='flex gap-3'>
                    <button 
                        disabled={barang || barangKonversi ? false : true} 
                        className='flex-1 w-full py-1 shadow-md rounded-lg bg-green-300 hover:bg-green-400' 
                        onClick={handleClickKonversi}>Konversi
                    </button>
                    <button className='flex-1 w-full py-1 shadow-md rounded-lg bg-red-300' onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home