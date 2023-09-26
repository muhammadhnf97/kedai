'use client'

import { createContext, useContext, useState, useEffect } from "react"

export const BarangContext = createContext()
export const useBarang = () => useContext(BarangContext)

export default function BarangProvider({ children }) {
  const [totalAset, setTotalAset] = useState(0)
  const [totalAsetBersih, setTotalAsetBersih] = useState(0)

  const getTotalAsetBersih = async() => {
    try {
      const response = await fetch('/api/barang/totalasetbersih')
      const data = await response.json()
      if (data.status === 200) {
        setTotalAsetBersih(data.totalAsetBersih)
      } else {
        setTotalAsetBersih(0)
      }
    } catch (error) {
      console.error('Ada kesalahan saat mengambil Total Aset Bersih', error)
      setTotalAsetBersih(0)
    }
  }
  
  const getTotalAset = async() => {
      try {
          const response = await fetch(`/api/barang/totalaset`)
          const data = await response.json()
          if (data.status === 200) {
            setTotalAset(data.totalAset)
          } else {
            setTotalAset(0)
          }
      } catch (error) {
        console.error('Ada kesalahan saat mengambil Total Aset Bersih', error)
        setTotalAset(0)
      }
  }

    useEffect(()=>{
      getTotalAsetBersih()
      getTotalAset()
        
    }, [])


  return (
    <BarangContext.Provider value={{totalAset, getTotalAset, totalAsetBersih, getTotalAsetBersih}}>
      {children}
    </BarangContext.Provider>
  )
}