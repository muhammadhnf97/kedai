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
import Loading from '../components/Loading'
import EditForm from '../components/EditForm'

const Home = () => {
  const page = 'Barang'
  const { totalAset, handleTotalAset, handleDeleteTotalAset } = useBarang()
  const [isLoading, setIsLoading] = useState(false)
  const [paggination, setPaggination] = useState(true)
  const [totalRow, setTotalRow] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [tableBarang, setTableBarang] = useState([])
  const [editedValue, setEditedValue] = useState({})
  const [isNotif, setIsNotif] = useState({
    showNotif:false,
    alertTitle : null,
    desc: null,
    answer: null
  })

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

  const [initalValue, setInitialValue] = useState({})

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

  const handleChangeEdit = (e) => {
    const {name, value} = e.target
    console.log(name, value)
    // setInitialValue(prev=>{
    //   prev.action,
    //   prev.data.map(prevData=>{
    //     return {
    //       ...prevData,
    //       [name]: value
    //     }
    //   })
    // })
  }
  
  const handleSubmit = async(e) => { 
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
        
        setIsNotif({
          showNotif:data.showNotif,
          alertTitle : data.alertTitle,
          desc: data.desc,
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
        setIsLoading(data.isLoading)
        
      } else {
        setIsNotif({
          showNotif: true,
          alertTitle : 'caution',
          desc: 'Data tidak boleh kosong !'
        })
        setIsLoading(prev=>!prev)
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

  const handleEditAndDelete = async(idBarang, namaBarang, action = null) => {
    setIsNotif({
      showNotif: true,
      alertTitle : 'warning',
      desc: `${action?.charAt(0).toUpperCase()}${action.slice(1)} data ${idBarang} ${namaBarang} ?`
    })
    try {
      const response = await fetch(`/api/barang/searching?id=${idBarang}`)
      const data = await response.json()
      setInitialValue({
        action, data: data.data
      })
      setEditedValue({
        data: data.data
      })
    } catch (error) {
      console.log(error)
    }
  }

  const handleClickCloseEditForm = () => {
    setShowEditForm(prev=>!prev)
    setInitialValue({})
  }

  const handleClickResponseNotif = (res) => {
    if(res){
      if(initalValue?.action === 'delete'){
        handleDelete()
      }

      if(initalValue?.action === 'edit'){
        setShowEditForm(prev=>!prev)
      }
    } else {
      setInitialValue({})
    }
    
    handleClickResetNotif()
  }
  
   const handleDelete = async() => {   
    setIsLoading(prev=>!prev)
    try {
      const response = await fetch('/api/barang', {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          },
          body:JSON.stringify({
              idBarang: initalValue?.data?.idBarang
          })
      })
      const data = await response.json()
      const totalAsetToDelete = initalValue?.data?.hargaJual * initalValue?.data?.stok
  
      setTableBarang(prev=>prev.filter(data=>data.idBarang !== initalValue?.data?.idBarang))
      handleDeleteTotalAset(totalAsetToDelete)
      setIsNotif({
        showNotif: data.showNotif,
        alertTitle : data.alertTitle,
        desc: data.desc
      })
      setIsLoading(data.isLoading)
    } catch (error) {
      console.log(error)
    }     
  }

  const handleSubmitEdit = async(e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/barang', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idBarang: editedValue.idBarang,
          namaBarang: editedValue.namaBarang,
          stok: editedValue.stok,
          modalBeli: editedValue.modalBeli,
          hargaJual: editedValue.hargaJual,
          idSatuan: editedValue.idSatuan,
          idKategori: editedValue.idKategori,
        })
      })

      const data = await response.json()
      console.log(data)
    } catch (error) {
      setIsNotif({
        showNotif: true,
        alertTitle : 'caution',
        desc: 'Ada kesalahan'
      })
      
    }
  }

  console.log(initalValue)

  const handleEdit = async(id) => {
    
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
      setPaggination(barang?.paggination)
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
      setPaggination(data.paggination)
    })
  }, [searchValue])

  return (
    <>
    { showEditForm && 
    <EditForm
      page={page}
      listField={fieldTableBarang}
      initalValue={initalValue?.data[0]}
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
          <TableWithAction
            page={page}
            field={fieldTableBarang} 
            row={tableBarang}
            totalRow={totalRow}
            currentPage={currentPage}
            handleClickCurrentPage={handleClickCurrentPage}
            paggination={paggination}
            handleEditAndDelete={handleEditAndDelete}
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