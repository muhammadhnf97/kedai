'use client'
import React, { useState } from 'react'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import Notification from '../components/Notification';
import Loading from '../components/Loading';
import { laporanPembelian, laporanPenjualan } from '../utils/tableName';

const Home = () => {
    const doc = new jsPDF();


    const [notif, setNotif] = useState({})
    const handleNotif = (showNotif = false, message = null) => {
        setNotif({
            showNotif, message
        })
    }

    const [isLoading, setIsLoading] = useState(false)

    const [selectedLaporan, setSelectedLaporan] = useState('1')

    const field = selectedLaporan === '1' ? laporanPenjualan : laporanPembelian
    const page = selectedLaporan === '1' ? 'Penjualan' : 'Pembelian'

    const [selectedTanggal, setSelectedTanggal] = useState('1')
    const [selectedStatus, setSelectedStatus] = useState('1')
    const [manualDate, setManualDate] = useState('')

    const [laporan, setLaporan] = useState([])

    const handleChange = (e, action) => {
        const {value} = e.target
        if (action === 'laporan') {
            setSelectedLaporan(value)
        } else if (action === 'tanggal') {
            setSelectedTanggal(value)
        } else if (action === 'manualDate') {
            setManualDate(value)
        } else if (action === 'status') {
            setSelectedStatus(value)
        }
    }
    
    const handleClick = async(action) => {
        if (action === 'export') {
            const namaTable = "Laporan" + page
            doc.text(namaTable, 10, 10)
            doc.autoTable({ html: '#exportTable'})
            doc.save('table.pdf')
        } else if (action === 'tampilkan') {
            setIsLoading(true)
            try {
                const response = await fetch('/api/laporan', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        selectedLaporan, selectedTanggal, selectedStatus, manualDate
                    })
                })
                const data = await response.json()
                setLaporan(data.data)
                handleNotif(true, data.message)

            } catch (error) {
                console.error('Terjadi kesalahan saat memanggil laporan')
                handleNotif(true, 'Terjadi kesalahan saat memanggil laporan')
            } finally {
                setIsLoading(false)
            }
        }
    }

    const total = laporan.reduce((accumulator, currentValue) => accumulator + currentValue.total || accumulator + currentValue.totalHarga , 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })

  return (
    <>
    { notif?.showNotif && 
        <Notification
            notif={notif}
            handleNotif={handleNotif}  /> }
    { isLoading &&
        <Loading />
    }
    <div className='max-w-7xl mx-auto mt-20 py-5'>
        <section className='w-full h-full bg-white rounded-lg shadow-md shadow-gray-300 border px-5 py-2 flex flex-col gap-3 md:flex-row'>
            <div className='flex-1 space-y-1'>
                <p className='text-lg font-semibold'>Tanggal</p>
                <div className='flex flex-col p-2 w-full border-2 border-gray-300 rounded-lg'>
                        <div className='flex gap-2 items-center justify-start'>
                            <input 
                                type='radio'
                                value={'1'}
                                checked={selectedTanggal === '1'}
                                onChange={(e)=>handleChange(e, 'tanggal')}
                                />
                                Hari ini
                        </div>
                        <div className='flex gap-2 items-center justify-start'>
                            <input 
                                type='radio'
                                value={'2'}
                                checked={selectedTanggal === '2'}
                                onChange={(e)=>handleChange(e, 'tanggal')}
                                />
                                7 Hari kebelakang
                        </div>
                        <div className='flex gap-2 items-center justify-start'>
                            <input 
                                type='radio'
                                value={'3'}
                                checked={selectedTanggal === '3'}
                                onChange={(e)=>handleChange(e, 'tanggal')}
                                />
                                Bulan ini
                        </div>
                        <div className='flex gap-2 items-center justify-start'>
                            <input 
                                type='radio'
                                value={'4'}
                                checked={selectedTanggal === '4'}
                                onChange={(e)=>handleChange(e, 'tanggal')}
                                />
                                Pilih tanggal secara manual
                        </div>
                    {selectedTanggal === '4' && <div className='flex gap-2 items-center justify-start'>
                        <input 
                            type='date'
                            className='outline-none border border-blue-300 focus:border-blue-400 rounded-sm px-2'
                            onChange={(e)=>handleChange(e, 'manualDate')}
                            />
                    </div>}
                </div>
            </div>
            <div className='flex-1 space-y-1'>
                <p className='text-lg font-semibold'>Pilih  Laporan</p>
                <div className='flex flex-col p-2 w-full border-2 border-gray-300 rounded-lg'>
                    <div className='flex gap-2 items-center justify-start'>
                        <input 
                            type='radio'
                            value={'1'}
                            checked={selectedLaporan === '1'}
                            onChange={(e)=>handleChange(e, 'laporan')}
                            />
                            Penjualan
                    </div>
                    <div className='flex gap-2 items-center justify-start'>
                        <input 
                            type='radio'
                            value={'2'}
                            checked={selectedLaporan === '2'}
                            onChange={(e)=>handleChange(e, 'laporan')}
                            />
                            Pembelian
                    </div>
                </div>
            </div>
            <div className='flex-1 space-y-1'>
                <p className='text-lg font-semibold'>Status</p>
                <div className='flex flex-col p-2 w-full border-2 border-gray-300 rounded-lg'>
                    <div className='flex gap-2 items-center justify-start'>
                        <input 
                            type='radio'
                            value={'1'}
                            checked={selectedStatus === '1'}
                            onChange={(e)=>handleChange(e, 'status')}
                            />
                            Lunas
                    </div>
                    <div className='flex gap-2 items-center justify-start'>
                        <input 
                            type='radio'
                            value={'2'}
                            checked={selectedStatus === '2'}
                            onChange={(e)=>handleChange(e, 'status')}
                            />
                            Kredit
                    </div>
                </div>
            </div>
            <div className='w-full flex flex-col gap-2 justify-center items-end md:w-fit'>
                <button 
                    className='py-2 w-full rounded-lg border-black 
                        shadow-sm bg-yellow-300 hover:bg-yellow-400 md:w-44' 
                    onClick={()=>handleClick('tampilkan')} >Tampilkan </button>
                <button 
                    className={`${laporan?.length > 0 ? 'bg-blue-300 hover:bg-blue-400 md:w-44' : 'bg-gray-300'} py-2 w-full rounded-lg border-black 
                        shadow-sm `} 
                    onClick={()=>handleClick('export')}
                    disabled={laporan?.length > 0 ? false : true }> Export </button>
            </div>
        </section>
        {
            laporan.length > 0 &&
            <section className='text-center space-y-5 mt-10 max-h-96 overflow-auto bg-white p-3 rounded-lg shadow-md shadow-gray-300 border'>
                <p className='font-semibold text-lg text-left'>Laporan {page}</p>
            <table id='exportTable' className='w-full'>
                <thead>
                    <tr>
                        <th className='py-2 bg-slate-600 text-white'>No.</th>
                        {
                            field.map(fields=> (
                                <th key={fields.key} className='py-2 bg-slate-600 text-white'>{fields.label}</th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {laporan?.map((values, index)=>(
                        <tr key={index} className={index % 2 === 0 ? 'bg-blue-200' : 'bg-blue-300'}>
                            <td>{index+1}.</td>
                            {
                                Object.values(values).map((data, index)=>(
                                    <td key={index}>{data}</td>
                                ))
                            }
                        </tr>
                    ))}
                    <tr className='text-lg font-semibold text-white bg-slate-500'>
                        <td className='py-1' colSpan={4}>Total</td>
                        <td className='py-1' colSpan={5}>{total}</td>
                    </tr>
                </tbody>
            </table>
        </section>}
    </div>
    </>
  )
}

export default Home