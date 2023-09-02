'use client'
import React, { useEffect, useState } from 'react'
import Search from '../components/Search'
import Loading from '../components/Loading'
import Notification from '../components/Notification'
import { fieldUser } from '../utils/tableName'
import { searchBy } from '../utils/searchutils'
import { useSearchParams } from 'next/navigation'
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

    const [searchQuery, setSearchQuery] = useState({
        keyword: ''
    })

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
            handleChange={handleChange}
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