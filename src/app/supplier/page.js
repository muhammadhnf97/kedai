'use client'
import React, { useEffect, useState } from 'react'
import AddItem from '../components/AddItem'
import Search from '../components/Search'
import TableWithAction from '../components/TableWithAction'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import EditForm from '../components/EditForm'
import { fieldSupplier } from '../utils/tableName'
import { searchSupplierBy } from '../utils/searchutils'
import { useSearchParams } from 'next/navigation'

const Home = () => {

    const page = 'Supplier'
    const searchParam = useSearchParams().get('page')

    const [isLoading, setIsLoading] = useState(true)
    const [showPaggination, setShowPaggination] = useState(true)
    const [currentPage, setCurrentPage] = useState(searchParam || 1)
    const [dataSupplier, setDataSupplier] = useState([])
    const [totalRow, setTotalRow] = useState(0)

    useEffect(()=>{
      const getTotalRow = async() => {
        const response = await fetch('/api/supplier/totalrow')
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
      const getDataSupplier = async() => {
        setIsLoading(true)
        try {
          const response = await fetch(`/api/supplier?page=${currentPage}`)
          const data = await response.json()
          if(data.status === 200){
            setDataSupplier(data.data)
            setIsLoading(data.isLoading)
          } else {
            makeNotif(data.showNotif, data.alertTitle, data.desc)
          }
        } catch (error) {
          makeNotif(true, 'info', "Backend tidak ada")
        }
      }
      getDataSupplier()
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
      const desc = `${action?.charAt(0).toUpperCase()}${action.slice(1)} data ${id} ${nama} ?`
      setIsLoading(prev=>!prev)
      try {
        const response = await fetch(`/api/supplier/databyid?id=${id}`)
        const data = await response.json()
        setTempData(data.data[0])
        setIsLoading(prev=>!prev)
        makeNotif(isNotif, alertTitle, desc, action)
      } catch (error) {
        makeNotif(isNotif, alertTitle, desc, action)
      }
    }

    const [showEditForm, setShowEditForm] = useState(false)

    const handleClickResponseNotif = async(res = null) => {
      if(res){
        if(isNotif.action === 'delete'){
          setIsLoading(prev=>!prev)
          try {
            const response = await fetch('/api/supplier', {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                idSupplier: tempData?.idSupplier
              })
            })

            const data = await response.json()
        
            setDataSupplier(prev=>prev.filter(data=>data.idSupplier !== tempData?.idSupplier))
            makeNotif(data.showNotif, data.alertTitle, data.desc)
            setIsLoading(data.isLoading)
            setTotalRow(prev=>prev-1)
            setTempData({})
          } catch (error) {
            setTempData({})
          }
        } else {
          if(isNotif?.action === 'edit'){
            setShowEditForm(prev=>!prev)
          }
        }
      }
      makeNotif()
    }

    const handleSubmitEdit = async(e) =>{
      e.preventDefault()
      try {
        const response = await fetch('/api/supplier', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            idSupplier: tempData?.idSupplier,
            nmSupplier: tempData?.nmSupplier,
            alamat: tempData?.alamat,
            noTelp: tempData?.noTelp,
            penanggungJawab: tempData?.penanggungJawab
          })
        })
  
        const data = await response.json()
  
        setDataSupplier(prev=>{
          return prev.map(prevItem => {
              if(prevItem.idSupplier === data.data.idSupplier){
                  return {
                    idSupplier: data.data.idSupplier,
                    nmSupplier: data.data.nmSupplier,
                    alamat: data.data.alamat,
                    noTelp: data.data.noTelp,
                    penanggungJawab: data.data.penanggungJawab
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
        nmSupplier: '',
        alamat: '',
        noTelp: '',
        penanggungJawab: '', 
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
      if(insertData.nmSupplier.length < 1 && insertData.alamat.length < 1 && insertData.noTelp.length < 1 && insertData.penanggungJawab.length < 1){
        makeNotif(true, 'info', 'Data tidak boleh kosong')
        return
      }

      setIsLoading(prev=>!prev)
      try {
          const response = await fetch('/api/supplier', {
            method:'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: JSON.stringify({
              nmSupplier: insertData?.nmSupplier,
              alamat: insertData?.alamat,
              noTelp: insertData?.noTelp,
              penanggungJawab: insertData?.penanggungJawab
            })            
          })
          const data = await response.json()

          setDataSupplier(prev=>{
            return [
              {
                idSupplier: data.data.idSupplier,
                nmSupplier: data.data.nmSupplier,
                alamat: data.data.alamat,
                noTelp: data.data.noTelp,
                penanggungJawab: data.data.penanggungJawab
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
        nmSupplier: '',
        alamat: '',
        noTelp: '',
        penanggungJawab: ''
      })
    }

    const handleClickEmptyInsert = () => {
      setInsertData({
        nmSupplier: '',
        alamat: '',
        noTelp: '',
        penanggungJawab: ''
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
          response = await fetch(`/api/supplier/searching?keyword=${searchQuery.keyword}`)
        } else {
          response = await fetch(`/api/supplier?page=${currentPage}`)
        }
  
        const data = await response.json()
        return data
      }
  
      getBasedSearch().then(data=>{
        setDataSupplier(data.data)
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
      listField={fieldSupplier}
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
            field={fieldSupplier} 
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
            searchUtils={searchSupplierBy}
            handleChangeSearch={handleChangeSearchQuery}
            handleClickResetSearching={handleChangeResetQuery}
           />
        </section>
      </div>
      <section className="w-full px-2 md:px-5">
          <TableWithAction
            page={page}
            field={fieldSupplier} 
            row={dataSupplier}
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