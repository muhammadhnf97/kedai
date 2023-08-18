import React from 'react'
import { useKategori } from '../context/kategori'
import { useSatuan } from '../context/satuan'
import { FcPlus } from 'react-icons/fc'
import { AiOutlineClear } from 'react-icons/ai'

const AddItem = ({ page, field, inputData, handleChangeInsertData, handleSubmitInsert, handleClickReset}) => {

    const { listKategori } = useKategori()
    const { satuan } = useSatuan()
    
  return (
    <form onSubmit={(e)=>handleSubmitInsert(e)}>
        <div className='w-full p-2 space-y-5 bg-white rounded-lg shadow-md border-2 border-black md:px-5'>
            <p className='font-semibold text-lg'>+ Tambah data {page.toLocaleLowerCase()} baru</p>
            <div className='w-full flex flex-wrap'>
                {
                    field?.map(inp=>{
                        let inputElement
                        if(inp.type === 'text' || inp.type === 'number'){
                            inputElement = <input type={inp.type} name={inp.key} value={inputData[inp.key]} className='border w-full md:w-[13rem] px-2 outline-none hover:border-blue-300 focus:border-blue-400' onChange={(e)=>handleChangeInsertData(e)}  />
                        } else if(inp.type === 'select'){
                            if(inp.key === 'idKategori'){
                                inputElement = <select name={inp.key} value={inputData[inp.key]} className='border w-full md:w-[13rem] px-2 outline-none hover:border-blue-300 focus:border-blue-400' onChange={(e)=>handleChangeInsertData(e)}>
                                    <option>Pilih {inp.label}</option>
                                    {
                                        listKategori?.map(data=>(
                                            <option key={data.idKategori} value={data.idKategori}>{data.nmKategori}</option>
                                        ))
                                    }
                                </select>
                            } else if(inp.key === 'idSatuan'){
                                inputElement =  
                                <select name={inp.key} onChange={(e)=>handleChangeInsertData(e)} value={inputData[inp.key]} className='border w-full md:w-[13rem]'>
                                    <option>Pilih {inp.label}</option>
                                    {
                                        satuan.map(data=>(
                                            <option key={data.idSatuan} value={data.idSatuan}>{data.namaSatuan}</option>
                                        ))
                                    }
                                </select>
                            } else if(inp.key === 'jabatan'){
                                inputElement =
                                <select name={inp.key} onChange={(e)=>handleChangeInsertData(e)} value={inputData[inp.key]} className='border w-full md:w-[13rem]'>
                                    <option>Pilih {inp.label}</option>
                                    <option value={'pimpinan'}>Pimpinan</option>
                                    <option value={'pegawai'}>Pegawai</option>
                                </select>

                            }
                        }
                        return (
                        <div key={inp.key} className='md:flex-1 w-full md:w-fit'>
                            <p>{inp.label}</p>
                            {inputElement}
                        </div>
                    )}).slice(1)
                }

            </div>
            {/* <div className='w-full flex flex-col gap-3 md:flex md:flex-warp '>
                {input?.map((inp, index)=>{
                    let inputElement
                    if(inp.type === "text" || inp.type === "number"){
                    inputElement =  <input type={inp.type} name={inp.key} value={inputData[inp.key]} className='border border-gray-400 w-40 rounded-sm outline-none duration-150 px-1 focus:border-blue-400' onChange={(e)=>handleChangeInsertData(e)} />
                    } else
                    if(inp.type === "select"){
                        if(inp.key === 'idKategori'){
                            inputElement =  
                            <select name={inp.key} onChange={(e)=>handleChangeInsertData(e)} value={inputData[inp.key]} className='border border-gray-400 w-40 rounded-sm outline-none duration-150 px-1 focus:border-blue-400'>
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
                            <select name={inp.key} onChange={(e)=>handleChangeInsertData(e)} value={inputData[inp.key]} className='border border-gray-400 w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400'>
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
                    <div key={index} className='w-fit border'>
                        <div className=''>
                            <p>{inp.label}</p>
                        </div>
                        { inputElement }
                    </div>
                    )
                }).slice(1)}
            </div> */}
            <div className='w-full space-y-2 mt-5 md:flex md:space-y-0 md:justify-between md:gap-5'>
                <button type='submit' className='flex items-center justify-center gap-2 w-full rounded-md shadow-sm shadow-gray-400  bg-blue-400 py-2 hover:bg-blue-500 active:bg-blue-600'> <FcPlus className="w-6 h-6" /> Simpan </button>
                <button type='button' className='flex items-center justify-center gap-2 w-full rounded-md shadow-sm shadow-gray-400  bg-emerald-400 py-2 hover:bg-emerald-600 active:bg-emerald-700 active:text-white' onClick={handleClickReset}> 
                <AiOutlineClear className="w-7 h-7 text-blue-700" /> Bersihkan </button>
            </div>
        </div>
    </form>
  )
}

export default AddItem