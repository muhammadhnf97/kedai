'use client'
import React, { useEffect, useState } from 'react'
import AddItem from '../components/AddItem'
import Search from '../components/Search'
import TableWithAction from '../components/TableWithAction'
import Loading from '../components/Loading'
import Verification from '../components/Verification'
import EditForm from '../components/EditForm'
import TableWithoutAction from '../components/TableWithoutAction'
import { fieldKonsumen } from '../utils/tableName'
import { searchBy } from '../utils/searchutils'
import { useSearchParams } from 'next/navigation'
import { useLogin } from '../context/login'
import { getDataById, getTotalRow, updateData, getInitialData, deleteData, postData, getBasedSearch } from '../utils/fetchingdata'

const Home = () => {

    const { loginData } = useLogin()

    const page = 'konsumen'
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

    
    const handleChange = (e, action) => {
      const {name, value} = e.target
      if (action === 'edit'){
        setTempData(prev=>{
          return {
            ...prev,
            [name]: value
          }
        });
      } else if (action === 'search'){
        setSearchQuery(prev=>{
          return {
            ...prev,
            [name]: value
          }
        })
      } else if (action === 'add') {
        setInsertData(prev=>{
          return {
            ...prev,
            [name]: value
          }
        })
      }
    }

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

    const handleClickResponseNotif = async(res) => {
      makeNotif()
      if(res){
        if(isNotif.action === 'delete'){
          setIsLoading(true)
          deleteData(page, tempData).then(data=>{
            setInitialData(prevData=>prevData.filter(data=>data.idKonsumen !== Object.values(tempData)[0]))
            makeNotif(data.isNotif, data.alertTitle, data.desc)
            setIsLoading(false)
            setTotalRow(prevData=>prevData-1)
          })
          setTempData({})
        } else if(isNotif?.action === 'edit'){
          setShowEditForm(true)
          setIsShowDetai(false)
        }
      }
    }

    const handleSubmit = async(e, action) => {
      e.preventDefault()
      setIsLoading(true)
      if (action === 'edit') {
        updateData(page, tempData).then(data=>{
          setIsLoading(false)
          setShowEditForm(false)
          setIsShowDetai(false)
          makeNotif(data.isNotif, data.alertTitle, data.desc)
          setInitialData(prev=>{
            return prev.map(prevItem => {
                if(prevItem.idKonsumen === tempData.idKonsumen){
                    return {
                      idKonsumen: tempData?.idKonsumen,
                      nmKonsumen: tempData?.nmKonsumen,
                      alamat: tempData?.alamat,
                      noTelp: tempData?.noTelp
                    }
                } else {
                    return prevItem
                }
            })
          })
          setTempData({})
        })
      } else if (action === 'add') {
        if(insertData.nmKonsumen.length < 1 && insertData.alamat.length < 1 && insertData.noTelp.length < 1){
          setIsLoading(false)
          makeNotif(true, 'info', 'Data tidak boleh kosong')
          return
        }
  
        setIsLoading(true)
        postData(page, insertData).then(data=>{
          setInitialData(prev=>{
            return [
              {
                idKonsumen: data.data.idKonsumen,
                nmKonsumen: insertData.nmKonsumen,
                alamat: insertData.alamat,
                noTelp: insertData.noTelp             
              },
              ...prev
            ]
          })
          setIsLoading(false)
          setTotalRow(prevData=>prevData + 1)
          makeNotif(data.isNotif, data.alertTitle, data.desc)
        })
        setInsertData({
          nmKonsumen: '',
          alamat: '',
          noTelp: ''
        })
      }
    }

    const handleClickCloseEditForm = () => {
      setShowEditForm(false)
      setTempData({})
    }

    const [insertData, setInsertData] = useState({
        nmKonsumen: '',
        alamat: '',
        noTelp: ''
    })

    const handleClickEmptyInsert = () => {
      setInsertData({
        nmKonsumen: '',
        alamat: '',
        noTelp: ''
      })
    }

    const [searchQuery, setSearchQuery] = useState({
        keyword: ''
    })


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
      disable={isLoading}
      isLoading={isLoading}
      listField={fieldKonsumen}
      initalValue={tempData}
      handleSubmitEdit={handleSubmit}
      handleClickCloseEditForm={handleClickCloseEditForm}
      handleChange={handleChange}  /> }
    { isLoading && <Loading /> }
    {
      isNotif.showNotif &&
      <Verification 
        alertTitle={isNotif.alertTitle} 
        desc={isNotif.desc} 
        handleClickResponseNotif={handleClickResponseNotif} 
      />
    }
    <div className='max-w-7xl mx-auto space-y-5 mt-20 py-5'>
      <h3 className='text-center text-3xl font-semibold'>{page.toUpperCase().slice(0,1)+page.slice(1)}</h3>
      <div className='flex flex-col px-2 gap-3 md:px-5 md:flex-row md:gap-5'>
        { loginData.jabatan !== 'pegawai' && <section className='flex-1'>
          <AddItem
            page={page}
            disable={isLoading}
            isLoading={isLoading}
            field={fieldKonsumen}
            inputData={insertData} 
            handleChange={handleChange}
            handleSubmitInsert={handleSubmit}
            handleClickReset={handleClickEmptyInsert}
          />
        </section> }
        <section className='flex-1'>
          <Search 
            page={page}
            searchValue={searchQuery}
            searchUtils={searchBy}
            handleChange={handleChange}
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
            initialField={fieldKonsumen} 
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
            initialField={fieldKonsumen} 
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