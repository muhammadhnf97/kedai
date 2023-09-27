'use client'
import React, { useState } from 'react'
import jsPDF from 'jspdf'

const Home = () => {
    const doc = new jsPDF();

    const [selectedOption, setSelectedOption] = useState('1')
    const [selectedTanggal, setSelectedTanggal] = useState('1')

    const handleChange = (e, action) => {
        const {value} = e.target
        if (action === 'laporan') {
            setSelectedOption(value)
        } else if (action === 'tanggal') {
            setSelectedTanggal(value)
        }
    }

    const handleClick = async(action) => {
        if (action === 'export') {
            const namaTable = "Tabel Sepuh"
            doc.text(namaTable, 10, 10)
            doc.autoTable({ html: '#exportTable'})
            doc.save('table.pdf')
        } else if (action === 'tampilkan') {

        }
    } 
    
    const date = new Date()
    date.setDate((new Date).getDate() - 7)

    const sevenDaysBefore = date.toISOString()

    console.log(sevenDaysBefore)

  return (
    <div className='max-w-7xl mx-auto'>
        <section className='w-full h-full bg-white rounded-lg shadow-md shadow-gray-300 border p-5 flex flex-col gap-3 md:flex-row'>
            <div className='flex-1'>
                <p className='text-lg font-semibold'>Pilih  Laporan</p>
                <div className='flex flex-col p-5 w-full border-2 border-gray-300 rounded-lg'>
                    <div className='flex gap-2 items-center justify-start'>
                        <input 
                            type='radio'
                            value={'1'}
                            checked={selectedOption === '1'}
                            onChange={(e)=>handleChange(e, 'laporan')}
                            />
                            Penjualan
                    </div>
                    <div className='flex gap-2 items-center justify-start'>
                        <input 
                            type='radio'
                            value={'2'}
                            checked={selectedOption === '2'}
                            onChange={(e)=>handleChange(e, 'laporan')}
                            />
                            Pembelian
                    </div>
                </div>
            </div>
            <div className='flex-1'>
                <p className='text-lg font-semibold'>Tanggal</p>
                <div className='flex flex-col p-5 w-full border-2 border-gray-300 rounded-lg'>
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
                                Minggu ini
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
                            onChange={(e)=>handleChange(e)}
                            />
                    </div>}
                </div>
            </div>
            <div className='w-full flex flex-col gap-2 justify-center items-end md:w-fit'>
                <button 
                    className='py-2 w-full rounded-lg border-black 
                        shadow-sm bg-yellow-300 hover:bg-yellow-400 md:w-44' 
                    onClick={()=>handleClick('tampilkan')} >Tampilkan </button>
                <button 
                    className='py-2 w-full rounded-lg border-black 
                        shadow-sm bg-blue-300 hover:bg-blue-400 md:w-44' 
                    onClick={()=>handleClick('export')}> Export </button>
            </div>
        </section>
        <section className='text-center space-y-5 mt-10'>
            <table id='exportTable' className='w-full'>
                <thead>
                    <tr>
                        <th className='py-2 bg-slate-600 text-white'>No.</th>
                        <th className='py-2 bg-slate-600 text-white'>Puh</th>
                        <th className='py-2 bg-slate-600 text-white'>Sepuh</th>
                        <th className='py-2 bg-slate-600 text-white'>Ajarin</th>
                        <th className='py-2 bg-slate-600 text-white'>dong</th>
                        <th className='py-2 bg-slate-600 text-white'>puh</th>
                    </tr>
                </thead>
                <tbody>
                    <tr className='bg-blue-100'>
                        <td>2.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    <tr className='bg-blue-200'>
                        <td>1.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    <tr className='bg-blue-100'>
                        <td>2.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    <tr className='bg-blue-200'>
                        <td>1.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    <tr className='bg-blue-100'>
                        <td>2.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    <tr className='bg-blue-200'>
                        <td>1.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    <tr className='bg-blue-100'>
                        <td>2.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    <tr className='bg-blue-200'>
                        <td>1.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                    <tr className='bg-blue-100'>
                        <td>2.</td>
                        <td>bbbb</td>
                        <td>ccc</td>
                        <td>dddd</td>
                        <td>eee</td>
                        <td>fff</td>
                    </tr>
                </tbody>
            </table>
        </section>
    </div>
  )
}

export default Home