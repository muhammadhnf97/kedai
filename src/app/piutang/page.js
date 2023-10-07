'use client'

import React, { useEffect, useState } from 'react'
import { fieldPiutang } from '../utils/tableName'
import Loading from '../components/Loading'
import Notification from '../components/Notification'

const page = () => {
    const page = 'piutang'
    const [konsumen, setKonsumen] = useState([])
    const [allNota, setAllNota] = useState([])
    const [entryValue, setEntryValue] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const [allTransaction, setAllTransaction] = useState([])

    useEffect(()=>{
        if (allTransaction.length > 0) {
            const newNota = allTransaction.map(data=>{
                return {
                    noNota: data.noNota
                }
            })

            const filterNota = newNota.reduce((accumulator, currentValue)=>{
                const isDuplicate = accumulator.some(val=>val.noNota === currentValue.noNota)
                if (!isDuplicate) {
                    accumulator.push(currentValue)
                }
                return accumulator
            }, [])

            setAllNota(filterNota)
        }
    }, [allTransaction])

    const allKonsumen = async () => {
        try {
            const response = await fetch('/api/piutang/konsumen')
            const data = await response.json()

            let newKonsumen
            
            if (data.data.length > 0) {
                newKonsumen = data.data.reduce((accumulator, currentValue)=>{
                    const isDuplicate = accumulator.some(val=>val.idKonsumen === currentValue.idKonsumen)

                    if (!isDuplicate) {
                        accumulator.push(currentValue) 
                    }

                return accumulator
                }, [])
                setKonsumen(newKonsumen)
            } else {
                setKonsumen([])
            }
        } catch (error) {
            console.error('Ada kesalahan saat mengambil data : ', error)
            setKonsumen([])
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(()=>{
        allKonsumen()
    }, [])

    const handleChange = async(e, action) => {
        const { name, value } = e.target
        if (action === 'add') {
            setEntryValue(prev=>{
                return {
                    ...prev,
                    [name]: value
                }
            })
        }
    }

    const getAllTransaction = async() => {
        try {
            const response = await fetch(`/api/piutang/transaksi?idKonsumen=${entryValue?.idKonsumen}`)
            const data = await response.json()
            
            if (data.data.length > 0) {
                setAllTransaction(data.data)
            } else {
                setAllTransaction([])
            }

        } catch (error) {
            console.error('Ada kesalahan : ', error)
            setAllTransaction([])
        }
    }

    useEffect(()=>{
        setAllTransaction([])
        if (entryValue?.idKonsumen?.length > 0) {
            getAllTransaction()
        }
    }, [entryValue?.idKonsumen])

    const handleClick = async() => {
        setIsLoading(true)
        try {
            const response = await fetch('/api/piutang/lunas', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    allNota
                })
            })
            const data = await response.json()
            handleNotif(true, data.message)
            
        } catch (error) {
            console.error('Ada kesalahan : ', error)
            handleNotif(true, 'Ada kesalahan')
        } finally {
            setEntryValue({})
            setAllTransaction([])
            setAllNota([])
            setKonsumen([])
            setIsLoading(false)
        }

    }

    const [notif, setNotif] = useState({})

    const handleNotif = (showNotif = false, message = null) => {
        setNotif({showNotif, message})
    }

    useEffect(()=>{
        if (entryValue?.noNota) {

            setAllTransaction(prev=>{
                return prev.filter(data=>data.noNota !== entryValue?.noNota)
            })
        }
        
    }, [entryValue?.noNota])



  return (
    <>
    { isLoading && <Loading />}
    { notif.showNotif && 
        <Notification
            notif={notif}
            handleNotif={handleNotif} />}
    <div className='max-w-7xl mx-auto space-y-5 mt-20 py-5'>
      <h3 className='text-center text-3xl font-semibold'>{page.toUpperCase().slice(0,1)+page.slice(1)}</h3>
        <div className='w-full flex gap-3'>
            <section className='w-2/6 p-5 space-y-5 bg-white rounded-lg shadow-md shadow-gray-300'>
                {
                    fieldPiutang.map(field=>{
                        let inputField
                        if (field.showOn.includes('add')) {
                            const defaultValue = entryValue[field.key]
                            if (field.key === 'idKonsumen') {
                                inputField =
                                <div key={field?.key} className='flex'>
                                    <div className='flex-1'>
                                        <p>{field.label}</p>
                                    </div>
                                    <select 
                                        name={field.key} 
                                        value={defaultValue}
                                        className='flex-1 px-2 w-full border rounded-sm 
                                            border-gray-300 h-8 duration-150 outline-none 
                                            hover:border-blue-300 focus:border-blue-400'
                                        onChange={e=>handleChange(e, 'add')}>
                                        <option>--Select--</option>
                                        {
                                            konsumen?.map(options=>(
                                                <option 
                                                    key={options?.idKonsumen} 
                                                    value={options?.idKonsumen}>{options?.nmKonsumen}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div> 
                            } 
                            // if (field.key === 'noNota') {
                            //     inputField =
                            //     <div key={field?.key} className='flex'>
                            //         <div className='flex-1'>
                            //             <p>{field.label}</p>
                            //         </div>
                            //         <select 
                            //             name={field.key} 
                            //             value={defaultValue}
                            //             className='flex-1 px-2 w-full border rounded-sm 
                            //             border-gray-300 h-8 duration-150 outline-none 
                            //             hover:border-blue-300 focus:border-blue-400'
                            //             onChange={e=>handleChange(e, 'add')}
                            //             disabled={entryValue?.idKonsumen ? false : true}>
                            //             <option>Tampilkan semua nota</option>
                            //             {
                            //                 allNota?.map(nota=>(
                            //                     <option 
                            //                         key={nota.noNota} 
                            //                         value={nota.noNota}>{nota.noNota}
                            //                     </option>
                            //                 ))
                            //             }
                            //         </select>
                            //     </div> 
                            // }
                        }
                        return (
                            inputField
                        )
                    })
                }
                <div className='w-full'>
                    <button className={`w-full py-2 rounded-lg text-lg font-semibold ${konsumen.length > 0 ? `bg-green-300 
                        hover:bg-green-400` : `bg-gray-300`}`}
                        onClick={()=>handleClick('lunas')}
                        disabled={konsumen.length > 0 ? false : true}>Lunas</button>
                </div>
            </section>
            <section className='w-4/6 space-y-3 bg-white rounded-lg shadow-md shadow-gray-300 p-5'>
                <div className='w-full flex flex-col text-center text-xl font-semibold text-slate-800 md:flex-row md:text-3xl'>
                    <div className='flex-1 bg-blue-200 py-2'>Total</div>
                    <div className='flex-1 bg-slate-100 py-2'>{
                        allTransaction.reduce((accumulator, currentValue)=>{
                            return accumulator + currentValue.total
                        }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})
                    }</div>
                </div>
                <h4 className='text-lg font-semibold'>List piutang</h4>
                <table className='w-full px-3 text-center'>
                    <thead className='text-semibold text-lg'>
                        <tr className='bg-slate-600 text-white'>
                            <th className='px-1 py-1'>No.</th>
                            <th className='px-1 py-1'>No Nota</th>
                            <th className='px-1 py-1'>Tanggal</th>
                            <th className='px-1 py-1'>Barang</th>
                            <th className='px-1 py-1'>Satuan</th>
                            <th className='px-1 py-1'>Jumlah</th>
                            <th className='px-1 py-1'>Harga Jual</th>
                            <th className='px-1 py-1'>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        allTransaction?.map((data, index)=>(
                            <tr key={data.idBarang} 
                            className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-gray-100'} 
                                duration-100 hover:bg-blue-300 cursor-pointer`}>
                                <td className='px-1 py-1'>{index + 1}</td>
                                <td className='px-1 py-1'>{data.noNota}</td>
                                <td className='px-1 py-1'>{data.tglJual}</td>
                                <td className='px-1 py-1'>{data.namaBarang}</td>
                                <td className='px-1 py-1'>{data.namaSatuan}</td>
                                <td className='px-1 py-1'>{data.jumlah}</td>
                                <td className='px-1 py-1'>{data.hargaJual.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})}</td>
                                <td className='px-1 py-1'>{data.total.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </section>
        </div>
    </div>
    </>
  )
}

export default page