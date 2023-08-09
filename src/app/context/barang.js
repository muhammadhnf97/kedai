'use client'

import { createContext, useContext, useState, useEffect } from "react"

export const BarangContext = createContext()
export const useBarang = () => useContext(BarangContext)

export default function BarangProvider({ children }) {
  const [totalAset, setTotalAset] = useState(0)

    useEffect(()=>{
        const fetchStokDanHargaJual = async() => {
            try {
                const response = await fetch(`/api/barang/totalaset`)
                const data = await response.json()
                
                const total = data.data.map(prev=>{
                    return {
                        ...prev,
                        aset : prev.stok * prev.hargaJual
                    } 
                })

                const totalAset = total.reduce((total, obj)=> total + obj.aset, 0)

                return totalAset
            } catch (error) {
                return {
                    message: "Ada Kelasahanan",
                    error
                }
            }
        }

        fetchStokDanHargaJual().then(data=>setTotalAset(data))
    }, [])

    const handleTotalAset = (newAsset) => {
      setTotalAset(prev=> prev + newAsset)
    }

    const handleDeleteTotalAset = (newAsset) => {
      setTotalAset(prev=> prev - newAsset )
    }

    const handleUpdateTotalAsset = (oldAsset, newAsset) => {
      setTotalAset(prev=>prev - oldAsset + newAsset)
    }

  return (
    <BarangContext.Provider value={{totalAset, handleTotalAset, handleDeleteTotalAset, handleUpdateTotalAsset}}>
      {children}
    </BarangContext.Provider>
  )
}