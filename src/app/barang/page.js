'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { fieldTableBarang } from '../utils/tableName'
import { useBarang } from '../context/barang'
import { barangAddValue } from '../utils/tableAddValue'
import { searchUtilsBarang } from '../utils/searchutils'
import TableAset from '../components/TableAset'
import TableWithAction from '../components/TableWithAction'
import AddItem from '../components/AddItem'
import Notification from '../components/Notification'
import Search from '../components/Search'

const Home = () => {
  const page = 'Barang' 

  //MENDAPATKAN TOTAL PAGE
    const [totalRow, setTotalRow] = useState(0)

  //MEDAPATKAN CURRENT PAGE
    const [currentPage, setCurrentPage] = useState(1)

  //MENDAPATKAN ISI TABEL BARANG
    const [tableBarang, setTableBarang] = useState([])
  
  //MENGATUR NOTIF
    const [isNotif, setIsNotif] = useState({
      alertTitle : null,
      desc: null
    })

  //MENGATUR NILAI INPUT UNTUK DIKIRIM KE BE
    const [inputData, setInputData] = useState({
      namaBarang : '',
      stok : '',
      modalBeli : '',
      hargaJual : '',
      idSatuan : '',
      idKategori : '',
      notif: null
    })

  //MENGAMBIL CONTEXT ASET DAN FUNGSINYA
    const { totalAset, handleTotalAset } = useBarang()

  //SEARCHING
    const [searchValue, setSearchValue] = useState({
      keyword: '',
      idKategori: ''
    })

    const handleClickResetSearching = () => {
      setSearchValue({
        keyword: '',
        idKategori: ''
      })
    }

    const handleChangeSearch = (e) => {
      const {name, value} = e.target

      setSearchValue(prev=>{
        return {
          ...prev,
          [name]: value
        }
      })
    }
    
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
        if(inputData.namaBarang.length > 0 && inputData.stok.length > 0 && inputData.modalBeli.length > 0 && inputData.hargaJual.length > 0 && inputData.idSatuan.length > 0 && inputData.idKategori.length > 0){
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
              idSatuan: inputData.idSatuan,
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

          setTableBarang(prev=>[
            {  
              idBarang: data.input.newID,
              namaBarang: data.input.namaBarang,
              stok: data.input.stok,
              modalBeli: data.input.modalBeli,
              hargaJual: data.input.hargaJual,
              namaSatuan: data.input.namaSatuan.namaSatuan,
              nmKategori: data.input.nmKategori.nmKategori,
            },
              ...prev 
            ]
          )

          handleTotalAset(data.input.newTotalAset)
          
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
        idSatuan : '',
        idKategori : '',
        notif : '',
      })
    }

  useEffect(()=>{
    const getTotalRow = async() => {
      const response = await fetch('/api/barang/totalrow')
      const data = await response.json()
      return data.totalRow
    }

    getTotalRow().then(data=>setTotalRow(data))
  }, [])

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

    getDataBarang().then(barang=>setTableBarang(barang?.data))
  }, [currentPage])

  useEffect(()=>{
    const getBarangBasedSearch = async() => {
      let response
      if(searchValue.idKategori.length > 0){
        response = await fetch(`/api/barang/searching?kategori=${searchValue.idKategori}`)
      } else if(searchValue.keyword.length > 0){
        response = await fetch(`/api/barang/searching?keyword=${searchValue.keyword}`)
      } else if(searchValue.idKategori.length > 0 && searchValue.keyword.length > 0){
        response = await fetch(`/api/barang/searching?kategori=${searchValue.idKategori}&&keyword=${searchValue.keyword}`)
      } else {
        response = await fetch(`/api/barang?page=${currentPage}`)
      }

      const data = await response.json()
      return data

    }

    getBarangBasedSearch().then(data=>setTableBarang(data.data))
  }, [searchValue])

  useEffect(()=>{
    console.log(tableBarang.length)
  }, [tableBarang])

  return (
    <>
    {
      isNotif.showNotif &&
      <Notification alertTitle={isNotif.alertTitle} desc={isNotif.desc} handleClickResetNotif={handleClickResetNotif} />
    }
    <div className='max-w-7xl mx-auto space-y-5'>
      <h3 className='text-center text-3xl font-semibold'>{page}</h3>
      <div className='flex flex-col px-2 gap-3 md:px-5 md:flex-row md:gap-5'>
        <section className='flex-1'>
          <AddItem
            page={page}
            input={barangAddValue} 
            inputData={inputData} 
            handleChangeInputData={handleChangeInputData}
            handleSubmit={handleSubmit}
            handleClickReset={handleClickReset}
          />
        </section>
        <section className='flex-1'>
          <Search 
            page={page}
            searchValue={searchValue}
            searchUtils={searchUtilsBarang}
            handleChangeSearch={handleChangeSearch}
            handleClickResetSearching={handleClickResetSearching}
           />
        </section>
      </div>
        <section className="w-full px-2 md:px-5">
            <h4 className="font-semibold text-xl">Tabel {page}</h4>
            <TableWithAction 
              field={fieldTableBarang} 
              row={tableBarang}
              totalRow={totalRow}
              currentPage={currentPage}
              handleClickCurrentPage={handleClickCurrentPage}
            />
            <TableAset 
              desc={'Total Aset'} 
              nominal={totalAset}
            />
        </section>
    </div>
    </>
  )
}

export default Home