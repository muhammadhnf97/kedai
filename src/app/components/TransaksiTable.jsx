import React from 'react'
import { RxCross1 } from 'react-icons/rx'

const TransaksiTable = ({ page, field, insertValue, handleClickRemoveFromInsertValue }) => {
  const newField = field.filter(data=>data.showOn.includes('view'))
  let totalRow = 0

  const newValues = insertValue.map(data=>{
    const temp = {}
    totalRow = totalRow+1
    newField.forEach(field=>{
        temp[field.key] = data[field.key]
    })
    return temp
  })

  return (
    <div className='w-full rounded-lg shadow-md bg-white p-3'>
      <p className='font-semibold text-lg'>{page.toUpperCase().slice(0,1) + page.slice(1)}</p>
      <table className='w-full text-center text-sm'>
        <thead>
          <tr className='w-full h-10 bg-slate-700 text-white'>
            {
              newField.map(data=>{
                  return (
                  <th key={data.key} className='px-1'>{data.label}</th>
                  )
              })
            }
            { page !== 'hutang' && <th>Action</th>}
          </tr>
        </thead>
        <tbody>
          {
            newValues.map((data, index)=>{
              return (
              <tr 
                key={index} 
                className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-green-200'} h-7 hover:bg-blue-400 hover:duration-150 ease-out`}
              >
                {
                  Object.values(data).map(values=>{
                    return (
                    <td key={values} className='px-1'>{values}</td>
                  )})
                }
                { page !== 'hutang' && <td className='py-1'>
                  <button 
                    className='w-fit px-2 py-1 rounded-lg bg-red-400' 
                    onClick={()=>handleClickRemoveFromInsertValue(Object.values(data)[0])}>
                    <RxCross1 />
                  </button>
                </td>}
              </tr>
            )})
          }
        </tbody>
      </table>
      <div className='flex w-full bg-slate-500 text-white font-semibold text-center'>
        <div className='flex-1 py-1 text-lg'>Total Belanja</div>
        <div className='flex-1 py-1 text-lg'>{
          newValues.reduce((accumulator, currentValue)=>{
            return accumulator + currentValue.totalBayar || currentValue.totalHarga
          }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })
        }</div>
      </div>
    </div>
  )
}

export default TransaksiTable