import React from 'react'
import { useKategori } from '../context/kategori'
import { AiOutlineClear } from 'react-icons/ai'
import { FaMagnifyingGlass } from 'react-icons/fa6'

const Search = ({ page, searchValue, handleChangeSearch, searchUtils, handleClickResetSearching }) => {

    const { listKategori } = useKategori()
  return (
    <div className='w-full space-y-5 bg-white rounded-lg shadow-md p-3 border border-slate-300 md:px-5'>
        <div className='font-semibold text-lg flex items-center justify-start gap-2'><FaMagnifyingGlass /> Cari data {page.toLocaleLowerCase()}</div>
        <div className='space-y-3'>
            {
                searchUtils.map((value, index)=>{
                    let inputType
                    if(value.type === "text"){
                        inputType = ( 
                            <input type={value.type} name={value.key} value={searchValue[value.key]} className=' border border-gray-400 w-full rounded-sm outline-none duration-150 px-2 focus:border-blue-400' placeholder={value.label} onChange={(e)=>handleChangeSearch(e)} />
                        )
                    } else {
                        inputType = (
                            <select name={value.key} value={searchValue[value.key]} className='border border-gray-400 w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400' onChange={handleChangeSearch}>
                                <option value="">Cari berdasarkan {value.label} ..</option>
                                { 
                                    value.key === 'idKategori' && listKategori.map(data=>(
                                    <option key={data.idKategori} value={data.idKategori}>{data.nmKategori}</option>
                                    ))
                                }
                            </select>
                        )
                    }
                    return (
                        <div key={index}>
                            { inputType }
                        </div>
                )})
            }
            <button className='py-1 px-2 w-full text-center rounded-md shadow-sm shadow-gray-400 bg-orange-300 hover:bg-orange-400 active:bg-orange-500 flex justify-center items-center gap-2' onClick={handleClickResetSearching}><AiOutlineClear className='w-6 h-6 text-blue-600' />Reset Keyword</button>
        </div>      
    </div>
  )
}

export default Search