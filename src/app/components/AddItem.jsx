import React from 'react'
import { useKategori } from '../context/kategori'
import { useSatuan } from '../context/satuan'

const AddItem = ({ input, inputData, handleChangeInputData, handleSubmit, handleClickReset}) => {

    const kategori = useKategori()
    const { satuan } = useSatuan()

  return (
    <form onSubmit={(e)=>handleSubmit(e)}>
        <div className='w-full flex flex-col gap-2 md:grid md:grid-cols-2 md:gap-2'>
            {input?.map((inp, index)=>{
                let inputElement
                if(inp.type === "text" || inp.type === "number"){
                inputElement =  <input type={inp.type} name={inp.key} value={inputData[inp.key]} className='border border-black w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400 md:w-2/3' onChange={(e)=>handleChangeInputData(e)} />
                } else
                if(inp.type === "select"){
                    if(inp.key === 'idKategori'){
                        inputElement =  
                        <select name={inp.key} onChange={(e)=>handleChangeInputData(e)} value={inputData[inp.key]} className='border border-black w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400 md:w-2/3'>
                            <option>Pilih {inp.label}</option>
                            {
                                kategori?.map(data=>(
                                    <option key={data.idKategori} value={data.idKategori}>{data.nmKategori}</option>
                                ))
                            }
                        </select>
                    } else 
                    if(inp.key === 'idSatuan'){
                        inputElement =  
                        <select name={inp.key} onChange={(e)=>handleChangeInputData(e)} value={inputData[inp.key]} className='border border-black w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400 md:w-2/3'>
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
                <div key={index} className='flex items-center justify-start gap-2 space-y-2'>
                    <div className='w-32'>
                        <p>{inp.label}</p>
                    </div>
                    { inputElement }
                </div>
                )
            })}
        </div>
        <div className='w-full space-y-2 mt-5 md:flex md:space-y-0 md:justify-between md:gap-10'>
            <button type='submit' className='w-full rounded-md shadow-md bg-green-400 py-2 hover:bg-green-500 active:bg-green-600'> Simpan </button>
            <button type='button' className='w-full rounded-md shadow-md bg-red-400 py-2 hover:bg-red-500 active:bg-red-600' onClick={handleClickReset}> Bersihkan </button>
        </div>
    </form>
  )
}

export default AddItem