import React from 'react'

const StickyNote = ({ action, nominal, baseColor}) => {
  let newBaseColor
  let secondColor
  
  if(baseColor%2==0){
    newBaseColor = 'bg-green-100'
    secondColor = 'bg-green-400'
  } else {
    newBaseColor = 'bg-red-100'
    secondColor = 'bg-red-400'
  }

  return (
    <div className={`flex w-72 ${newBaseColor} shadow-md`}>
      <div className={`w-1/12 ${secondColor}`}></div>
      <div className="flex-1 text-center p-3">
        <p className="text-lg">{action} Januari</p>
        <p className="font-bold text-2xl">{nominal.toLocaleString("id-ID", { style: "currency", currency: "IDR"})}</p>
      </div>
    </div>
  )
}

export default StickyNote