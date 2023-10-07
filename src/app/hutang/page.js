'use client'
import React, { useEffect, useState } from 'react'
import { fieldHutang } from '../utils/tableName'
import { useSupplier } from '../context/supplier'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'
import Loading from '../components/Loading'

const Home = () => {
    const page = 'hutang'
    const [isLoading, setIsLoading] = useState(true)
    const [supplier, setSupplier] = useState(null)
    const [noFaktur, setNoFaktur] = useState(null)
    const [listNoFaktur, setListNoFaktur] = useState([])
    const [pembelian, setPembelian] = useState([])
    const { listSupplier } = useSupplier()

    
    const [isNotif, setIsNotif] = useState({})

    const handleClickNotification = (show = false, message = null) => {
      if (!show) {
        setIsNotif({
          show,
          message
        })
      } else {
        setIsNotif({
          show,
          message
        })
      }
    }

    useEffect(()=>{
        setIsLoading(false)
        if (supplier) {
            const getPembelian = async() => {
                const response = await fetch (`/api/pembelian?supplier=${supplier}`)
                const data = await response.json()
                const tempListFaktur = new Set(data.data.map(val=>val.noFaktur))
                setListNoFaktur(Array.from(tempListFaktur))
            }
            getPembelian()
        }
    }, [supplier])

    useEffect(()=>{
        if (noFaktur) {
            const getPembelian = async() => {
                const response = await fetch (`/api/pembelian?supplier=${supplier}&&nofaktur=${noFaktur}`)
                const data = await response.json()
                setPembelian(data.data)
            }
            getPembelian()
        }
    }, [noFaktur])

    const handleChange = async(e, field) => {
        const { value } = e.target
        if (field === 'supplier') {
            setSupplier(value)
        } else if (field === 'noFaktur') {
           setNoFaktur(value)
        }
    }

    const newFieldforMobile = fieldHutang.filter(data=>data.mobileView)
    let totalRow = 0
  
    const newValues = pembelian.map(data=>{
      const temp = {}
      totalRow = totalRow+1
      newFieldforMobile.forEach(field=>{
        if (field.mobileView) {
          temp[field.key] = data[field.key]
        }
      })
      return temp
    })

    const handleClickLunas = async() => {
        try {
            const response = await fetch('/api/pembelian', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    pembelian
                })
            })
            const data = await response.json()
            handleClickNotification(true, data.message)
        } catch (error) {
            console.error('Ada kesalahan : ', error)
        } finally {
            setSupplier(null)
            setNoFaktur(null)
            setListNoFaktur([])
            setPembelian([])
        }
    }

  return (
    <>
    { isLoading && <Loading /> }
    {
      isNotif?.show &&
      <section className='w-full h-full fixed top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
        <div className='w-56 bg-white rounded-lg overflow-hidden'>
            <div className='flex flex-col items-center pb-3'>
                <div className='w-full bg-blue-300 flex justify-between items-center p-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <AiOutlineInfoCircle />
                        <p>Info</p>
                    </div>
                    <button onClick={()=>handleClickNotification()}><RxCross1 /></button>
                </div>
                <div className='p-3 w-full text-center'>
                    <p>{isNotif.message}</p>
                </div>
                <button className='py-2 px-5 w-fit rounded-lg shadow-md bg-blue-300 hover:bg-blue-400 active:bg-blue-500' onClick={()=>handleClickNotification()}>Ok</button>
            </div>
        </div>
      </section>
    }
    <div className='max-w-7xl mx-auto rounded-lg px-5 flex flex-col gap-5 mt-20 py-5'>
        <h3 className='text-center text-3xl font-semibold'>{page.toUpperCase().slice(0,1)+page.slice(1)}</h3>
        <div className='flex flex-col w-full gap-2 bg-white rounded-lg shadow-md px-3 py-2 md:flex-row'>
            <section className='w-full'>
                <p>Supplier</p>
                <select name='supplier' value={supplier ? supplier : ''} onChange={(e)=>handleChange(e, 'supplier')} className='px-2 w-full border rounded-sm border-gray-300 h-8 duration-150 outline-none hover:border-blue-300 focus:border-blue-400 focus:border-2'>
                    <option>Pilih Supplier</option>
                    {
                        listSupplier.map(data=>(
                            <option key={data.idSupplier} value={data.idSupplier}>{data.nmSupplier}</option>
                        ))
                    }
                </select>
            </section>
            <section className='w-full'>
                <p>No Faktur</p>
                <select name='supplier' value={noFaktur ? noFaktur : ''} onChange={(e)=>handleChange(e, 'noFaktur')} className='px-2 w-full border rounded-sm border-gray-300 h-8 duration-150 outline-none hover:border-blue-300 focus:border-blue-400 focus:border-2'>
                    <option>Pilih No Faktur</option>
                    {
                        listNoFaktur.map((data, index)=>(
                            <option key={data + index} value={data}>{data}</option>
                        ))
                    }
                </select>
            </section>
            <button className='py-2 px-10 rounded-lg shadow-md shadow-gray-300 bg-green-300 hover:bg-green-400' disabled={noFaktur ? false : true} onClick={handleClickLunas}>Lunas</button>
        </div>
        <div className='w-full rounded-lg shadow-md'>
            <div className='w-full rounded-lg shadow-md bg-white p-3'>
                <p className='font-semibold text-lg'>{page.toUpperCase().slice(0,1) + page.slice(1)}</p>
                <table className='w-full text-center'>
                    <thead>
                    <tr className='w-full h-10 bg-slate-700 text-white'>
                        {
                        newFieldforMobile.map(data=>{
                            if (data.mobileView) {
                            return (
                            <th key={data.key}>{data.label}</th>
                            )
                            }
                        })
                        }
                        { page !== 'hutang' && <th>Action</th>}
                    </tr>
                    </thead>
                    <tbody>
                    {
                        newValues.map((data, index)=>{
                        return (
                        <tr key={Object.values(data)[0].toString() + index.toString()} className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'} h-7 hover:bg-blue-400 hover:duration-150 ease-out`}>
                            {
                            Object.values(data).map(values=>{
                                return (
                                <td key={values}>{values}</td>
                            )})
                            }
                        </tr>
                        )})
                    }
                    <tr className='w-full bg-slate-500 text-white font-semibold'>
                        <td colSpan={4} className='py-1 text-lg'>Total Belanja</td>
                        <td colSpan={4} className='py-1 text-lg'>{
                        newValues.reduce((accumulator, currentValue)=>{
                            return accumulator + currentValue.totalBayar || currentValue.totalHarga
                        }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
                        }</td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    </>
  )
}

export default Home