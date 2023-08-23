'use client'
import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import EditForm from '../components/EditForm'
import { fieldUser } from '../utils/tableName'
import { searchBy } from '../utils/searchutils'
import { useSearchParams } from 'next/navigation'
import { useUser } from '../context/user'
import TableWithoutAction from '../components/TableWithoutAction'

const Home = () => {

    const page = 'User'
    const searchParam = useSearchParams().get('page')

    const [isLoading, setIsLoading] = useState(true)
    const [showPaggination, setShowPaggination] = useState(true)
    const [currentPage, setCurrentPage] = useState(searchParam || 1)
    const [initialData, setInitialData] = useState([])
    const [totalRow, setTotalRow] = useState(0)

    useEffect(()=>{
      const getTotalRow = async() => {
        const response = await fetch('/api/user/totalrow')
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
          const response = await fetch(`/api/user?page=${currentPage}`)
          const data = await response.json()
          console.log(data)
          if(data.status === 200){
            setInitialData(data.data)
            setIsLoading(false)
          } else {
            makeNotif(data.showNotif, data.alertTitle, data.desc)
            setIsLoading(false)
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

    const handleClickActionFromTable = async(id, nama, action) => {
      const isNotif = true
      const alertTitle = 'Peringatan'
      const desc = action === 'aktifakun' ? 
      `Aktifkan akun dengan ID ${id} ${nama} ? ` : action === 'nonaktifakun' ? `Nonaktifkan akun dengan ID ${id} ${nama} ? ` :
      `${action.charAt(0).toUpperCase()}${action.slice(1)} data ${id} ${nama} ?`

      setIsLoading(true)
      try {
        const response = await fetch(`/api/user/databyid?id=${id}`)
        const data = await response.json()
        setTempData(data.data[0])
        setIsLoading(false)
        setIsShowDetai(false)
        makeNotif(isNotif, alertTitle, desc, action)
      } catch (error) {
        makeNotif(isNotif, alertTitle, desc, action)
      }
    }
    const [showEditForm, setShowEditForm] = useState(false)
    const { handleClickUserCreated, handleClickInactiveUser } = useUser()

    const handleClickResponseNotif = async(res) => {
      makeNotif()
      if(res){
        if(isNotif.action === 'delete'){
          setIsLoading(true)
          try {
            const response = await fetch('/api/user', {
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
            setIsLoading(false)
            setTotalRow(prev=>prev-1)
          } catch (error) {
            setTempData({})
          }
        } 
      }
    }

    const handleSubmitEdit = async(e) =>{
      e.preventDefault()
      try {
        const response = await fetch('/api/user', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idPegawai: tempData?.idPegawai,
            nmPegawai: tempData?.nmPegawai,
            alamat: tempData?.alamat,
            noTelp: tempData?.noTelp,
            jabatan: tempData?.jabatan,
            email: tempData?.email
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
                    jabatan: data.data.jabatan,
                    email: data.data.email
                  }
              } else {
                  return prevItem
              }
          })
        })
        makeNotif(data.showNotif, data.alertTitle, data.desc)
        setIsLoading(data.isLoading)
        setShowEditForm(false)
        setIsShowDetai(false)
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
        jabatan: '',
        email: ''
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
          const response = await fetch('/api/user', {
            method:'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              nmPegawai: insertData?.nmPegawai,
              alamat: insertData?.alamat,
              noTelp: insertData?.noTelp,
              jabatan: insertData?.jabatan,
              email: insertData?.email
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
                jabatan: data.data.jabatan,
                email: data.data.email                
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
        jabatan: '',
        email: ''
      })
    }

    const handleClickEmptyInsert = () => {
      setInsertData({
        nmPegawai: '',
        alamat: '',
        noTelp: '',
        jabatan: '',
        email: ''
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
          response = await fetch(`/api/user/searching?keyword=${searchQuery.keyword}`)
        } else {
          response = await fetch(`/api/user?page=${currentPage}`)
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

    const [isShowDetail, setIsShowDetai] = useState(false)
    const [detailItem, setDetailItem] = useState({})
    const handleClickDetail = (item = null) => {
        if(item){
            setDetailItem(item)
        } else {
            setDetailItem({})
        }
        setIsShowDetai(prev=>!prev)
    }
    
  return (
    <>
    { showEditForm && 
    <EditForm
      page={page}
      listField={fieldUser}
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
          <Search 
            page={page}
            searchValue={searchQuery}
            searchUtils={searchBy}
            handleChangeSearch={handleChangeSearchQuery}
            handleClickResetSearching={handleChangeResetQuery}
           />
        </section>
      </div>
      <section className="w-full px-2 md:px-5">
          <TableWithoutAction
            page={page}
            initialField={fieldUser} 
            initialData={initialData}
            totalRow={totalRow}
            currentPage={currentPage}
            isShowDetail={isShowDetail}
            detailItem={detailItem}
            showPaggination={showPaggination}
            handleClickDetail={handleClickDetail}
            handleClickCurrentPage={handleClickCurrentPage}
          />
      </section>
    </div>
    </>
  )
}

export default Home