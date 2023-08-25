'use client'
import React, { useEffect, useState } from 'react'
import AddItem from '../components/AddItem'
import Search from '../components/Search'
import TableWithAction from '../components/TableWithAction'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import EditForm from '../components/EditForm'
import TableWithoutAction from '../components/TableWithoutAction'
import { fieldPegawai } from '../utils/tableName'
import { searchBy } from '../utils/searchutils'
import { useSearchParams } from 'next/navigation'
import { useUser } from '../context/user'
import { useLogin } from '../context/login'
import { createUser, updateUser, getDataById, getTotalRow, updateData, getInitialData, deleteData, postData, getBasedSearch } from '../utils/fetchingdata'

const Home = () => {

    const { loginData } = useLogin()

    const page = 'pegawai'
    const searchParam = useSearchParams().get('page')

    const [isLoading, setIsLoading] = useState(true)
    const [showPaggination, setShowPaggination] = useState(true)
    const [currentPage, setCurrentPage] = useState(searchParam || 1)
    const [initialData, setInitialData] = useState([])
    const [totalRow, setTotalRow] = useState(0)

    useEffect(()=>{
      getTotalRow('pegawai').then(data=>setTotalRow(data))
    }, [])

    const [isNotif, setIsNotif] = useState({
      showNotif: false,
      alertTitle : null,
      desc: null,
      action: null
    })

    const makeNotif = (showNotif = false, alertTitle = null, desc = null, action = null) => {
        setIsNotif(prev=>{
            return {
                ...prev,
                showNotif, alertTitle, desc, action
            }
        })
    }

    useEffect(()=>{
      setIsLoading(true)
      getInitialData(page, currentPage).then(data=>{
        setIsLoading(false)
        setInitialData(data.data)
      })
    }, [currentPage])

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
      getDataById(page, id).then(data=>{
        setTempData(data.data)
        setIsLoading(false)
        setIsShowDetai(false)
        makeNotif(isNotif, alertTitle, desc, action)
      })
    }

    const [showEditForm, setShowEditForm] = useState(false)

    const { handleClickUserCreated, handleClickInactiveUser } = useUser()

    const handleClickResponseNotif = async(res) => {
      makeNotif()
      if(res){
        if(isNotif.action === 'delete'){
          setIsLoading(true)
          deleteData(page, tempData).then(data=>{
            setInitialData(prevData=>prevData.filter(data=>data.idPegawai !== Object.values(tempData)[0]))
            makeNotif(data.isNotif, data.alertTitle, data.desc)
            setIsLoading(false)
            setTotalRow(prevData=>prevData-1)
          })
          setTempData({})
        } else if(isNotif?.action === 'edit'){
          setShowEditForm(true)
          setIsShowDetai(false)
        } else if(isNotif?.action === 'aktifakun'){
          setIsLoading(true)
          createUser(tempData).then(data=>{
            setIsLoading(false)
            handleClickUserCreated(tempData.idPegawai, tempData.status)
            makeNotif(data.isNotif, data.alertTitle, data.desc)
          })
          setTempData({})
        } else if(isNotif?.action === 'nonaktifakun'){
          setIsLoading(true)
          updateUser(tempData).then(data=>{
            handleClickInactiveUser(tempData.idPegawai)
            setIsLoading(false)
            makeNotif(data.isNotif, data.alertTitle, data.desc)
          })
          setTempData({})
        }
      }
    }

    const handleSubmitEdit = async(e) =>{
      e.preventDefault()
      setIsLoading(true)
      updateData(page, tempData).then(data=>{
        setIsLoading(false)
        setShowEditForm(false)
        setIsShowDetai(false)
        makeNotif(data.isNotif, data.alertTitle, data.desc)
        setInitialData(prev=>{
          return prev.map(prevItem => {
              if(prevItem.idPegawai === tempData.idPegawai){
                  return {
                    idPegawai: tempData?.idPegawai,
                    nmPegawai: tempData?.nmPegawai,
                    alamat: tempData?.alamat,
                    noTelp: tempData?.noTelp,
                    jabatan: tempData.jabatan,
                    email: tempData.email
                  }
              } else {
                  return prevItem
              }
          })
        })
        setTempData({})
      })
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
          [name]: value
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

      setIsLoading(true)
      postData(page, insertData).then(data=>{
        setInitialData(prev=>{
          return [
            {
              idPegawai: data.data.idPegawai,
              nmPegawai: insertData.nmPegawai,
              alamat: insertData.alamat,
              noTelp: insertData.noTelp,
              jabatan: insertData.jabatan,
              email: insertData.email                
            },
            ...prev
          ]
        })
        setIsLoading(false)
        setTotalRow(prevData=>prevData + 1)
        makeNotif(data.isNotif, data.alertTitle, data.desc)
      })
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
      getBasedSearch(page, searchQuery, currentPage).then(data=>{
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
      <h3 className='text-center text-3xl font-semibold'>{page.toUpperCase().slice(0,1)+page.slice(1)}</h3>
      <div className='flex flex-col px-2 gap-3 md:px-5 md:flex-row md:gap-5'>
        { loginData.jabatan !== 'pegawai' && <section className='flex-1'>
          <AddItem
            page={page}
            field={fieldPegawai} 
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
            initialField={fieldPegawai} 
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
            initialField={fieldPegawai} 
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