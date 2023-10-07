'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import TransaksiAddItem from '../components/TransaksiAddItem'
import { fieldPembelian } from '../utils/tableName'
import TransaksiTable from '../components/TransaksiTable'
import { useLogin } from '../context/login'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { RxCross1 } from 'react-icons/rx'

const Home = () => {
    const { loginData } = useLogin()
    const page = 'pembelian'
    const [isLoading, setIsLoading] = useState(false)
    const [insertValue, setInsertValue] = useState([])
    const [tempBarang, setTempBarang] = useState({})
    const [kunciSupplier, setKunciSupplier] = useState(false)
    const [sesiPembelian, setSesiPembelian] = useState({
      status: false
    })

    const handleChange = async(e, action, selectBarangFirst) => {
      const {type, name, value, checked} = e.target

      if (action === 'insert') {
        if (selectBarangFirst) {
          setTempBarang(prevData=>{
            return {
              ...prevData,
              [name]: value 
            }
          })
        } else {
          if (type !== 'checkbox') {
            setSesiPembelian(prevData=>{
              return {
                ...prevData,
                [name]: value,
              }})
          } else {
            setSesiPembelian(prevData=>{
              return {
                ...prevData,
                [name]: checked,
              }})
          }
        };
      }
    };

    const handleReset = (action) => {
      if (action === 'insert') {
        setInsertValue([])
        setSesiPembelian({
          status: false
      })
        setKunciSupplier(false)
      }
    }

    const handleSubmit = async() => {
      setIsLoading(true)
      try {
        const response = await fetch('/api/pembelian', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            insertValue
          })
        })
        const data = await response.json()
        const { message } = data
        
        handleClickNotification(true, message)

      } catch (error) {
        console.error('Ada kesalahan : ', error)
        handleClickNotification(true, "Ada kesalahan")

      } finally {
        setInsertValue([])
        setTempBarang({})
        setSesiPembelian({
          status: false
        })
        setKunciSupplier(false)
        setIsLoading(false)
      }
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
      if (!sesiPembelian?.idSupplier && !sesiPembelian?.noFaktur) {
        handleClickNotification(true, "Pilih supplier dan masukan No Faktur")
        return
      }

      setKunciSupplier(prev=>!prev)
    }

    const handleClickAddToInsertValue = () => {
      if (!tempBarang?.jumlahBeli || !tempBarang?.hargaBeli) {
        handleClickNotification(true, 'Data tidak boleh kosong')
        return
      }

      const { idSupplier, noFaktur, status } = sesiPembelian
      const { idBarang, namaBarang, jumlahBeli, hargaBeli, jumlahSatuan } = tempBarang
      const {  idPegawai } = loginData
      const totalBayar = jumlahBeli * hargaBeli


      try {
        setInsertValue(prev=>{
          return [
            ...prev,
            {
              idSupplier, noFaktur, idPegawai, idBarang, namaBarang, jumlahBeli, hargaBeli, totalBayar, status, jumlahSatuan
            }
          ]
        })
      } catch (error) {
        console.error('Ada kesalahan : ', error)
      } finally {
        setTempBarang({})
        setKeyword('')
      }
    }

    const handleClickBatal = (option) => {
      if (option === 'barang') {
        setTempBarang({})
      }
    }

    const handleClickRemoveFromInsertValue = (id) => {
      setInsertValue(prev=>{  
        return prev.filter(data=>data.idBarang !== id)
      })
    }
    
    const [isNotif, setIsNotif] = useState({})

    const handleClickNotification = (show = false, message = null) => {
      if (!show) {
        setIsNotif({
          show,
          message
        })
      } else {
        setIsNotif({
          show,
          message
        })
      }
    }

    const [initialData, setInitialData] = useState([])
    const [keyword, setKeyword] = useState('')

    const handleChangeKeyword = (e) => {
        setKeyword(e.target.value)
    }

    const handleClickEmptyKeyword = () => {
        setKeyword('')
    }

    useEffect(()=>{
        if (keyword.length > 0){
            const getData = async() => {
                const response = await fetch(`/api/barang/getbyname?keyword=${keyword}`)
                const data = await response.json()
                setInitialData(data)
            }
            
        getData() 
        } else {
            setInitialData([])
        }
    }, [keyword])

  return (
    <>
    { isLoading && <Loading /> }
    {
      isNotif?.show &&
      <section className='w-full h-full fixed top-0 left-0 bg-black bg-opacity-80 flex items-center justify-center z-50'>
        <div className='w-56 bg-white rounded-lg overflow-hidden'>
            <div className='flex flex-col items-center pb-3'>
                <div className='w-full bg-blue-300 flex justify-between items-center p-2'>
                    <div className='flex items-center justify-center gap-2'>
                        <AiOutlineInfoCircle />
                        <p>Info</p>
                    </div>
                    <button onClick={()=>handleClickNotification()}><RxCross1 /></button>
                </div>
                <div className='p-3 w-full text-center'>
                    <p>{isNotif.message}</p>
                </div>
                <button className='py-2 px-5 w-fit rounded-lg shadow-md bg-blue-300 hover:bg-blue-400 active:bg-blue-500' onClick={()=>handleClickNotification()}>Ok</button>
            </div>
        </div>
      </section>
    }
    <div className='max-w-7xl mx-auto space-y-5 px-2 md:px-5 mt-20 py-5'>
      <h3 className='text-center text-3xl font-semibold'>{page.toUpperCase().slice(0,1)+page.slice(1)}</h3>
      <div className='flex flex-col md:flex-row gap-3 md:gap-5'>
        <section className='w-full md:w-96'>
          <TransaksiAddItem
            page={page}
            field={fieldPembelian}
            kunciSupplier={kunciSupplier}
            sesiPembelian={sesiPembelian}
            tempBarang={tempBarang}
            keyword={keyword}
            initialData={initialData}
            handleChange={handleChange}
            handleReset={handleReset}
            handleSubmit={handleSubmit}
            handleClickAddNewBarang={handleClickAddNewBarang}
            handleClickKunciSupplier={handleClickKunciSupplier}
            handleClickAddToInsertValue={handleClickAddToInsertValue}
            handleClickBatal={handleClickBatal}
            handleChangeKeyword={handleChangeKeyword}
            handleClickEmptyKeyword={handleClickEmptyKeyword}
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
        <button type='submit' className='flex items-center justify-center gap-2 w-full rounded-md shadow-sm shadow-gray-400  bg-blue-400 py-1 hover:bg-blue-500 active:bg-blue-600' disabled={insertValue.length > 0 ? false : true} onClick={handleSubmit}>Simpan</button>
        <button type='reset' className='flex items-center justify-center gap-2 w-full rounded-md shadow-sm shadow-gray-400  bg-emerald-400 py-1 hover:bg-emerald-500 active:bg-emerald-600' onClick={()=>handleReset('insert')}>Reset Input</button>
      </div>
    </div>
    </>
  )
}

export default Home