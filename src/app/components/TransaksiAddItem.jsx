import React, { useEffect, useState } from 'react'
import { useSupplier } from '../context/supplier'
import { getBasedSearch } from '../utils/fetchingdata'
import { IoIosArrowDown } from 'react-icons/io'
import { RxCross1 } from 'react-icons/rx'

const TransaksiAddItem = ({ page, field, tempBarang, kunciSupplier, sesiPembelian, handleChange, handleSubmit, handleReset, handleClickAddNewBarang, handleClickKunciSupplier, handleClickAddToInsertValue, handleClickBatal }) => {

    const filterField = field.filter(data=>data.showOn.includes('add'))
    const { listSupplier } = useSupplier()
    const [initialData, setInitialData] = useState([])
    const [keyword, setKeyword] = useState('')

    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value)
    }

    const handleClickEmptyKeyword = () => {
        setKeyword('')
    }

    useEffect(()=>{
        if (keyword.length > 0){
            const getData = async() => {
                const response = await fetch(`/api/barang/getbyname?keyword=${keyword}`)
                const data = await response.json()
                setInitialData(data)
            }
            
        getData() 
        } else {
            setInitialData([])
        }
    }, [keyword])
    
  return (
    <>
    {
    Object.keys(tempBarang).length > 0 &&
      <div className='fixed w-full h-full bg-black bg-opacity-60 z-30 top-0 left-0 flex items-center justify-center'>
        <div className='bg-white rounded-lg shadow-md p-3 space-y-2'>
            <div className='text-sm font-semibold leading-3 text-center'>
                <p className='text-xl'>{tempBarang.namaBarang}</p>
                <p>{tempBarang.idBarang}</p>
            </div>
            {
                field.map(data=>{
                    if (data.showOn.includes('add') && data.selectBarangFirst) {
                        return (
                        <div key={data.key} className='flex items-center space-y-1'>
                            <p className='flex-1 '>{data.label}</p>
                            <input type={data.key} name={data.key} className='flex-1 px-2 w-full border rounded-sm border-gray-300 h-8 duration-150 outline-none hover:border-blue-300 focus:border-blue-400 focus:border-2' onChange={e=>handleChange(e, 'insert', true)} />
                        </div>            
                        )
                    }
                })
            }
            <div className='flex gap-2'>
                <button className='flex-1 w-full bg-green-400 shadow-sm shadow-gray-400 rounded-lg py-1' onClick={handleClickAddToInsertValue}>Tambah</button>
                <button className='flex-1 w-full bg-orange-400 shadow-sm shadow-gray-400 rounded-lg py-1' onClick={()=>handleClickBatal('barang')}>Batal</button>
            </div>
        </div>
      </div>
    }
    <div className='w-full rounded-lg bg-white shadow-md px-3 py-2 space-y-2'>
        <p className='font-semibold text-lg'>+ Tambah data {page.toLowerCase()} baru</p>
            <div className='w-full flex gap-5 flex-col'>
                <div className='flex-1'>
                    <div className='w-full grid grid-cols-1 md:grid-cols-2 gap-1 pb-2'>
                        {
                            filterField.map((data)=>{
                                const defaultValue = sesiPembelian[data.key] || ''
                                if ( data.showOn.includes('add') && !data.selectBarangFirst) {
                                    if (data.manualInput){
                                        if (data.type === 'text' || data.type === 'number'){
                                            return (
                                            <div key={data.key}>
                                                <p className=''>{data.label}</p>
                                                <input type={data.type} name={data.key} value={defaultValue} className='px-2 w-full border rounded-sm border-gray-300 h-8 duration-150 outline-none hover:border-blue-300 focus:border-blue-400 focus:border-2' disabled={kunciSupplier} onChange={(e)=>handleChange(e, 'insert')} />
                                            </div>
                                        )} else if (data.type === 'select') {
                                            return (
                                                <div key={data.key}>
                                                    <p>{data.label}</p>
                                                    <select name={data.key} value={defaultValue} className='px-2 w-full border rounded-sm border-gray-300 h-8 duration-150 outline-none hover:border-blue-300 focus:border-blue-400 focus:border-2' disabled={kunciSupplier} onChange={e=>handleChange(e, 'insert')}>
                                                        <option>--SELECT--</option>
                                                        {
                                                            listSupplier?.map(data=>(
                                                                <option key={data.idSupplier} value={data.idSupplier}>{data.nmSupplier}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </div>
                                            )
                                        }
                                    }
                                }
                            })
                        }
                    </div>
                    <button className='w-full bg-emerald-300 rounded-lg shadow-sm shadow-gray-400 py-1' onClick={handleClickKunciSupplier} disabled={kunciSupplier}>Kunci</button>
                </div>
                <div className='flex-1 w-full relative'>
                    <p>Barang</p>
                    <div className='flex items-center w-full'>
                        <input type='text' name='namaBarang' value={keyword || ''} className='px-2 w-full border rounded-sm border-gray-300 h-8 duration-150 outline-none hover:border-blue-300 focus:border-blue-400 focus:border-2' disabled={!kunciSupplier} onChange={e=>handleChangeKeyword(e)} />
                    </div>
                    {initialData?.data?.length > 0 &&
                    <>
                    <div className='fixed w-full h-full top-0 left-0 z-10 bg-black bg-opacity-30'></div>
                    <div className='bg-slate-600 shadow-md absolute z-20 w-full left-0'>
                        <div className='flex items-center justify-between py-1 font-bold px-3 w-full text-white'>
                            <p>List barang</p>
                            <button onClick={handleClickEmptyKeyword}><RxCross1 /></button>
                        </div>
                        <div className='absolute w-full h-fit max-h-60 overflow-auto border-2 border-slate-600'>
                        {
                            initialData?.data?.map((init, index)=>(
                                <div key={init.idBarang} className={`flex w-full gap-2 items-center justify-center py-1 px-3 hover:bg-gray-400 ${index%2===0 ? 'bg-blue-200' : 'bg-blue-300'}`}>
                                    {/* <p className='flex-1'>{init.idBarang}</p> */}
                                    <p className='flex-1'>{init.namaBarang}</p>
                                    {/* <p className='flex-1'>{init.stok} {init.namaSatuan}</p> */}
                                    <p className='flex-1'>{init.nmKategori}</p>
                                    <button type='button' className='px-2 py-1 bg-green-400 rounded-lg shadow-md hover:bg-green-500 active:bg-green-600' onClick={()=>handleClickAddNewBarang(init.idBarang, init.namaBarang)}>Add</button>
                                </div>
                            ))
                        }
                        </div>
                    </div>
                    </> 
                    }
                </div>
            </div>
    </div>
    </>
  )
}

export default TransaksiAddItem