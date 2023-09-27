import React from 'react'
import { useKategori } from '../context/kategori'
import { useSatuan } from '../context/satuan'
import { RxCross1 } from 'react-icons/rx'

const EditForm = ({ page, listField, initalValue, handleClickCloseEditForm, handleSubmitEdit, handleChange, disable}) => {

    const { listKategori } = useKategori()
    const { satuan } = useSatuan()

    const filteredItem = {}
    listField.forEach(value=>{
        if (value.showOn.includes('edit')) {
            filteredItem[value.key] = initalValue[value.key]
        }
    })

    const newField = listField.filter(value=>{
        return value.showOn.includes('edit')
    })
  return (
    <form onSubmit={(e)=>handleSubmitEdit(e, 'edit')}>
        <div className='fixed h-full w-full bg-black bg-opacity-80 top-0 flex items-center justify-center z-30'>
            <div className='w-fit h-fit bg-white rounded-lg shadow-md px-10 space-y-2 py-5'>
                <div className='flex justify-between text-lg'>
                    <p className='font-semibold text-center'>Edit {page}</p>
                    <button disabled={disable} className='p-2 rounded-full border hover:bg-gray-200' onClick={handleClickCloseEditForm}>
                        <RxCross1 className="w-3 h-3" />
                    </button>
                </div>
                <div className='flex flex-col py-2 gap-2'>
                    {
                        newField.map(value=>{
                            let inputType
                            let listOf

                            const defaultValue = filteredItem[value.key] || ''        

                            if(value.type === 'text' || value.type === 'number'){
                                if(value.primaryKey){
                                    inputType = ( <p className='flex-1'> {defaultValue}</p> )
                                } else {
                                    inputType = ( <input type={value.type} name={value.key} value={defaultValue} className='flex-1 border rounded-sm px-2' disabled={disable} onChange={(e)=>handleChange(e, 'edit')} /> )
                                }
                            } else if(value.type === 'select'){
                                if(value.key === 'nmKategori'){
                                    listOf = listKategori.map(kategori => (
                                        <option key={kategori.idKategori} value={kategori.idKategori}>{kategori.nmKategori}</option>
                                    ))
                                } else if(value.key === 'namaSatuan'){
                                    listOf = satuan.map(sat => (
                                        <option key={sat.idSatuan} value={sat.idSatuan}>{sat.namaSatuan}</option>
                                    ))
                                } else if(value.key === 'jabatan'){
                                    listOf = (
                                        <>
                                        <option value='administrator'>Administrator</option>
                                        <option value='pimpinan'>Pimpinan</option>
                                        <option value='pegawai'>Pegawai</option>
                                        </>
                                    )
                                } 
                                
                                inputType = ( 
                                <select name={value.key} value={defaultValue}  className='flex-1 border rounded-sm' disabled={disable} onChange={(e)=>handleChange(e, 'edit')}>
                                    <option value={defaultValue}>{defaultValue}</option>
                                    { listOf }
                                </select> )
                            }
                            return (
                            <div key={value.key} className='flex gap-2 justify-center '>
                                <p className='w-24'>{value.label}</p>
                                { inputType }
                            </div>
                        )})
                    }
                    <button className='w-full py-2 duration-150 bg-blue-400 hover:bg-blue-500 active:bg-blue-600'>Update</button>
                </div>
            </div>
        </div>
    </form>
  )
}

export default EditForm