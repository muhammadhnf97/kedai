import React from 'react'

const StickyNote = ({ title, nominal, bg}) => {
  
  return (
    <div className={`flex w-72 h-36  shadow-md mx-auto md:h-32 md:w-full rounded-lg shadow-gray-300 overflow-hidden ${bg}`}>
      <div className={`w-1/12 bg-slate-600`}></div>
      <div className="flex-1 text-center p-5 flex flex-col justify-center">
        <p className="text-xl">{title}</p>
        <p className="font-semibold text-slate-700 text-3xl">{nominal?.toLocaleString("id-ID", { style: "currency", currency: "IDR"})}</p>
      </div>
    </div>
  )
}

export default StickyNote