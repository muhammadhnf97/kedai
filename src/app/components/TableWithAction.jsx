import React, { useState, useEffect } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { AiFillEdit } from 'react-icons/ai'
import { FcFullTrash } from 'react-icons/fc'
import { SlOptionsVertical } from 'react-icons/sl'
import { BsDatabaseSlash } from 'react-icons/bs'
import { BiUserPlus } from 'react-icons/bi'
import { BiUserMinus } from 'react-icons/bi'
import { RxCross1 } from 'react-icons/rx'
import { useLogin } from '../context/login'
import { useUser } from '../context/user'

const TableWithAction = ({ page, isShowDetail, detailItem, handleClickDetail, initialField, initialData, totalRow, currentPage, handleClickCurrentPage, showPaggination, handleClickActionFromTable }) => {

    let alreadyUser

    if(page.toLowerCase() === 'pegawai'){
        const user = useUser()
        alreadyUser = user.userCreated
    }

    //MEMBUAT INDEX PENOMORAN
    const itemsPerRow = 10
    const totalPage = Math.ceil(totalRow / itemsPerRow)
    const startIndex = (currentPage - 1) * itemsPerRow

  return (
    <>
    {/* SHOW DETAIL WHILE IN MOBILE */}
    { isShowDetail && 
        <div className='fixed bg-black w-full h-full top-0 left-0 bg-opacity-80 flex items-center justify-center p-5'>
            <div className='bg-white w-full h-fit p-3 rounded-lg space-y-5'>
                <div className='flex items-center justify-between'>
                    <h3 className='text-center text-xl font-semibold'>Detail {page}</h3>
                    <button className='p-2 rounded-full border hover:bg-gray-200' onClick={()=>handleClickDetail()}>
                        <RxCross1 className="w-3 h-3" />
                    </button>
                </div>
                <div className='flex mt-5'>
                    <div className='flex-1 px-5'>
                        {
                            initialField.map(val=>(
                                <div key={val.key} className='flex'>
                                    <div className='flex-1'>
                                        <p>{val.label}</p>
                                    </div>
                                    <div className='flex-1'>
                                        <p>: {detailItem[val.key]}</p>                                
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                {   
                    alreadyUser?.map(values=>{
                        let accountActiveButton
                        if(values !== Object.values(detailItem)[0]){
                            accountActiveButton = (
                                <button 
                                className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg text-sm' 
                                onClick={()=>handleClickActionFromTable(Object.values(detailItem)[0], Object.values(detailItem)[1], 'aktifakun' )}>
                                    <BiUserPlus className='w-4 h-4' />
                                    <p>Aktifkan Akun</p>
                                </button>
                            )
                        } else {
                            accountActiveButton = (
                                <button 
                                className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-slate-400 hover:bg-slate-500 active:bg-slate-600 rounded-lg text-sm' 
                                onClick={()=>handleClickActionFromTable(Object.values(detailItem)[0], Object.values(detailItem)[1], 'nonaktifakun' )}>
                                    <BiUserMinus className='w-4 h-4' />
                                    <p>Nonaktifkan Akun</p>
                                </button>
                            )
                        }
                        return (
                            <div key={values.key} className='flex gap-2'>
                                <button 
                                className='flex-1 py-1 border flex flex-col justify-center items-center bg-green-400 hover:bg-green-500 active:bg-green-600 rounded-lg text-sm'
                                onClick={()=>handleClickActionFromTable(Object.values(detailItem)[0], Object.values(detailItem)[1], 'edit' )}>
                                    <AiFillEdit className="w-4 h-4" />
                                    <p>Edit</p>
                                </button>
                                <button 
                                className='flex-1 py-1 border flex flex-col justify-center items-center bg-red-400 hover:bg-red-500 active:bg-red-600 rounded-lg text-sm'
                                onClick={()=>handleClickActionFromTable(Object.values(detailItem)[0], Object.values(detailItem)[1], 'delete' )}>
                                    <FcFullTrash className="w-4 h-4" />
                                    <p>Delete</p>
                                </button>
                                { accountActiveButton }
                            </div>
                        )
                    })
                }
            </div>
        </div> }
        <div className='w-full h-fit bg-white border border-slate-300 p-4 shadow-md rounded-lg overflow-auto space-y-3 '>
            <h3 className='text-left font-semibold text-xl'>Data {page}</h3>
            { initialData?.length < 1 ?
                <div className='w-full flex flex-col items-center justify-center'>
                <BsDatabaseSlash className="w-10 h-10" />
                <p> belum ada</p>
                </div>
                :
                // MOBILE VIEW
                <>
                {/* <section className='md:hidden w-full flex flex-col items-center justify-center gap-1'>
                    {initialData.map((dataList, index)=>(
                        <div key={dataList.key} className='w-full flex border border-blue-400 rounded-lg overflow-hidden'>
                            <div className='flex items-center justify-center w-7 bg-blue-400'>{startIndex + (index + 1)}</div>
                            <div className='flex-1'>
                                {
                                    initialField.map((fieldList, childIndex)=>{
                                        return (
                                        <div key={index.toString()+childIndex.toString()} className='flex flex-1 bg-blue-200 border-b border-blue-300'>
                                            <div className='flex-1 px-5'>
                                                <p>{fieldList.label} {index.toString()+childIndex.toString()}</p>
                                            </div>
                                            <div className='flex-1 bg-white px-5'>
                                                <p>{dataList[fieldList.key]}</p>
                                            </div>
                                        </div>
                                    )}).slice(0, 2)
                                }
                            </div>
                            <button className='w-10 text-white flex items-center justify-center bg-blue-400 hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickDetail(initialData[index])}><FaMagnifyingGlass /></button>
                        </div>
                    ))}
                </section> */}
                {/* DESKTOP VIEW */}
                <section className='hidden md:block'>
                    <table className='w-full text-center h-full'>
                        <thead>
                            <tr className='w-full h-10 bg-slate-700 text-white'>
                                <th>No. </th>
                                {
                                    initialField?.map((fieldData)=>(
                                        <th key={fieldData.key}>{fieldData.label}</th>
                                    ))
                                }
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                initialData?.map((data, index)=>{
                                    let accountActiveButton
                                    if(page.toLowerCase() === 'pegawai'){
                                        if(alreadyUser.length < 1){
                                            accountActiveButton = (
                                                <button className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg text-sm' onClick={()=>handleClickActionFromTable(Object.values(data)[0], Object.values(data)[1], 'aktifakun' )}><BiUserPlus className='w-4 h-4' /><p>Aktifkan Akun</p></button>
                                            )
                                        }
                                            if(alreadyUser.some(init=>init.idPegawai === data.idPegawai && init.status === 'active')){
                                                accountActiveButton = (
                                                    <button className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-slate-400 hover:bg-slate-500 active:bg-slate-600 rounded-lg text-sm' onClick={()=>handleClickActionFromTable(Object.values(data)[0], Object.values(data)[1], 'nonaktifakun' )}><BiUserMinus className='w-4 h-4' /><p>Nonaktifkan Akun</p></button>
                                                )
                                            } else {
                                                accountActiveButton = (
                                                    <button className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg text-sm' onClick={()=>handleClickActionFromTable(Object.values(data)[0], Object.values(data)[1], 'aktifakun' )}><BiUserPlus className='w-4 h-4' /><p>Aktifkan Akun</p></button>
                                                )
                                            }
                                        
                                    }
                                    return (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'} h-7 hover:bg-blue-400 hover:duration-150 ease-out`}>
                                        <td className='font-semibold'>{startIndex + (index + 1)}. </td>
                                            {
                                                Object.values(data).map((value, index)=>(
                                                    <td key={index} className='text-md'>{value}</td>
                                                ))     
                                            }
                                        <td className='flex items-center justify-center my-1'>
                                            <div className='group w-fit h-fit flex items-center justify-center relative'>
                                                <button className='w-10 h-10 rounded-lg flex items-center justify-center shadow-sm bg-white hover:bg-slate-200'>
                                                    <SlOptionsVertical />
                                                </button>
                                                <div className={` ${page === 'Pegawai' ? '-left-[8rem]' : '-left-[5rem]'} origin-right invisible scale-0 w-fit h-fit p-2 absolute bg-white rounded-lg shadow-md z-10 duration-300 space-y-1 group-hover:scale-100 group-hover:visible`}>
                                                    <button className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-green-400 hover:bg-green-500 active:bg-green-600 rounded-lg text-sm' onClick={()=>handleClickActionFromTable(Object.values(data)[0], Object.values(data)[1], 'edit' )}><AiFillEdit className="w-4 h-4" /><p>Edit</p></button>
                                                    <button className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-red-400 hover:bg-red-500 active:bg-red-600 rounded-lg text-sm' onClick={()=>handleClickActionFromTable(Object.values(data)[0], Object.values(data)[1], 'delete' )}><FcFullTrash className="w-4 h-4" /><p>Delete</p></button>
                                                    {accountActiveButton}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                )})
                            }
                        </tbody>
                    </table>
                </section>
                </>
            }
            {
            showPaggination && 
            <section className='flex justify-center gap-5 pt-2'>
                {currentPage !== 1 && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(1)}>First Page</button>}
                {currentPage - 1 > 0 && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(currentPage - 1)}>{currentPage - 1}</button>}
                <button className='px-2 py-1 rounded-md bg-emerald-300 shadow-md hover:bg-emerald-400 active:bg-emerald-500' onClick={()=>handleClickCurrentPage(currentPage)}>{currentPage}</button>
                {currentPage + 1 <= totalPage && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(currentPage + 1)}>{currentPage + 1}</button>}
                {currentPage !== totalPage && totalPage > 0 && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(totalPage)}>Last Page</button>}
            </section>
            }
        </div>
    </>
  )
}

export default TableWithAction