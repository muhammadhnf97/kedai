import React from 'react'

const KonversiTable = ({ data }) => {
  return (
    <div className='w-full flex-1 border-2 border-slate-600 rounded-md p-3 space-y-0.5'>
        <div className='flex'>
            <div className='flex-1 px-2 h-full bg-slate-600 text-white font-semibold'>
                <p className='bg-slate-600'>ID Barang</p>
            </div>
            <div className='flex-1 px-2'>
                <p className='flex-1 text-slate-600'> {data?.idBarang}</p>
            </div>
        </div>
        <div className='flex'>
            <div className='flex-1 px-2 h-full bg-slate-600 text-white font-semibold'>
                <p className='bg-slate-600'>Nama Barang</p>
            </div>
            <div className='flex-1 px-2'>
                <p className='flex-1 text-slate-600'> {data?.namaBarang}</p>
            </div>
        </div>
        <div className='flex'>
            <div className='flex-1 px-2 h-full bg-slate-600 text-white font-semibold'>
                <p className='bg-slate-600'>Stok</p>
            </div>
            <div className='flex-1 px-2'>
                <p className='flex-1 text-slate-600'> {data?.stok}</p>
            </div>
        </div>
        <div className='flex'>
            <div className='flex-1 px-2 h-full bg-slate-600 text-white font-semibold'>
                <p className='bg-slate-600'>Satuan</p>
            </div>
            <div className='flex-1 px-2'>
                <p className='flex-1 text-slate-600'> {data?.namaSatuan}</p>
            </div>
        </div>
        <div className='flex'>
            <div className='flex-1 px-2 h-full bg-slate-600 text-white font-semibold'>
                <p className='bg-slate-600'>Kategori</p>
            </div>
            <div className='flex-1 px-2'>
                <p className='flex-1 text-slate-600'> {data?.nmKategori}</p>
            </div>
        </div>
    </div>
  )
}

export default KonversiTable