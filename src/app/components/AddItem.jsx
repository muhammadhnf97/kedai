import React from 'react'
import { useKategori } from '../context/kategori'
import { useSatuan } from '../context/satuan'
import { FcPlus } from 'react-icons/fc'
import { FcRefresh } from 'react-icons/fc'

const AddItem = ({ page, input, inputData, handleChangeInputData, handleSubmit, handleClickReset}) => {

    const { listKategori } = useKategori()
    const { satuan } = useSatuan()

  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
        <div className='w-full px-2 md:px-5 space-y-5 bg-white rounded-lg shadow-md p-3 border border-black'>
            <p className='font-semibold text-lg border-b-2 border-emerald-800'>+Tambah data {page.toLocaleLowerCase()} baru</p>
            <div className='w-full flex flex-col gap-2 md:grid md:grid-cols-3 '>
                {input?.map((inp, index)=>{
                    let inputElement
                    if(inp.type === "text" || inp.type === "number"){
                    inputElement =  <input type={inp.type} name={inp.key} value={inputData[inp.key]} className='border border-black w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400' onChange={(e)=>handleChangeInputData(e)} />
                    } else
                    if(inp.type === "select"){
                        if(inp.key === 'idKategori'){
                            inputElement =  
                            <select name={inp.key} onChange={(e)=>handleChangeInputData(e)} value={inputData[inp.key]} className='border border-black w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400'>
                                <option>Pilih {inp.label}</option>
                                {
                                    listKategori?.map(data=>(
                                        <option key={data.idKategori} value={data.idKategori}>{data.nmKategori}</option>
                                    ))
                                }
                            </select>
                        } else 
                        if(inp.key === 'idSatuan'){
                            inputElement =  
                            <select name={inp.key} onChange={(e)=>handleChangeInputData(e)} value={inputData[inp.key]} className='border border-black w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400'>
                                <option>Pilih {inp.label}</option>
                                {
                                    satuan.map(data=>(
                                        <option key={data.idSatuan} value={data.idSatuan}>{data.namaSatuan}</option>
                                    ))
                                }
                            </select>
                        }
                    }
                    return (
                    <div key={index} className=''>
                        <div className='w-32'>
                            <p>{inp.label}</p>
                        </div>
                        { inputElement }
                    </div>
                    )
                })}
            </div>
            <div className='w-full space-y-2 mt-5 md:flex md:space-y-0 md:justify-between md:gap-5'>
                <button type='submit' className='flex items-center justify-center gap-2 w-full rounded-md shadow-md bg-blue-400 py-2 hover:bg-blue-500 active:bg-blue-600'> <FcPlus className="w-6 h-6" /> Simpan </button>
                <button type='button' className='flex items-center justify-center gap-2 w-full rounded-md shadow-md bg-emerald-400 py-2 hover:bg-emerald-600 active:bg-emerald-700 active:text-white' onClick={handleClickReset}> <FcRefresh className="w-7 h-7" /> Bersihkan </button>
            </div>
        </div>
    </form>
  )
}

export default AddItem