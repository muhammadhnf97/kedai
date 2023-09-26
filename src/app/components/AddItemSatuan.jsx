import React from 'react'

const AddItemSatuan = ({ insertData, field, handleChange, turunan, handleClickTurunan, handleSubmit, handleReset }) => {
    console.log(turunan)
  return (
    <div className='w-full'>
        <div className='bg-white rounded-lg shadow-md shadow-gray-300 border border-gray-300 p-3'>
            <h3 className='font-semibold text-lg'>+ Tambah Satuan</h3>
            <div className='w-full space-y-2'>
                {
                    field?.map(allField=>{
                        const defaultValue = insertData ? insertData[allField.key] : ''
                        if (allField.showOn.includes('add') && allField.manualInput ) {
                            if (turunan || allField.key !== 'turunan') {
                                return (
                                 <div key={allField.key} className='flex items-center justify-center'>
                                     <div className='flex-1'>
                                         <p>{allField.label}</p>
                                     </div>
                                         <div className='flex-1'>
                                         <input 
                                            type={allField.type} 
                                            name={allField.key} 
                                            value={defaultValue} 
                                            className='px-1 w-full h-8 border 
                                                border-gray-300 outline-none 
                                                hover:border-blue-300 focus:border-blue-400' 
                                            onChange={e=>handleChange(e, 'add')} 
                                        />
                                     </div>
                                 </div>
                                ) 
                            } 
                        }
                    })
                }
                <div className='w-full text-center'>
                <button className={`w-fit px-4 rounded-full text-center shadow-sm ${turunan ? 'bg-amber-300 hover:bg-amber-300' : 'bg-violet-300 hover:bg-violet-400'}`} onClick={handleClickTurunan}> { turunan ? 'Batal Turunan' : '+ Tambah turunan'}</button>
                </div>
                <div className='flex gap-3'>
                    <button className='flex-1 py-1 w-full shadow-md rounded-lg bg-green-300 hover:bg-green-400' onClick={e=>handleSubmit(e, 'add')}>Simpan</button>
                    <button className='flex-1 py-1 w-full shadow-md rounded-lg bg-red-300 hover:bg-red-400' onClick={handleReset}>Reset</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddItemSatuan