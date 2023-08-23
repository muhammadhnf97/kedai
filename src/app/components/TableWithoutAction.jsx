import React from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { BsDatabaseSlash } from 'react-icons/bs'
import { RxCross1 } from 'react-icons/rx'

const TableWithoutAction = ({ page, isShowDetail, detailItem, handleClickDetail, initialField, initialData, totalRow, currentPage, handleClickCurrentPage, showPaggination }) => {

    //MEMBUAT INDEX PENOMORAN
    const itemsPerRow = 10
    const totalPage = Math.ceil(totalRow / itemsPerRow)
    const startIndex = (currentPage - 1) * itemsPerRow

  return (
    <>
    {/* SHOW DETAIL WHILE IN MOBILE */}
    { isShowDetail && 
        <div className='fixed bg-black w-full h-full top-0 left-0 bg-opacity-80 flex items-center justify-center p-5 z-10'>
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
                <section className='md:hidden w-full flex flex-col items-center justify-center gap-1'>
                    {initialData.map((dataList, index)=>(
                        <div key={dataList.key} className='w-full flex border border-blue-400 rounded-lg overflow-hidden'>
                            <div className='flex items-center justify-center w-7 bg-blue-400'>{startIndex + (index + 1)}</div>
                            <div className='flex-1'>
                                {
                                    initialField.map((fieldList)=>(
                                        <div key={fieldList.key} className='flex flex-1 bg-blue-200 border-b border-blue-300'>
                                            <div className='flex-1 px-5'>
                                                <p>{fieldList.label}</p>
                                            </div>
                                            <div className='flex-1 bg-white px-5'>
                                                <p>{dataList[fieldList.key]}</p>
                                            </div>
                                        </div>
                                    )).slice(0, 2)
                                }
                            </div>
                            <button className='w-10 text-white flex items-center justify-center bg-blue-400 hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickDetail(initialData[index])}><FaMagnifyingGlass /></button>
                        </div>
                    ))}
                </section>
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
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                initialData?.map((data, index)=>{
                                    return (
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'} h-7 hover:bg-blue-400 hover:duration-150 ease-out`}>
                                        <td className='font-semibold'>{startIndex + (index + 1)}. </td>
                                            {
                                                Object.values(data).map((value, index)=>(
                                                    <td key={index} className='text-md'>{value}</td>
                                                ))     
                                            }
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

export default TableWithoutAction