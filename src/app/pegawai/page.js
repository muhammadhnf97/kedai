'use client'
import React, { useEffect, useState } from 'react'
import AddItem from '../components/AddItem'
import Search from '../components/Search'
import TableWithAction from '../components/TableWithAction'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import EditForm from '../components/EditForm'
import { fieldPegawai } from '../utils/tableName'
import { searchPegawaiBy } from '../utils/searchutils'
import { useSearchParams } from 'next/navigation'

const Home = () => {

    const page = 'Pegawai'
    const searchParam = useSearchParams().get('page')

    const [isLoading, setIsLoading] = useState(true)
    const [showPaggination, setShowPaggination] = useState(true)
    const [currentPage, setCurrentPage] = useState(searchParam || 1)
    const [initialData, setInitialData] = useState([])
    const [totalRow, setTotalRow] = useState(0)

    useEffect(()=>{
      const getTotalRow = async() => {
        const response = await fetch('/api/pegawai/totalrow')
        const data = await response.json()
        return data.totalRow
      }
      getTotalRow().then(data=>setTotalRow(data))
    }, [])

    const [isNotif, setIsNotif] = useState({
      showNotif: false,
      alertTitle : null,
      desc: null,
      action: null
    })

    const makeNotif = (showNotif = false, alertTitle = null, desc = null, action = null, answer = null) => {
        setIsNotif(prev=>{
            return {
                ...prev,
                showNotif, alertTitle, desc, action, answer
            }
        })
    }

    useEffect(()=>{
      const getinitialData = async() => {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/pegawai?page=${currentPage}`)
          const data = await response.json()
          if(data.status === 200){
            setInitialData(data.data)
            setIsLoading(data.isLoading)
          } else {
            makeNotif(data.showNotif, data.alertTitle, data.desc)
          }
        } catch (error) {
          makeNotif(true, 'info', "Backend tidak ada")
        }
      }
      getinitialData()
    }, [currentPage])

    useEffect(()=>{

    }, [])

    const handleClickCurrentPage = (page) => {
        setCurrentPage(page)
    }

    const [tempData, setTempData] = useState({})

    const handleClickAction = async(id, nama, action) => {
      const isNotif = true
      const alertTitle = 'Peringatan'
    
      const desc = action === 'newakun' ? 
      `Tambah akun dengan ID ${id} ${nama} ? ` : 
      `${action.charAt(0).toUpperCase()}${action.slice(1)} data ${id} ${nama} ?`
      setIsLoading(prev=>!prev)
      try {
        const response = await fetch(`/api/pegawai/databyid?id=${id}`)
        const data = await response.json()
        setTempData(data.data[0])
        setIsLoading(prev=>!prev)
        makeNotif(isNotif, alertTitle, desc, action)
      } catch (error) {
        makeNotif(isNotif, alertTitle, desc, action)
      }
    }
    console.log(isNotif)
    const [showEditForm, setShowEditForm] = useState(false)

    const handleClickResponseNotif = async(res = null) => {
      if(res){
        if(isNotif.action === 'delete'){
          setIsLoading(prev=>!prev)
          try {
            const response = await fetch('/api/pegawai', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                idPegawai: tempData?.idPegawai
              })
            })

            const data = await response.json()
        
            setInitialData(prev=>prev.filter(data=>data.idPegawai !== tempData?.idPegawai))
            makeNotif(data.showNotif, data.alertTitle, data.desc)
            setIsLoading(data.isLoading)
            setTotalRow(prev=>prev-1)
            setTempData({})
          } catch (error) {
            setTempData({})
          }
        } else if(isNotif?.action === 'edit'){
          setShowEditForm(prev=>!prev)
        } else if(isNotif?.action === 'newakun'){
          console.log('user baru telah dibuat')
        }
      }
      makeNotif()
    }

    const handleSubmitEdit = async(e) =>{
      e.preventDefault()
      try {
        const response = await fetch('/api/pegawai', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPegawai: tempData?.idPegawai,
            nmPegawai: tempData?.nmPegawai,
            alamat: tempData?.alamat,
            noTelp: tempData?.noTelp,
            jabatan: tempData?.jabatan
          })
        })
  
        const data = await response.json()
  
        setInitialData(prev=>{
          return prev.map(prevItem => {
              if(prevItem.idPegawai === data.data.idPegawai){
                  return {
                    idPegawai: data.data.idPegawai,
                    nmPegawai: data.data.nmPegawai,
                    alamat: data.data.alamat,
                    noTelp: data.data.noTelp,
                  }
              } else {
                  return prevItem
              }
          })
        })
        makeNotif(data.showNotif, data.alertTitle, data.desc)
        setIsLoading(data.isLoading)
        setShowEditForm(prev=>!prev)
        setTempData({})
      } catch (error) {
        makeNotif(true, 'info', 'Ada kesalahan')
      }
    }

    const handleClickCloseEditForm = () => {
      setShowEditForm(prev=>!prev)
      setTempData({})
    }

    const handleChangeEdit = (e) => {
      const {name, value} = e.target
      setTempData(prev=>{
        return {
          ...prev,
          [name]:value
        }
      })
    }


    const [insertData, setInsertData] = useState({
        nmPegawai: '',
        alamat: '',
        noTelp: '',
        jabatan: ''
    })

    const handleChangeInsertData = (e) =>{
      const {name, value} = e.target
      setInsertData(prev=>{
        return {
          ...prev,
          [name]: value
        }
      })
    }

    const handleSubmitInsert = async(e) => {
      e.preventDefault()
      if(insertData.nmPegawai.length < 1 && insertData.alamat.length < 1 && insertData.noTelp.length < 1){
        makeNotif(true, 'info', 'Data tidak boleh kosong')
        return
      }

      setIsLoading(prev=>!prev)
      try {
          const response = await fetch('/api/pegawai', {
            method:'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              nmPegawai: insertData?.nmPegawai,
              alamat: insertData?.alamat,
              noTelp: insertData?.noTelp,
              jabatan: insertData?.jabatan
            })            
          })
          const data = await response.json()

          setInitialData(prev=>{
            return [
              {
                idPegawai: data.data.idPegawai,
                nmPegawai: data.data.nmPegawai,
                alamat: data.data.alamat,
                noTelp: data.data.noTelp,
                jabatan: data.data.jabatan
                
              },
              ...prev
            ]
          })

          makeNotif(data.showNotif, data.alertTitle, data.desc)
          setIsLoading(data.isLoading)
          setTotalRow(prev=>prev+1)
      } catch (error) {
        makeNotif(true, 'info', 'Ada kesalahan saat mengirim data')        
      }
      setInsertData({
        nmPegawai: '',
        alamat: '',
        noTelp: '',
        jabatan: ''
      })
    }

    const handleClickEmptyInsert = () => {
      setInsertData({
        nmPegawai: '',
        alamat: '',
        noTelp: '',
        jabatan: ''
      })
    }

    const [searchQuery, setSearchQuery] = useState({
        keyword: ''
    })

    const handleChangeSearchQuery = (e) => {
      const {name, value} = e.target
      setSearchQuery(prev=>{
        return {
          ...prev,
          [name]: value
        }
      })
    }

    useEffect(()=>{
      const getBasedSearch = async() => {
        let response
        if(searchQuery.keyword.length > 0){
          response = await fetch(`/api/pegawai/searching?keyword=${searchQuery.keyword}`)
        } else {
          response = await fetch(`/api/pegawai?page=${currentPage}`)
        }
  
        const data = await response.json()
        return data
      }
  
      getBasedSearch().then(data=>{
        setInitialData(data.data)
        setShowPaggination(data.paggination)
      })
    }, [searchQuery])

    const handleChangeResetQuery = () => {
      setSearchQuery({
        keyword: ''
      })
    }

    

  return (
    <>
    { showEditForm && 
    <EditForm
      page={page}
      listField={fieldPegawai}
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
            field={fieldPegawai} 
            inputData={insertData} 
            handleChangeInsertData={handleChangeInsertData}
            handleSubmitInsert={handleSubmitInsert}
            handleClickReset={handleClickEmptyInsert}
          />
        </section>
        <section className='flex-1'>
          <Search 
            page={page}
            searchValue={searchQuery}
            searchUtils={searchPegawaiBy}
            handleChangeSearch={handleChangeSearchQuery}
            handleClickResetSearching={handleChangeResetQuery}
           />
        </section>
      </div>
      <section className="w-full px-2 md:px-5">
          <TableWithAction
            page={page}
            field={fieldPegawai} 
            initialData={initialData}
            totalRow={totalRow}
            currentPage={currentPage}
            handleClickCurrentPage={handleClickCurrentPage}
            showPaggination={showPaggination}
            handleClickAction={handleClickAction}
          />
      </section>
    </div>
    </>
  )
}

export default Home