'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import { FcUnlock } from 'react-icons/fc'
import { FcLock } from 'react-icons/fc'
import { RxCross1 } from 'react-icons/rx'
import { useLogin } from '../context/login'
import Notification from '../components/Notification'

const page = () => {
  const { loginData } = useLogin()
  const [isLoading, setIsLoading] = useState(true)
  const [listTempBarang, setListTempBarang] = useState([])
  const [konsumen, setKonsumen] = useState('')
  const [allKonsumen, setAllKonsumen] = useState([])
  const [kunciKonsumen, setKunciKonsumen] = useState(false)
  const [keyword, setKeyword] = useState('')
  const [allBarang, setAllBarang] = useState([])
  const [tempBarang, setTempBarang] = useState({})
  const [notif, setNotif] = useState({})

  const handleNotif = (showNotif = false, message = null) => {
    setNotif({
      showNotif, message
    })
  }

  useEffect(()=>{
    const getAllKonsumen = async() => {
      const response = await fetch('/api/konsumen/getall')
      const data = await response.json()

      if (data.status === 200) {
        setAllKonsumen(data.data)
      } else {
        setAllKonsumen([])
      }
      setIsLoading(false)
    }
    getAllKonsumen()
  }, [])

  useEffect(()=>{
    const getBarang = async () => {
      const response = await fetch (`/api/barang/getbyname?keyword=${keyword}`)
      const data = await response.json()

      if (data.status === 200) {
        setAllBarang(data.data)
      } else {
        setAllBarang([])
      }
    }
    
    if (keyword.length > 0) {
      getBarang()
    }

  }, [keyword])

  const handleChange = (e, action) => {
    const { name, value } = e.target
    if (action === 'konsumen') {
      setKonsumen(value)
    } else if (action === 'keyword') {
      setKeyword(value)
    } else {
      if (action === 'detailBarang') {
        setTempBarang(prev=>{
          return {
            ...prev,
            [name]: value
          }
        })
      }
    }
  }

  const handleClick = (action, data = null) => {
    if (action === 'kunciKonsumen') {
      if (Object.keys(konsumen).length < 1) {
        handleNotif(true, "Pilih konsumen terlebih dahulu")
        return
      }
      setKunciKonsumen(true)
    } else if (action === 'selectBarang') {
      setTempBarang(data)
      setAllBarang([])
      setKeyword('')
    } else if (action === 'addBarang') {
      if (tempBarang?.jumlah > tempBarang?.stok) {
        handleNotif(true, "Stok tidak cukup")
        return
      }

      setListTempBarang(prev=>{
        return [
          ...prev, {
          idBarang: tempBarang?.idBarang,
          namaBarang: tempBarang?.namaBarang,
          jumlah: tempBarang?.jumlah,
          hargaJual: tempBarang?.hargaJual,
          total: tempBarang?.hargaJual * tempBarang?.jumlah,
          stok: tempBarang?.stok
        }]
      })
      setTempBarang({})
    } else if (action === 'resetBarang') {
      setTempBarang({})
      setKeyword('')
    } else if (action === 'remove') {
      setListTempBarang(prevData=>{
        return prevData.filter(prev=>prev.idBarang !== data)
      })
    } else if (action === 'batal') {
      setKunciKonsumen(false)
      setTempBarang({})
      setKeyword('')
      setAllBarang([])
      setKonsumen('')
      setListTempBarang([])
    } else if (action === 'lunas') {
      ( async ()=>{
        setIsLoading(true)
        try {
          const response = await fetch('/api/penjualan', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              idPegawai: loginData.idPegawai,
              idKonsumen: konsumen,
              status: 'LUNAS',
              listTempBarang
            })
          })

          const data = await response.json()

          handleNotif(true, data.message)

        } catch (error) {
          handleNotif(true, "Ada kesalahan saat mengirim data")
        } finally {
          setKunciKonsumen(false)
          setTempBarang({})
          setKeyword('')
          setAllBarang([])
          setKonsumen('')
          setListTempBarang([])
          setIsLoading(false)
        }
      })()
    } else if (action === 'kredit') {
      ( async ()=>{
        setIsLoading(true)
        try {
          const response = await fetch('/api/penjualan', {
            method: 'POST',
            headers: {
              'Content-Type':'application/json'
            },
            body: JSON.stringify({
              idPegawai: loginData.idPegawai,
              idKonsumen: konsumen,
              status: 'KREDIT',
              listTempBarang
            })
          })

          const data = await response.json()

          handleNotif(true, data.message)

        } catch (error) {
          handleNotif(true, "Ada kesalahan saat mengirim data")
        } finally {
          setKunciKonsumen(false)
          setTempBarang({})
          setKeyword('')
          setAllBarang([])
          setKonsumen('')
          setListTempBarang([])
          setIsLoading(false)
        }
      })()
    }
  }

  console.log(loginData?.idPegawai, konsumen, listTempBarang)
  
  return (
    <>
    {<Notification
      notif={notif}
      handleNotif={handleNotif} />}
    {isLoading && <Loading />}
    <div className='max-w-7xl mx-auto'>
      <div className='flex gap-2'>
        <section 
          className='w-2/6 bg-white rounded-lg 
            shadow-md shadow-gray-300 border p-3 space-y-2'>
          <h3 className='font-semibold text-lg'>+ Tambah data penjualan</h3>
          <div>
            <p>Konsumen</p>
            <select 
              name='idKonsumen' 
              value={konsumen} 
              className='w-full h-8 border rounded-sm px-2'
              onChange={e=>handleChange(e, 'konsumen')}
              disabled={kunciKonsumen}>
              <option>-- SELECT --</option>
              {
                allKonsumen.map(data=>(
                  <option key={data.idKonsumen} value={data.idKonsumen}>{data.nmKonsumen}</option>
                ))
              }
            </select>
          </div>
          <button 
            className={`w-full py-1 rounded-lg shadow-md shadow-gray-300 
              flex items-center justify-center gap-2 ${kunciKonsumen ? 'bg-gray-300' : 'bg-green-300 hover:bg-green-400'} `}
            disabled={kunciKonsumen}
            onClick={()=>handleClick('kunciKonsumen')}>
                {kunciKonsumen ? <>Terkunci <FcLock /></> : 
                <>Kunci Konsumen <FcUnlock /></> }  
          </button>
          <div>
            <p>Barang</p>
            <input 
              type='text'
              name='keyword'
              value={keyword}
              className='w-full h-8 border rounded-sm outline-none border-blue-300 
                focus:border-blue-400 px-2'
              disabled={!kunciKonsumen}
              onChange={e=>handleChange(e, 'keyword')}
              autoComplete='off' />
          </div>
          { keyword?.length > 0 && allBarang?.length > 0 ? 
          <div className='w-fit max-h-72 border border-slate-600 rounded-md fixed overflow-auto'>
            {allBarang.length > 0 && <table className='w-full px-3 text-center'>
              <thead>
                <tr className='bg-slate-600 text-white'>
                  <th className='px-1 py-1'>ID Barang</th>
                  <th className='px-1 py-1'>Nama</th>
                  <th className='px-1 py-1'>Stok</th>
                  <th className='px-1 py-1'>Satuan</th>
                  <th className='px-1 py-1'>Harga Jual</th>
                </tr>
              </thead>
              <tbody>
                {
                  allBarang?.map((data, index)=>(
                    <tr key={data.idBarang} 
                      className={`${index % 2 === 0 ? 'bg-blue-200' : 'bg-gray-100'} 
                        duration-100 hover:bg-blue-300 cursor-pointer`}
                      onClick={()=>handleClick('selectBarang', data)}>
                      <td className='px-1 py-1'>{data.idBarang}</td>
                      <td className='px-1 py-1'>{data.namaBarang}</td>
                      <td className='px-1 py-1'>{data.stok}</td>
                      <td className='px-1 py-1'>{data.namaSatuan}</td>
                      <td className='px-1 py-1'>{data.hargaJual}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>}
          </div>
          :
          ''
          }
          {
          Object.keys(tempBarang).length > 0 && 
          <div className='border-2 text-center border-slate-600 py-3 px-6 space-y-2 rounded-lg'>
            <div className='text-left p-2 border rounded-lg border-slate-600 bg-blue-200'>
              <div className='flex gap-2'>
                <p className='flex-1'>ID</p>
                <p className='flex-1 font-semibold'>{tempBarang?.idBarang}</p>
              </div>
              <div className='flex gap-2'>
                <p className='flex-1'>Barang</p>
                <p className='flex-1 font-semibold'>{tempBarang?.namaBarang}</p>
              </div>
              <div className='flex gap-2'>
                <p className='flex-1'>Stok tersisa</p>
                <p className='flex-1 font-semibold'>{tempBarang?.stok} {tempBarang?.namaSatuan}</p>
              </div>
            </div>
            <div className=''>
              <p>Jumlah</p>
              <input 
                type='number'
                name='jumlah'
                value={tempBarang?.jumlah || ''}
                className='w-full px-2 h-8 border border-blue-300 focus:border-blue-400 outline-none'
                onChange={e=>handleChange(e, 'detailBarang')} />
            </div>
            <div className=''>
              <p>Harga Jual</p>
              <input 
                type='number'
                name='hargaJual'
                value={tempBarang?.hargaJual || ''}
                className='w-full px-2 h-8 border border-blue-300 focus:border-blue-400 outline-none'
                onChange={e=>handleChange(e, 'detailBarang')} />
            </div>
            <div className='flex gap-2'>
              <button 
                className='w-full py-1 bg-green-300 hover:bg-green-400 rounded-lg shadow-md shadow-gray-300'
                onClick={()=>handleClick('addBarang')}>
                  Add
              </button>
              <button 
                className='w-full py-1 bg-red-300 hover:bg-red-400 rounded-lg shadow-md shadow-gray-300'
                onClick={()=>handleClick('resetBarang')}>
                  Reset
              </button>
            </div>
          </div>}
        </section>
        <section className='w-4/6  bg-white rounded-lg border shadow-gray-300 shadow-lg overflow-hidden flex flex-col justify-between'>
          <div className='w-full max-h-96 overflow-auto'>
            <table className='w-full text-center'>
              <thead className='bg-orange-300'>
                <tr>
                  <th className='py-2'>No. </th>
                  <th className='py-2'>ID Barang</th>
                  <th className='py-2'>Barang</th>
                  <th className='py-2'>Jumlah</th>
                  <th className='py-2'>Harga</th>
                  <th className='py-2'>Total</th>
                  <th className='py-2'>Action</th>
                </tr>
              </thead>
              <tbody>
                {
                  listTempBarang.map((data, index)=>(
                    <tr key={data.idBarang} className={`${index % 2 === 0 ? 'bg-orange-50' : 'bg-orange-100'}`}>
                      <td>{index + 1}</td>
                      <td className='py-1'>{data?.idBarang}</td>
                      <td className='py-1'>{data?.namaBarang}</td>
                      <td className='py-1'>{data?.jumlah}</td>
                      <td className='py-1'>{data?.hargaJual?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})}</td>
                      <td className='py-1'>{data?.total?.toLocaleString('id-ID', { style: 'currency', currency: 'IDR'})}</td>
                      <td className='py-1'>
                        <button 
                          className='bg-red-300 hover:bg-red-400'
                          onClick={()=>handleClick('remove', data.idBarang)}>
                              <RxCross1 />
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
            <div className='w-full flex font-semibold h-10'>
              <div className='flex-1 h-full bg-slate-300 flex items-center justify-center'>Total Belanja</div>
              <div className='flex-1 h-full bg-slate-200 flex items-center justify-center'>{ listTempBarang.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue.total
              }, 0).toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</div>
            </div>
          </div>
          <div className='w-full flex gap-3 p-3'>
            <button 
              className='flex-1 py-1 bg-green-300 hover:bg-green-400 rounded-lg shadow-md shadow-gray-300' 
              onClick={()=>handleClick('lunas')}
              disabled={listTempBarang.length < 1 ? true : false}>Lunas</button>
            <button 
              className='flex-1 py-1 bg-orange-300 hover:bg-orange-400 rounded-lg shadow-md shadow-gray-300' 
              onClick={()=>handleClick('kredit')}
              disabled={listTempBarang.length < 1 ? true : false}>Kredit</button>
            <button 
              className='flex-1 py-1 bg-red-300 hover:bg-red-400 rounded-lg shadow-md shadow-gray-300' 
              onClick={()=>handleClick('batal')}
              disabled={listTempBarang.length < 1 ? true : false}>Batal</button>
          </div>
        </section>
      </div>
    </div>
    </>
  )
}

export default page