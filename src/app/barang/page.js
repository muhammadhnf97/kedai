'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { fieldTableBarang } from '../utils/tableName'
import TableAset from '../components/TableAset'
import { useBarang } from '../context/barang'
import TableWithAction from '../components/TableWithAction'
import AddItem from '../components/AddItem'
import { barangAddValue } from '../utils/tableAddValue'

const Home = () => {
  const page = 'Barang' 

    const [currentPage, setCurrentPage] = useState(1)
    const [tableBarang, setTableBarang] = useState([])
    const [inputData, setInputData] = useState({
      namaBarang : '',
      stok : '',
      modalBeli : '',
      hargaJual : '',
      satuan : '',
      idKategori : '',
    })
    const { totalAset } = useBarang()
    
    const handleChangeInputData = (e) => {
        const {name, value} = e.target
        setInputData(prev=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }
    
    const handleSubmit = async(e) => {
      e.preventDefault()
        const response = await fetch('/api/barang',{
          method: 'POST',
          headers: {
            "Content-Type": 'application/json'
          },
          body: JSON.stringify({
            namaBarang: inputData.namaBarang,
            stok: inputData.stok,
            modalBeli: inputData.modalBeli,
            hargaJual: inputData.hargaJual,
            satuan: inputData.satuan,
            idKategori: inputData.idKategori,
          })
        })
        const data = await response.json()
        console.log(data)
    }

    const handleClickReset = () => {
      setInputData({
        namaBarang : '',
        stok : '',
        modalBeli : '',
        hargaJual : '',
        satuan : '',
        idKategori : '',
      })
    }

  useEffect(()=>{
    const getDataBarang = async() => {
      try {
        const response = await fetch(`/api/barang?page=${currentPage}`)
        const data = await response.json()
        return data
      } catch (error) {
        console.log('error : ', error)
      }
    }

    getDataBarang().then(barang=>setTableBarang(barang.data))
  }, [currentPage])

  return (
    <div className='max-w-7xl mx-auto space-y-5'>
      <h3 className='text-center text-3xl font-semibold'>{page}</h3>
        <section className='w-full px-2 md:px-5'>
            <AddItem 
              input={barangAddValue} 
              inputData={inputData} 
              handleChangeInputData={handleChangeInputData}
              handleSubmit={handleSubmit}
              handleClickReset={handleClickReset}
            />
        </section>
        <section className="w-full px-2 md:px-5">
            <h4 className="font-semibold text-xl">Tabel {page}</h4>
            <TableWithAction 
              field={fieldTableBarang} 
              row={tableBarang}
            />
            <TableAset 
              desc={'Total Aset'} 
              nominal={totalAset}
            />
        </section>
    </div>
  )
}

export default Home