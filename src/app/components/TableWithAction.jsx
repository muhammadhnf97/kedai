import React, { useState } from 'react'
import { FaMagnifyingGlass } from 'react-icons/fa6'
import { AiFillEdit } from 'react-icons/ai'
import { FcFullTrash } from 'react-icons/fc'
import { SlOptionsVertical } from 'react-icons/sl'
import { BsDatabaseSlash } from 'react-icons/bs'
import { AiOutlineUserAdd } from 'react-icons/ai'
import { useLogin } from '../context/login'

const TableWithAction = ({ page, field, initialData, totalRow, currentPage, handleClickCurrentPage, showPaggination, handleClickAction }) => {

    const { loginData, handleClickSaveLoginData } = useLogin()
    const [detailItem, setDetailItem] = useState({})
    const [isShowDetail, setIsShowDetai] = useState(false)

    //MEMBUAT INDEX PENOMORAN
    const itemsPerRow = 10
    const totalPage = Math.ceil(totalRow / itemsPerRow)
    const startIndex = (currentPage - 1) * itemsPerRow

    const handleClickDetail = (item = null) => {
        if(item){
            setDetailItem(item)
        } else {
            setDetailItem({})
        }
        setIsShowDetai(prev=>!prev)
    }

  return (
    <>
    {/* SHOW DETAIL WHILE IN MOBILE */}
    { isShowDetail && 
        <div className='fixed bg-black w-full h-full top-0 left-0 bg-opacity-80 flex items-center justify-center p-5' onClick={()=>handleClickDetail()}>
            <div className='bg-white w-full h-fit p-3 rounded-lg space-y-5'>
                <h3 className='text-center text-xl font-semibold'>Detail {page}</h3>
                <div className='flex mt-5'>
                    <div className='flex-1 px-5'>
                        {
                            field.map(val=>(
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
                <div className='flex gap-2'>
                    <button className='flex-1 py-1 border flex flex-col justify-center items-center bg-green-400 hover:bg-green-500 active:bg-green-600 rounded-lg text-sm'><AiFillEdit /><p>Edit</p></button>
                    <button className='flex-1 py-1 border flex flex-col justify-center items-center bg-red-400 hover:bg-red-500 active:bg-red-600 rounded-lg text-sm'><FcFullTrash /><p>Delete</p></button>
                    {page.toLowerCase() === 'pegawai' && loginData.status === 'Administrator'  && <button className='flex-1 py-1 border flex flex-col justify-center items-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg text-sm'><AiOutlineUserAdd /><p>Buat Akun</p></button>}
                </div>
            </div>
        </div> }
        <div className='w-full h-fit bg-white border border-gray-200 p-4 shadow-md rounded-lg overflow-auto space-y-3'>
            <h3 className='text-left font-semibold text-xl'>Data {page}</h3>
            { initialData?.length < 1 ?
                <>
                <BsDatabaseSlash className="w-10 h-10" />
                <p> belum ada</p>
                </>
                :
                // MOBILE VIEW
                <>
                <section className='md:hidden w-full flex flex-col items-center justify-center gap-1'>
                    {initialData?.map((dataList, index)=>(
                        <div key={dataList.key} className='w-full flex border border-blue-400 rounded-lg overflow-hidden'>
                            <div className='flex items-center justify-center w-7 bg-blue-400'>{startIndex + (index + 1)}</div>
                            <div className='flex-1'>
                                {
                                    field?.map((fieldList, index)=>(
                                        <div key={index} className='flex flex-1 bg-blue-200 border-b border-blue-300'>
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
                                    field?.map((fieldData, index)=>(
                                        <th key={index}>{fieldData.label}</th>
                                    ))
                                }
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { 
                                initialData?.map((data, index)=>(
                                    <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'} h-7 hover:bg-blue-400 hover:duration-150 ease-out`}>
                                        <td className='font-semibold'>{startIndex + (index + 1)}. </td>
                                            {
                                                Object.values(data).map((value, index)=>(
                                                    <td key={index} className='text-md'>{value}</td>
                                                ))     
                                            }
                                        <td className='flex items-center justify-center my-1'>
                                            <div className='group w-fit h-fit flex items-center justify-center relative z-0'>
                                                <button className='w-10 h-10 rounded-lg flex items-center justify-center shadow-sm bg-white hover:bg-slate-200'>
                                                    <SlOptionsVertical />
                                                </button>
                                                <div className='-left-24 invisible scale-0 w-fit h-fit p-2 absolute bg-white rounded-lg shadow-md z-10 duration-300 space-y-1 group-hover:scale-100 group-hover:visible'>
                                                    <button className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-green-400 hover:bg-green-500 active:bg-green-600 rounded-lg text-sm' onClick={()=>handleClickAction(Object.values(data)[0], Object.values(data)[1], 'edit' )}><AiFillEdit /><p>Edit</p></button>
                                                    <button className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-red-400 hover:bg-red-500 active:bg-red-600 rounded-lg text-sm' onClick={()=>handleClickAction(Object.values(data)[0], Object.values(data)[1], 'delete' )}><FcFullTrash /><p>Delete</p></button>
                                                    {page.toLowerCase() === 'pegawai' && loginData.status === 'Administrator'  && <button className='w-full flex-1 py-1 border px-2 flex flex-col justify-center items-center bg-yellow-400 hover:bg-yellow-500 active:bg-yellow-600 rounded-lg text-sm' onClick={()=>handleClickAction(Object.values(data)[0], Object.values(data)[1], 'newakun' )}><AiOutlineUserAdd /><p>Buat Akun</p></button>}
                                                    {/* <button 
                                                    className='py-2 w-full shadow-sm shadow-gray-400 bg-white rounded-lg flex justify-center hover:bg-yellow-100 active:bg-yellow-300' 
                                                    onClick={()=>handleClickAction(Object.values(data)[0], Object.values(data)[1], 'edit' )}>
                                                        <AiFillEdit 
                                                        className='text-blue-400 w-5 h-5 animate-wiggle' />
                                                    </button>
                                                    <button 
                                                    className='py-2 w-full shadow-sm shadow-gray-400 bg-white rounded-lg flex justify-center hover:bg-red-200 active:bg-red-300' 
                                                    onClick={()=>handleClickAction(Object.values(data)[0], Object.values(data)[1], 'delete')}>
                                                        <FcFullTrash 
                                                        className='w-5 h-5 group-hover:animate-wiggle' />
                                                    </button> */}
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
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
                {currentPage !== totalPage && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(totalPage)}>Last Page</button>}
            </section>
            }
    </div>
    {/* <div className='hidden md:block w-full bg-white shadow-md'>
        <h3 className=''></h3>
    </div> */}
        </>



        //<>{
            // initialData?.length < 1 ? 
            // <div className='border-2 border-black rounded-2xl overflow-hidden bg-white my-2 h-36 overflow-y-auto flex items-center justify-center md:h-96'>
            //     <p className='font-semibold text-xl'>Data belum ditambahkan</p>
            // </div>
            // :
            // <>
            // <h4 className="font-semibold text-xl">Tabel {page}</h4>
            // <div className='border-2 border-black rounded-2xl overflow-auto bg-white my-2 h-96 relative'>
            //     <section id='desktop' className='hidden md:block'>
            //         <table className='w-full text-center h-full'>
            //             <thead className=''>
            //                 <tr className='w-full h-10'>
            //                 <th>No. </th>
            //                     {
            //                         field?.map((fieldData, index)=>(
            //                             <th key={index}>{fieldData.label}</th>
            //                         ))
            //                     }
            //                     <th>Action</th>
            //                 </tr>
            //             </thead>
            //             <tbody>
            //                 { 
            //                     initialData?.map((data, index)=>(
            //                         <tr key={index} className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'} h-7 hover:bg-blue-400 hover:duration-150 ease-out`}>
            //                             <td className='font-semibold'>{startIndex + (index + 1)}. </td>
            //                                 {
            //                                     Object.values(data).map((value, index)=>(
            //                                         <td key={index} className='text-md'>{value}</td>
            //                                     ))     
            //                                 }
            //                             <td className='flex items-center justify-center gap-1 px-2 py-1'>
            //                                 <button className='py-2 w-full shadow-sm shadow-gray-400 bg-white rounded-lg flex justify-center hover:bg-yellow-100 active:bg-yellow-300' onClick={()=>handleClickAction(Object.values(data)[0], Object.values(data)[1], 'edit' )}>
            //                                     <AiFillEdit className='text-blue-400 w-5 h-5 animate-wiggle' />
            //                                 </button>
            //                                 <button className='py-2 w-full shadow-sm shadow-gray-400 bg-white rounded-lg flex justify-center hover:bg-red-200 active:bg-red-300' onClick={()=>handleClickAction(Object.values(data)[0], Object.values(data)[1], 'delete')}>
            //                                     <FcFullTrash className='w-5 h-5 group-hover:animate-wiggle' />
            //                                 </button>
            //                             </td>
            //                         </tr>
            //                     ))
            //                 }
            //             </tbody>
            //         </table>
            //     </section>
            //     <section id='mobile' className='md:hidden'>
            //         {
            //             initialData?.map((data, index)=>(
            //                 <div key={index} className={`border-b-4 border-white flex items-center justify-center text-sm ${index % 2 === 0 ? 'bg-blue-100' : 'bg-white'}`}>
            //                     <div className='w-10 text-center'>
            //                         <p className='text-center font-semibold'>{startIndex + (index + 1)}</p>
            //                     </div>
            //                     <div className='flex-1 border-l border-black'>
            //                     {
            //                         field.map((fiel, index)=>(
            //                             <div key={index} className='flex gap-5'>
            //                                 <div className='w-32 font-semibold px-2'><p>{fiel.label}</p></div>
            //                                 <div className='flex-1'><p>{data[fiel.key]}</p></div>
            //                             </div>
            //                         )).slice(1,3)
            //                     }</div>
            //                     <button 
            //                         className='p-5 text-white bg-blue-500 duration-150 hover:bg-blue-600 active:bg-blue-700' 
            //                         onClick={()=>handleClickDetail(row[index])}><FaMagnifyingGlass className='w-5 h-5' />
            //                     </button>
            //                 </div>
            //             ))
            //         }
            //     </section>
            // </div>
            // <div className={`w-full h-full bg-black fixed top-0 left-0 bg-opacity-60 px-2 flex items-center justify-center z-20 ${isShowDetail ? 'visible' : 'invisible'}`}  onClick={()=>handleClickDetail()}>
            //     <div className={`w-full bg-white duration-200 p-5 space-y-5 rounded-lg ${isShowDetail ? 'scale-100' : 'scale-0'}`}>
            //         <h3 className='text-lg font-semibold text-center'>Detail {page}</h3>
            //         <div className='flex justify-center'>
            //             <div className='w-fit'>
            //                 {
            //                     field.map(listField=>(
            //                         <div key={listField.key} className='flex border-b-2 border-white'>
            //                             <div className='w-36 bg-blue-200 px-2'>
            //                                 <p>{listField.label}</p>
            //                             </div>
            //                             <div className='flex-1 border-b-2 border-blue-200 px-2'>
            //                                 <p>{detailItem[listField.detail] || detailItem[listField.key]}</p>
            //                             </div>
            //                         </div>
            //                         ))
            //                     }
            //             </div>
            //         </div>
            //         <div className='flex items-center justify-center gap-1 px-2 py-1'>
            //             <button 
            //                 className='py-2 w-full shadow-sm shadow-gray-400 bg-blue-200 rounded-lg flex justify-center hover:bg-blue-300 active:bg-blue-400'  
            //                 onClick={()=>handleClickAction(Object.values(detailItem)[0], Object.values(detailItem)[1], 'edit' )}>
            //                     <AiFillEdit className='text-blue-700 w-5 h-5 animate-wiggle' />
            //             </button>
            //             <button 
            //                 className='py-2 w-full shadow-sm shadow-gray-400 bg-red-200 rounded-lg flex justify-center hover:bg-red-300 active:bg-red-400' 
            //                 onClick={()=>handleClickAction(Object.values(detailItem)[0], Object.values(detailItem)[1], 'delete' )}>
            //                     <FcFullTrash className='w-5 h-5 group-hover:animate-wiggle' />
            //             </button>
            //         </div>
            //     </div>
            // </div>
            // {
            // showPaggination &&
            // <section className='flex justify-center gap-5 py-5'>
            //     {currentPage !== 1 && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(1)}>First Page</button>}
            //     {currentPage - 1 > 0 && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(currentPage - 1)}>{currentPage - 1}</button>}
            //     <button className='px-2 py-1 rounded-md bg-emerald-300 shadow-md hover:bg-emerald-400 active:bg-emerald-500' onClick={()=>handleClickCurrentPage(currentPage)}>{currentPage}</button>
            //     {currentPage + 1 <= totalPage && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(currentPage + 1)}>{currentPage + 1}</button>}
            //     {currentPage !== totalPage && <button className='px-2 py-1 rounded-md bg-blue-400 shadow-md hover:bg-blue-500 active:bg-blue-600' onClick={()=>handleClickCurrentPage(totalPage)}>Last Page</button>}
            // </section>
            // }
            // </>
        // }</>
  )
}

export default TableWithAction