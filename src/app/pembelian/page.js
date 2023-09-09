'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import TransaksiAddItem from '../components/TransaksiAddItem'
import { fieldPembelian } from '../utils/tableName'
import TransaksiTable from '../components/TransaksiTable'
import { useLogin } from '../context/login'

const Home = () => {
    const { loginData } = useLogin()
    const page = 'pembelian'
    const [isLoading, setIsLoading] = useState(false)
    const [insertValue, setInsertValue] = useState([])
    const [tempBarang, setTempBarang] = useState({})
    const [kunciSupplier, setKunciSupplier] = useState(false)
    const [sesiPembelian, setSesiPembelian] = useState({})

    console.log(loginData)

    const handleChange = async(e, action, selectBarangFirst) => {
      const {name, value} = e.target
      if (action === 'insert') {
        if (selectBarangFirst) {
          setTempBarang(prevData=>{
            return {
              ...prevData,
              [name]: value 
            }
          })
        } else {
          setSesiPembelian(prevData=>{
            return {
              ...prevData,
              [name]: value 
            }})
        };
      }
    };

    const handleReset = (action) => {
      if (action === 'insert') {
        setInsertValue([])
        setSesiPembelian({})
        setKunciSupplier(false)
      }
    }

    const handleSubmit = async() => {
      console.log('data telah disimpan')
      console.log(insertValue)
    }

    const handleClickAddNewBarang = (id, nama) => {
      setTempBarang(prevData=>{
        return {
          ...prevData,
            idBarang: id,
            namaBarang: nama
        }
      })
    }

    const handleClickKunciSupplier = () => {
      setKunciSupplier(prev=>!prev)
    }

    const handleClickAddToInsertValue = () => {
      const { idSupplier, noFaktur } = sesiPembelian
      const { idBarang, namaBarang, jumlahBeli, hargaBeli } = tempBarang
      const totalBayar = jumlahBeli * hargaBeli

      try {
        setInsertValue(prev=>{
          return [
            ...prev,
            {
              idSupplier, noFaktur, idBarang, namaBarang, jumlahBeli, hargaBeli, totalBayar
            }
          ]
        })
      } catch (error) {
        console.error('Ada kesalahan : ', error)
      } finally {
        setTempBarang({})
      }
    }

    const handleClickBatal = (option) => {
      if (option === 'barang') {
        setTempBarang({})
      }
    }

    const handleClickRemoveFromInsertValue = (id) => {
      setInsertValue(prev=>{
        console.log(prev)
        return prev.filter(data=>data.idBarang !== id)
      })
    }

  return (
    <>
    { isLoading && <Loading /> }
    <div className='max-w-7xl mx-auto space-y-5 px-2 md:px-5'>
      <h3 className='text-center text-3xl font-semibold'>{page.toUpperCase().slice(0,1)+page.slice(1)}</h3>
      <div className='flex flex-col md:flex-row gap-3 md:gap-5'>
        <section className='w-full md:w-96'>
          <TransaksiAddItem
            page={page}
            field={fieldPembelian}
            kunciSupplier={kunciSupplier}
            sesiPembelian={sesiPembelian}
            tempBarang={tempBarang}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            handleClickAddNewBarang={handleClickAddNewBarang}
            handleClickKunciSupplier={handleClickKunciSupplier}
            handleClickAddToInsertValue={handleClickAddToInsertValue}
            handleClickBatal={handleClickBatal}
          />
        </section>
        <section className='w-full flex-1'>
          <TransaksiTable
            page={page}
            field={fieldPembelian}
            insertValue={insertValue}
            handleClickRemoveFromInsertValue={handleClickRemoveFromInsertValue}
          />
        </section>
      </div>
      <div className='w-full bg-white rounded-lg shadow-md flex gap-2 p-2'>
        <button type='submit' className='flex items-center justify-center gap-2 w-full rounded-md shadow-sm shadow-gray-400  bg-blue-400 py-1 hover:bg-blue-500 active:bg-blue-600' onClick={handleSubmit}>Simpan</button>
        <button type='reset' className='flex items-center justify-center gap-2 w-full rounded-md shadow-sm shadow-gray-400  bg-emerald-400 py-1 hover:bg-emerald-500 active:bg-emerald-600' onClick={()=>handleReset('insert')}>Reset Input</button>
      </div>
    </div>
    </>
  )
}

export default Home