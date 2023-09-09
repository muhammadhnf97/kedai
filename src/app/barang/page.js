'use client'
import React, { useEffect, useState } from 'react'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import AddItem from '../components/AddItem'
import EditForm from '../components/EditForm'
import Search from '../components/Search'
import TableWithAction from '../components/TableWithAction'
import TableWithoutAction from '../components/TableWithoutAction'
import TableAset from '../components/TableAset'
import { fieldBarang } from '../utils/tableName'
import { searchBarangBy } from '../utils/searchutils'
import { useSearchParams } from 'next/navigation'
import { useLogin } from '../context/login'
import { useKategori } from '../context/kategori'
import { useBarang } from '../context/barang'
import { getDataById, getTotalRow, updateData, getInitialData, deleteData, postData, getBasedSearch } from '../utils/fetchingdata'

const Home = () => {

    const { loginData } = useLogin()
    const { setListKategori } = useKategori()
    const { totalAset, handleIncreaseAsset, handleDecreaseAsset, handleUpdateAsset } = useBarang()

    const page = 'barang'
    const searchParam = useSearchParams().get('page')

    const [isLoading, setIsLoading] = useState(true)
    const [showPaggination, setShowPaggination] = useState(true)
    const [currentPage, setCurrentPage] = useState(searchParam || 1)
    const [initialData, setInitialData] = useState([])
    const [totalRow, setTotalRow] = useState(0)

    useEffect(()=>{
      getTotalRow(page).then(data=>setTotalRow(data))
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
      const desc = `${action.charAt(0).toUpperCase()}${action.slice(1)} data ${id} ${nama} ?`

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
            setInitialData(prevData=>prevData.filter(data=>data.idBarang !== Object.values(tempData)[0]))
            setIsLoading(false)
            setTotalRow(prevData=>prevData-1)
            setListKategori(prevData=>prevData.filter(data=>data.idBarang !== tempData.idBarang))
            makeNotif(data.isNotif, data.alertTitle, data.desc)
            handleDecreaseAsset(tempData.stok * tempData.hargaJual)
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
      if (action === 'edit'){
        updateData(page, tempData).then(data=>{
          setIsLoading(false)
          setShowEditForm(false)
          setIsShowDetai(false)
          makeNotif(data.isNotif, data.alertTitle, data.desc)
          handleUpdateAsset(data.data.oldAsset, data.data.newAsset)
          setInitialData(prev=>{
            return prev.map(prevItem => {
                if(prevItem.idBarang === tempData.idBarang){
                    return {
                      idBarang: tempData?.idBarang,
                      namaBarang: tempData?.namaBarang,
                      stok: tempData?.stok,
                      modalBeli: tempData?.modalBeli,
                      hargaJual: tempData?.hargaJual,
                      namaSatuan: data.data.namaSatuan,
                      nmKategori: data.data.nmKategori
                    }
                } else {
                    return prevItem
                }
            })
          })
          setTempData({})
        })
      } else if (action === 'add') {
        if(insertData.namaBarang.length < 1 && insertData.stok.length < 1 && insertData.modalBeli.length < 1 && insertData.hargaJual.length < 1 && insertData.idSatuan.length < 1 && insertData.idKategori.length < 1){
          setIsLoading(false)
          makeNotif(true, 'info', 'Data tidak boleh kosong')
          return
        }

        postData(page, insertData).then(data=>{
          setInitialData(prev=>{
            return [
              {
                idBarang: data.data.idBarang,
                namaBarang: insertData?.namaBarang,
                stok: insertData?.stok,
                modalBeli: insertData?.modalBeli,
                hargaJual: insertData?.hargaJual,
                namaSatuan: data.data.namaSatuan,
                nmKategori: data.data.nmKategori
              },
              ...prev
            ]
          })
          handleIncreaseAsset(data.data.newTotalAset)
          setIsLoading(false)
          setTotalRow(prevData=>prevData + 1)
          setListKategori(prevData=>{
            return [
              ...prevData, {
              idBarang: data.data.idBarang,
              namaBarang: insertData?.namaBarang,
              stok: insertData?.stok,
              modalBeli: insertData?.modalBeli,
              hargaJual: insertData?.hargaJual,
              idSatuan: insertData?.idSatuan,
              idKategori: insertData?.idKategori
            }]
          })
          makeNotif(data.isNotif, data.alertTitle, data.desc)
        })
        setInsertData({
          namaBarang: '',
          stok: '',
          modalBeli: '',
          hargaJual: '',
          idSatuan: '',
          idKategori: ''
        })
      }
    } 

    const handleClickCloseEditForm = () => {
      setShowEditForm(false)
      setTempData({})
    }

    const [insertData, setInsertData] = useState({
        namaBarang: '',
        stok: '',
        modalBeli: '',
        hargaJual: '',
        idSatuan: '',
        idKategori: ''
    })

    const handleClickEmptyInsert = () => {
      setInsertData({
        namaBarang: '',
        stok: '',
        modalBeli: '',
        hargaJual: '',
        idSatuan: '',
        idKategori: ''
      })
    }

    const [searchQuery, setSearchQuery] = useState({
      keyword: '',
      idKategori: ''
    })

    useEffect(()=>{  
      getBasedSearch(page, searchQuery, currentPage).then(data=>{
        setInitialData(data.data)
        setShowPaggination(data.paggination)
      })
    }, [searchQuery])

    const handleChangeResetQuery = () => {
      setSearchQuery({
        keyword: '',
        idKategori: ''
      })
    }   

    const [isShowDetail, setIsShowDetai] = useState(false)
    const [detailItem, setDetailItem] = useState({})

    const handleClickDetail = (item = null) => {
      item ? setDetailItem(item) : setDetailItem({})
        setIsShowDetai(prev=>!prev)
    }
    
  return (
    <>
    { showEditForm && 
    <EditForm
      page={page}
      disable={isLoading}
      listField={fieldBarang}
      initalValue={tempData}
      handleSubmitEdit={handleSubmit}
      handleClickCloseEditForm={handleClickCloseEditForm}
      handleChange={handleChange}  /> }
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
        { loginData.penanggungJawab !== 'kategori' && <section className='flex-1'>
          <AddItem
            page={page}
            disable={isLoading}
            field={fieldBarang} 
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
            searchUtils={searchBarangBy}
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
            initialField={fieldBarang} 
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
            initialField={fieldBarang} 
            initialData={initialData}
            totalRow={totalRow}
            currentPage={currentPage}
            showPaggination={showPaggination}
            handleClickCurrentPage={handleClickCurrentPage}
            handleClickActionFromTable={handleClickActionFromTable}
          />}
      </section>
      <section className='w-full px-2 md:px-5'>
        <TableAset
        desc={"Total Aset"}
        nominal={totalAset} />
      </section>
    </div>
    </>
  )
}

export default Home