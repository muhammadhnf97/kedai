'use client'
import React from 'react'
import TableAset from '../components/TableAset'
import TableWithAction from '../components/TableWithAction'
import AddItem from '../components/AddItem'
import Notification from '../components/Notification'
import { useState, useEffect } from 'react'
import { fieldTableSatuan } from '../utils/tableName'
import { useBarang } from '../context/barang'
import { satuanAddValue } from '../utils/tableAddValue'

const Home = () => {
  const page = 'Satuan' 

  //MENDAPATKAN TOTAL PAGE
    const [totalRow, setTotalRow] = useState(0)

  //MEDAPATKAN CURRENT PAGE
    const [currentPage, setCurrentPage] = useState(1)

  //MENDAPATKAN ISI TABEL BARANG
    const [tableSatuan, setTableSatuan] = useState([])
  
  //MENGATUR NOTIF
    const [isNotif, setIsNotif] = useState({
      alertTitle : null,
      desc: null
    })

  //MENGATUR NILAI INPUT UNTUK DIKIRIM KE BE
    const [inputData, setInputData] = useState({
      namaBarang : '',
      notif: null
    })
    
    const handleChangeInputData = (e) => {
        const {name, value} = e.target
        setInputData(prev=>{
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleClickResetNotif = () => {
      setIsNotif({
        showNotif:false,
        alertTitle : null,
        desc: null
      })
    }
    
    const handleSubmit = async(e) => { 
      e.preventDefault()
      try {
        if(inputData.namaBarang.length > 1 && inputData.stok.length > 1 && inputData.modalBeli.length > 1 && inputData.hargaJual.length > 1 && inputData.satuan.length > 1 && inputData.idKategori.length > 1 ){
          const response = await fetch('/api/satuan',{
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
              notif: null,
            })
          })
          const data = await response.json()
          
          setIsNotif({
            showNotif:data.showNotif,
            alertTitle : data.alertTitle,
            desc: data.desc
          })

          setTableSatuan(prev=>[
            {  
              idBarang: data.input.newID,
              namaBarang: data.input.namaBarang,
              stok: data.input.stok,
              modalBeli: data.input.modalBeli,
              hargaJual: data.input.hargaJual,
              satuan: data.input.satuan,
              nmKategori: data.input.nmKategori.nmKategori,
            },
              ...prev 
            ]
          )
          
        } else {
          setIsNotif({
            showNotif: true,
            alertTitle : 'caution',
            desc: 'Data tidak boleh kosong !'
          })
        }
      } catch (error) {
        setIsNotif({
          showNotif: true,
          alertTitle : 'caution',
          desc: 'Data tidak dapat dikirim ke database !'
        })
      }

      handleClickReset()
    }

    const handleClickCurrentPage = (page) => {
      setCurrentPage(page)
    }

    const handleClickReset = () => {
      setInputData({
        namaBarang : '',
        stok : '',
        modalBeli : '',
        hargaJual : '',
        satuan : '',
        idKategori : '',
        notif : '',
      })
    }

  useEffect(()=>{
    const getTotalRow = async() => {
      const response = await fetch('/api/satuan/totalrow')
      const data = await response.json()
      return data.totalRow
    }

    getTotalRow().then(data=>setTotalRow(data))
  }, [])

  useEffect(()=>{
    const getDataSatuan = async() => {
      try {
        const response = await fetch(`/api/satuan?page=${currentPage}`)
        const data = await response.json()
        return data
      } catch (error) {
        console.log('error : ', error)
      }
    }

    getDataSatuan().then(satuan=>setTableSatuan(satuan?.newData))
  }, [currentPage])

  return (
    <>
    {
      isNotif.showNotif &&
      <Notification alertTitle={isNotif.alertTitle} desc={isNotif.desc} handleClickResetNotif={handleClickResetNotif} />
    }
    <div className='max-w-7xl mx-auto space-y-5'>
      <h3 className='text-center text-3xl font-semibold'>{page}</h3>
        <section className='w-full px-2 md:px-5'>
            <AddItem 
              input={satuanAddValue} 
              inputData={inputData} 
              handleChangeInputData={handleChangeInputData}
              handleSubmit={handleSubmit}
              handleClickReset={handleClickReset}
            />
        </section>
        <section className="w-full px-2 md:px-5">
            <h4 className="font-semibold text-xl">Tabel {page}</h4>
            <TableWithAction 
              field={fieldTableSatuan} 
              row={tableSatuan}
              totalRow={totalRow}
              currentPage={currentPage}
              handleClickCurrentPage={handleClickCurrentPage}
            />
        </section>
    </div>
    </>
  )
}

export default Home