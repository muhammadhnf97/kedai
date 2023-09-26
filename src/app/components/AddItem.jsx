import React from 'react'
import { useKategori } from '../context/kategori'
import { useSatuan } from '../context/satuan'
import { FcPlus } from 'react-icons/fc'
import { AiOutlineClear } from 'react-icons/ai'

const AddItem = ({ page, field, inputData, handleChange, handleSubmitInsert, handleClickReset, disable}) => {

    const { listKategori } = useKategori()
    const { satuan } = useSatuan()
  return (
    <form onSubmit={(e)=>handleSubmitInsert(e, 'add')}>
        <div className='w-full p-2 space-y-5 bg-white rounded-lg shadow-md border border-slate-300 md:px-5'>
            <p className='font-semibold text-lg'>+ Tambah data {page.toLocaleLowerCase()} baru</p>
            <div className='w-full grid grid-cols-1 gap-2 border-green-600 md:grid-cols-2'>
                {
                    field?.map(values=>{
                        let inputElement
                        if (values.showOn.includes('add') && values.manualInput === true) {
                            if (values.type === 'text' || values.type === 'number' || values.type === 'currency') {
                                inputElement = <input autoComplete='off' type={values.type} name={values.key} value={inputData[values.key]} className='h-8 w-full border border-gray-300 outline-none px-1 duration-150 hover:border-blue-500 focus:border-blue-600 rounded-sm md:flex-1' disabled={disable} onChange={(e)=>handleChange(e, 'add')}  />
                            } else if (values.type === 'select') {
                                let options
                                if (values.label.toLowerCase() === 'kategori') {
                                    options = listKategori.map(data=>(
                                        <option key={data.idKategori} value={data.idKategori}>{data.nmKategori}</option>
                                    ))
                                } else if (values.label.toLowerCase() === 'satuan') {
                                    options = satuan.map(data=>(
                                        <option key={data.idSatuan} value={data.idSatuan}>{data.namaSatuan}</option>
                                    ))
                                }
                                inputElement = 
                                <select name={values.key} value={inputData[values.key]} className='h-8 w-full border border-gray-300 outline-none px-1 duration-150 hover:border-blue-500 focus:border-blue-600 md:flex-1' disabled={disable} onChange={(e)=>handleChange(e, 'add')}>
                                    <option>-- select --</option>
                                    {options}
                                </select>

                            }
                            return (
                                <div key={values.key} className='flex flex-col w-full md:flex-row'>
                                    <div className='w-full md:flex-1'><p>{values.label}</p></div>
                                    {inputElement}
                                </div>
                            )
                        }
                    })
                }
            </div>
            <div className='w-full space-y-2 mt-5 md:flex md:space-y-0 md:justify-between md:gap-5'>
                <button type='submit' disabled={disable} className='flex items-center justify-center gap-2 w-full rounded-md shadow-sm shadow-gray-400  bg-blue-400 py-2 hover:bg-blue-500 active:bg-blue-600'> <FcPlus className="w-6 h-6" /> Simpan </button>
                <button type='button' disabled={disable} className='flex items-center justify-center gap-2 w-full rounded-md shadow-sm shadow-gray-400  bg-emerald-400 py-2 hover:bg-emerald-600 active:bg-emerald-700 active:text-white' onClick={handleClickReset}> 
                <AiOutlineClear className="w-7 h-7 text-blue-700" /> Bersihkan </button>
            </div>
        </div>
    </form>
  )
}

export default AddItem