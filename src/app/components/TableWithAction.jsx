import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { FcSynchronize } from 'react-icons/fc'
import { FcFullTrash } from 'react-icons/fc'

const TableWithAction = ({ field, row, totalRow, currentPage, handleClickCurrentPage }) => {
    const [detailItem, setDetailItem] = useState({})
    const [isShowDetail, setIsShowDetai] = useState(false)

    //MEMBUAT INDEX PENOMORAN
    const itemsPerRow = 10
    const totalPage = Math.ceil(totalRow / itemsPerRow)
    const startIndex = (currentPage - 1) * itemsPerRow

    const handleClickDetail = (id) => {
        setDetailItem(id)
        setIsShowDetai(prev=>!prev)
    }

    const handleClickShowDetail = () => {
        setIsShowDetai(prev=>!prev)
    }
    
    const handleClickUpdate = () => {
        const getID = Object.values(detailItem)[0]
        console.log(getID)
    }

    
  return (
    <>
        {
            row?.length < 1 ? 
            <div className='border-2 border-black rounded-2xl overflow-hidden bg-white my-2 h-36 overflow-y-auto relative flex items-center justify-center md:h-96'>
                <p className='font-semibold text-xl'>Data belum ditambahkan</p>
            </div>
            :
            <>
            <div className='border-2 border-black rounded-2xl overflow-auto bg-white my-2 h-96 relative'>
                <section id='desktop' className='hidden md:block'>
                    <table className='w-full text-center h-full'>
                        <thead className=''>
                            <tr className='w-full h-10'>
                                {
                                    field?.map((fieldData, index)=>(
                                        <th key={index}>{fieldData.label}</th>
                                    ))
                                }
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                row?.map((data, index)=>(
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'} h-7 hover:bg-blue-400 hover:duration-150 ease-out`}>
                                        <td className='font-semibold'>{startIndex + (index + 1)}. </td>
                                            {
                                                Object.values(data).map((value, index)=>(
                                                    <td key={index} className='text-md'>{value}</td>
                                                ))     
                                            }
                                        <td className='flex items-center justify-center gap-1 px-2 py-1'>
                                            <button className='py-2 w-full shadow-sm shadow-gray-600 bg-white rounded-lg flex justify-center hover:bg-yellow-100 active:bg-yellow-300'><FcSynchronize className='w-5 h-5' /></button>
                                            <button className='py-2 w-full shadow-sm shadow-gray-600 bg-white rounded-lg flex justify-center hover:bg-red-200 active:bg-red-300'><FcFullTrash className='w-5 h-5' /></button>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </section>
                <section id='mobile' className='md:hidden'>
                        {
                            row?.map((data, index)=>(
                                <div key={index} className={`border flex items-center justify-center text-sm ${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}`}>
                                    <div className='w-10 text-center'>
                                        <p className='text-center font-semibold'>{startIndex + (index + 1)}</p>
                                    </div>
                                    <div className='flex-1 border-l border-black'>
                                    {
                                        field.map((fiel, index)=>(
                                            <div key={index} className='flex gap-5'>
                                                <div className='w-28 font-semibold px-2'><p>{fiel.label}</p></div>
                                                <div className='flex-1'><p>{data[fiel.key]}</p></div>
                                            </div>
                                        )).slice(1,3)
                                    }</div>
                                    <button className='p-5 text-white bg-blue-500 duration-150 hover:bg-blue-600 active:bg-blue-700' onClick={()=>handleClickDetail(row[index])}><FaMagnifyingGlass className='w-5 h-5' /></button>
                                </div>
                            ))
                        }
                </section>
            </div>
            <div className={`w-full h-full bg-black fixed top-0 left-0 bg-opacity-60 px-2 flex items-center justify-center z-20 ${isShowDetail ? 'visible' : 'invisible'}`} onClick={handleClickShowDetail}>
                <div className={`w-full bg-white duration-200 p-5 space-y-5 rounded-lg ${isShowDetail ? 'scale-100' : 'scale-0'}`}>
                    <h3 className='text-lg font-semibold text-center'>Detail Barang</h3>
                    <div className=''>
                        {
                            field.map((value, index)=>(
                                <div key={index} className='flex gap-5'>
                                    <div className='w-28 font-semibold px-2'><p>{value.label}</p></div>
                                    <div className='flex-1'><p>: { value.key !== 'modalBeli' && value.key !== 'hargaJual' ? detailItem[value.key] : detailItem[value.key]?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})  }</p></div>
                                </div>
                            )).slice(1)
                        }
                        <div className='flex items-center justify-center gap-1 px-2 py-1'>
                            <button className='py-2 w-full shadow-sm shadow-gray-600 bg-yellow-50 rounded-lg flex justify-center hover:bg-yellow-100 active:bg-yellow-300' onClick={()=>handleClickUpdate()}><FcSynchronize className='w-5 h-5' /></button>
                            <button className='py-2 w-full shadow-sm shadow-gray-600 bg-red-50 rounded-lg flex justify-center hover:bg-red-200 active:bg-red-300'onClick={()=>handleClickUpdate()} ><FcFullTrash className='w-5 h-5' /></button>
                        </div>
                    </div>
                </div>
            </div>
            <section className='flex justify-center gap-5 py-5'>
                {currentPage !== 1 && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(1)}>First Page</button>}
                {currentPage - 1 > 0 && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(currentPage - 1)}>{currentPage - 1}</button>}
                <button className='px-2 py-1 rounded-md bg-emerald-300 shadow-md hover:bg-emerald-400 active:bg-emerald-500' onClick={()=>handleClickCurrentPage(currentPage)}>{currentPage}</button>
                {currentPage + 1 <= totalPage && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(currentPage + 1)}>{currentPage + 1}</button>}
                {currentPage !== totalPage && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(totalPage)}>Last Page</button>}
            </section>
            </>
        }
    </>
  )
}

export default TableWithAction