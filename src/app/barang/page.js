'use client'
import React from 'react'
import { useState, useEffect } from 'react'
import { fieldTableBarang } from '../utils/tableName'
import { useBarang } from '../context/barang'
import { searchUtilsBarang } from '../utils/searchutils'
import TableAset from '../components/TableAset'
import TableWithAction from '../components/TableWithAction'
import AddItem from '../components/AddItem'
import Notification from '../components/Notification'
import Search from '../components/Search'
import Loading from '../components/Loading'
import EditForm from '../components/EditForm'
import { useSearchParams } from 'next/navigation'

const Home = () => {
  const pathname = useSearchParams().get('page')

  const page = 'Barang'
  const { totalAset, handleTotalAset, handleDeleteTotalAset, handleUpdateTotalAsset } = useBarang()
  
  const [isNotif, setIsNotif] = useState({
    showNotif: false,
    alertTitle : null,
    desc: null,
    action: null,
    answer: null
  })

  const makeNotif = (showNotif = false, alertTitle = null, desc = null, action = null, answer = null) => {
      setIsNotif(prev=>{
          return {
              ...prev,
              showNotif, alertTitle, desc, action, answer
          }
      })
  }
  const [tempData, setTempData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [showPaggination, setShowPaggination] = useState(true)
  const [totalRow, setTotalRow] = useState(0)
  const [currentPage, setCurrentPage] = useState(pathname || 1)
  const [tableBarang, setTableBarang] = useState([])

  const [inputData, setInputData] = useState({
    namaBarang : '',
    stok : '',
    modalBeli : '',
    hargaJual : '',
    idSatuan : '',
    idKategori : '',
    notif: null
  })

  const [searchValue, setSearchValue] = useState({
    keyword: '',
    idKategori: ''
  })

  const [showEditForm, setShowEditForm] = useState(false)

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
  
  const handleChangeInsertData = (e) => {
    const {name, value} = e.target
    setInputData(prev=>{
        return {
            ...prev,
            [name] : value
        }
    })
  }

  const handleChangeEdit = (e) => {
    const {name, value} = e.target

    setTempData(prev=>{
        return {
          ...prev,
          [name]: value
        }
    })
  }
  
  const handleSubmitInsert = async(e) => { 
    e.preventDefault()
    setIsLoading(prev=>!prev)
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
        setIsLoading(data.isLoading)
        makeNotif(data.showNotif, data.alertTitle, data.desc)
        setTotalRow(prev=>prev+1)
        
      } else {
        setIsLoading(prev=>!prev)
        makeNotif(true, 'info', 'Data tidak boleh kosong')
      }
    } catch (error) {
      makeNotif(true, 'info', 'Data tidak dapat dikirim ke database')
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

  const handleClickAction = async(idBarang, namaBarang, action) => {
    const isNotif = true
    const alertTitle = 'Peringatan'
    const desc = `${action?.charAt(0).toUpperCase()}${action.slice(1)} data ${idBarang} ${namaBarang} ?`

    setIsLoading(prev=>!prev)
    
    try {
      const response = await fetch(`/api/barang/searching?id=${idBarang}`)
      const data = await response.json()
      setTempData(data.data[0])
      setIsLoading(prev=>!prev)
      makeNotif(isNotif, alertTitle, desc, action)
    } catch (error) {
      makeNotif(true, 'info', 'Ada Kesalahan')
    }
  }

  const handleClickResponseNotif = (res) => {
    if(res){
      if(isNotif?.action === 'delete'){
        (async()=>{
          setIsLoading(prev=>!prev)
          try {
            const response = await fetch('/api/barang', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    idBarang: tempData?.idBarang
                })
            })
            const data = await response.json()
            const totalAsetToDelete = tempData?.hargaJual * tempData?.stok
        
            setTableBarang(prev=>prev.filter(data=>data.idBarang !== tempData.idBarang))
            handleDeleteTotalAset(totalAsetToDelete)
            makeNotif(data.showNotif, data.alertTitle, data.desc)
            setIsLoading(data.isLoading)

          } catch (error) {
            makeNotif(true, 'info', 'Ada kesalahan')
          }  
          setTempData({}) 
          setTotalRow(prev=>prev-1)
        })()
      }

      if(isNotif?.action === 'edit'){
        setShowEditForm(prev=>!prev)
      }
    } else {
      setTempData({})
    }
    makeNotif()
  }
  
  const handleSubmitEdit = async(e) => {
    e.preventDefault()
    setIsLoading(prev=>!prev)
    try {
      const response = await fetch('/api/barang', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idBarang: tempData?.idBarang,
          namaBarang: tempData?.namaBarang,
          stok: tempData?.stok,
          modalBeli: tempData?.modalBeli,
          hargaJual: tempData?.hargaJual,
          idSatuan: tempData?.idSatuan,
          idKategori: tempData?.idKategori,
        })
      })

      const data = await response.json()

      handleUpdateTotalAsset(data.data.oldAsset, data.data.newAsset)

      setTableBarang(prev=>{
        return prev.map(prevItem => {
            if(prevItem.idBarang === data.data.idBarang){
                return {
                  idBarang: data.data.idBarang,
                  namaBarang: data.data.namaBarang,
                  stok: data.data.stok,
                  modalBeli: data.data.modalBeli,
                  hargaJual: data.data.hargaJual,
                  namaSatuan: data.data.namaSatuan,
                  nmKategori: data.data.nmKategori,
                }
            } else {
                return prevItem
            }
        })
      })
      makeNotif(data.showNotif, data.alertTitle, data.desc)
      setIsLoading(data.isLoading)

      setShowEditForm(prev=>!prev)
    } catch (error) {
      makeNotif(true, 'info', 'Ada kesalahan')
    }
  }

  const handleClickCloseEditForm = () => {
    setShowEditForm(prev=>!prev)
    setTempData({})
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
    getDataBarang().then(barang=>{
      setTableBarang(barang?.data)
      setShowPaggination(barang?.paggination)
      setIsLoading(barang?.isLoading)
    })
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

    getBarangBasedSearch().then(data=>{
      setTableBarang(data.data)
      setShowPaggination(data.paggination)
    })
  }, [searchValue])

  return (
    <>
    {/* { isLoading && <Loading /> } */}
    { showEditForm && 
    <EditForm
      page={page}
      listField={fieldTableBarang}
      initalValue={tempData}
      handleSubmitEdit={handleSubmitEdit}
      handleClickCloseEditForm={handleClickCloseEditForm}
      handleChangeEdit={handleChangeEdit}  /> }
    { isLoading && <Loading /> }
    {
      isNotif.showNotif &&
      <Notification 
        alertTitle={isNotif.alertTitle} 
        desc={isNotif.desc} 
        handleClickResponseNotif={handleClickResponseNotif} 
      />
    }
    <div className='max-w-7xl mx-auto space-y-5'>
      <h3 className='text-center text-3xl font-semibold'>{page}</h3>
      <div className='flex flex-col px-2 gap-3 md:px-5 md:flex-row md:gap-5'>
        <section className='flex-1'>
          <AddItem
            page={page}
            field={fieldTableBarang} 
            inputData={inputData} 
            handleChangeInsertData={handleChangeInsertData}
            handleSubmitInsert={handleSubmitInsert}
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
          <TableWithAction
            page={page}
            field={fieldTableBarang} 
            initialData={tableBarang}
            totalRow={totalRow}
            currentPage={currentPage}
            handleClickCurrentPage={handleClickCurrentPage}
            showPaggination={showPaggination}
            handleClickAction={handleClickAction}
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