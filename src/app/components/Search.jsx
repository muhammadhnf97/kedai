import React from 'react'
import { useKategori } from '../context/kategori'

const Search = ({ page, searchValue, handleChangeSearch, searchUtils, handleClickResetSearching }) => {

    const { listKategori } = useKategori()
  return (
    <div className='w-full px-2 md:px-5 space-y-5 bg-white rounded-lg shadow-md p-3 border border-black'>
        <p className='font-semibold text-lg border-b-2 border-emerald-800'>Cari data {page.toLocaleLowerCase()}</p>
        <div className='space-y-3'>
            {
                searchUtils.map((value, index)=>{
                    let inputType
                    if(value.type === "text"){
                        inputType = ( 
                            <input type={value.type} name={value.key} value={searchValue[value.key]} className=' border border-black w-full rounded-sm outline-none duration-150 px-2 focus:border-blue-400' placeholder={value.label} onChange={(e)=>handleChangeSearch(e)} />
                        )
                    } else {
                        inputType = (
                            <select name={value.key} value={searchValue[value.key]} className='border border-black w-full rounded-sm outline-none duration-150 px-1 focus:border-blue-400' onChange={handleChangeSearch}>
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
            <button className='py-1 px-2 w-full text-center rounded-md shadow-md bg-orange-300 hover:bg-orange-400 active:bg-orange-500' onClick={handleClickResetSearching}>Reset Keyword</button>
        </div>      
    </div>
  )
}

export default Search