import React from 'react'
import { RxCross1 } from 'react-icons/rx'

const TransaksiTable = ({ page, field, insertValue, handleClickRemoveFromInsertValue }) => {
  const newFieldforMobile = field.filter(data=>data.mobileView)

  const newValues = insertValue.map(data=>{
    const temp = {}
    newFieldforMobile.forEach(field=>{
      if (field.mobileView) {
        temp[field.key] = data[field.key]
      }
    })
    return temp
  })

  return (
    <div className='w-full rounded-lg shadow-md bg-white p-3'>
      <p className='font-semibold text-lg'>{page.toUpperCase().slice(0,1) + page.slice(1)}</p>
      <table className='w-full text-center'>
        <thead>
          <tr className='w-full h-10 bg-slate-700 text-white'>
            {
              newFieldforMobile.map(data=>{
                if (data.mobileView) {
                  return (
                  <th key={data.key}>{data.label}</th>
                  )
                }
              })
            }
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            newValues.map((data, index)=>{
              return (
              <tr key={Object.values(data)[0].toString() + index.toString()} className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'} h-7 hover:bg-blue-400 hover:duration-150 ease-out`}>
                {
                  Object.values(data).map(values=>{
                    return (
                    <td key={values}>{values}</td>
                  )})
                }
                <td className='py-1'>
                  <button 
                    className='w-fit px-2 py-1 rounded-lg bg-red-400' 
                    onClick={()=>handleClickRemoveFromInsertValue(Object.values(data)[0])}>
                    <RxCross1 />
                  </button>
                </td>
              </tr>
            )})
          }
          <tr className='w-full bg-slate-500 text-white font-semibold'>
            <td colSpan={2}>Total Belanja</td>
            <td colSpan={4} className='text-center py-1'>{
              newValues.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue.totalBayar
              }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
            }</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default TransaksiTable