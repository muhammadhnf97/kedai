'use client'
import React, { useEffect, useState } from 'react'
import AddItem from '../components/AddItem'
import Search from '../components/Search'
import TableWithAction from '../components/TableWithAction'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import EditForm from '../components/EditForm'
import { fieldKategori } from '../utils/tableName'
import { searchBy } from '../utils/searchutils'
import { useSearchParams } from 'next/navigation'
import { useLogin } from '../context/login'
import TableWithoutAction from '../components/TableWithoutAction'

const Home = () => {

    const { loginData } = useLogin()

    const page = 'Kategori'
    const searchParam = useSearchParams().get('page')

    const [isLoading, setIsLoading] = useState(true)
    const [showPaggination, setShowPaggination] = useState(true)
    const [currentPage, setCurrentPage] = useState(searchParam || 1)
    const [initialData, setInitialData] = useState([])
    const [totalRow, setTotalRow] = useState(0)

    useEffect(()=>{
      const getTotalRow = async() => {
        const response = await fetch('/api/kategori/totalrow')
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
          const response = await fetch(`/api/kategori?page=${currentPage}`)
          const data = await response.json()
          if(data.status === 200){
            setInitialData(data.data)
            setIsLoading(false)
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

    const handleClickActionFromTable = async(id, nama, action) => {
      const isNotif = true
      const alertTitle = 'Peringatan'
      const desc = `${action.charAt(0).toUpperCase()}${action.slice(1)} data ${id} ${nama} ?`

      setIsLoading(true)
      try {
        const response = await fetch(`/api/kategori/databyid?id=${id}`)
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

    const handleClickResponseNotif = async(res) => {
      makeNotif()
      if(res){
        if(isNotif.action === 'delete'){
          setIsLoading(true)
          try {
            const response = await fetch('/api/kategori', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                idKategori: tempData?.idKategori
              })
            })

            const data = await response.json()
        
            setInitialData(prev=>prev.filter(data=>data.idKategori !== tempData?.idKategori))
            makeNotif(data.showNotif, data.alertTitle, data.desc)
            setIsLoading(false)
            setTotalRow(prev=>prev-1)
          } catch (error) {
            setTempData({})
          }
        } else if(isNotif?.action === 'edit'){
          setShowEditForm(true)
          setIsShowDetai(false)
        }
      }
    }

    const handleSubmitEdit = async(e) =>{
      e.preventDefault()
      try {
        const response = await fetch('/api/kategori', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idKategori: tempData?.idKategori,
            nmKategori: tempData?.nmKategori
          })
        })
  
        const data = await response.json()
  
        setInitialData(prev=>{
          return prev.map(prevItem => {
              if(prevItem.idKategori === data.data.idKategori){
                  return {
                    idKategori: data.data.idKategori,
                    nmKategori: data.data.nmKategori
                  }
              } else {
                  return prevItem
              }
          })
        })
        makeNotif(data.showNotif, data.alertTitle, data.desc)
        setIsLoading(false)
        setShowEditForm(false)
        setIsShowDetai(false)
        setTempData({})
      } catch (error) {
        makeNotif(true, 'info', 'Ada kesalahan')
      }
    }

    const handleClickCloseEditForm = () => {
      setShowEditForm(false)
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
        nmKategori: '',
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
      if(insertData.nmKategori.length < 1 ){
        makeNotif(true, 'info', 'Data tidak boleh kosong')
        return
      }

      setIsLoading(true)
      try {
          const response = await fetch('/api/kategori', {
            method:'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              nmKategori: insertData?.nmKategori
            })            
          })
          const data = await response.json()

          setInitialData(prev=>{
            return [
              {
                idKategori: data.data.idKategori,
                nmKategori: data.data.nmKategori            
              },
              ...prev
            ]
          })

          makeNotif(data.showNotif, data.alertTitle, data.desc)
          setIsLoading(false)
          setTotalRow(prev=>prev+1)
      } catch (error) {
        makeNotif(true, 'info', 'Ada kesalahan saat mengirim data')        
      }
      setInsertData({
        nmKategori: ''
      })
    }

    const handleClickEmptyInsert = () => {
      setInsertData({
        nmKategori: ''
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
          response = await fetch(`/api/kategori/searching?keyword=${searchQuery.keyword}`)
        } else {
          response = await fetch(`/api/kategori?page=${currentPage}`)
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
      listField={fieldKategori}
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
        { loginData.jabatan !== 'pegawai' && <section className='flex-1'>
          <AddItem
            page={page}
            field={fieldKategori} 
            inputData={insertData} 
            handleChangeInsertData={handleChangeInsertData}
            handleSubmitInsert={handleSubmitInsert}
            handleClickReset={handleClickEmptyInsert}
          />
        </section> }
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
          { 
          loginData.jabatan === 'administrator' || loginData.jabatan === 'pimpinan' ? <TableWithAction
            page={page}
            isShowDetail={isShowDetail}
            detailItem={detailItem}
            handleClickDetail={handleClickDetail}
            initialField={fieldKategori} 
            initialData={initialData}
            totalRow={totalRow}
            currentPage={currentPage}
            showPaggination={showPaggination}
            handleClickCurrentPage={handleClickCurrentPage}
            handleClickActionFromTable={handleClickActionFromTable}
          /> 
          :
          <TableWithoutAction
            page={page}
            isShowDetail={isShowDetail}
            detailItem={detailItem}
            handleClickDetail={handleClickDetail}
            initialField={fieldKategori} 
            initialData={initialData}
            totalRow={totalRow}
            currentPage={currentPage}
            showPaggination={showPaggination}
            handleClickCurrentPage={handleClickCurrentPage}
            handleClickActionFromTable={handleClickActionFromTable}
          />}
      </section>
    </div>
    </>
  )
}

export default Home