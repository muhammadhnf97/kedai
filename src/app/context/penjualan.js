'use client'
import { createContext, useContext, useEffect, useState } from "react";

export const PenjualanContext = createContext()
export const usePenjualan = () => useContext(PenjualanContext)

export const PenjualanProvider = ({ children }) => {
    const [PenjualanLunas, setTotalPenjualanLunas] = useState(0)
    const [PenjualanKredit, setTotalPenjualanKredit] = useState(0)

    const [penjualanLunasBulanan, setPenjualanLunasBulanan] = useState(0)
    const [penjualanKreditBulanan, setPenjualanKreditBulanan] = useState(0)

    const getPenjualanToday = async() => {
        try {
            const response = await fetch('/api/penjualan/today')
            const data = await response.json()
            if (data.status === 200) {
                setTotalPenjualanLunas(data.totalPenjualanLunas)
                setTotalPenjualanKredit(data.totalPenjualanKredit)
            } else {
                setTotalPenjualanLunas(0)
                setTotalPenjualanKredit(0)
            }
        } catch (error) {
            console.error('Ada kesalahan saat mengambil penjualan hari ini')
            setTotalPenjualanLunas(0)
            setTotalPenjualanKredit(0)
        }
    }
    
    const getPenjualanBulanan = async() => {
        try {
            const response = await fetch('/api/penjualan/month')
            const data = await response.json()
            if (data.status === 200) {
                setPenjualanLunasBulanan(data.totalPenjualanLunasBulanan)
                setPenjualanKreditBulanan(data.totalPenjualanKreditBulanan)
            } else {
                setPenjualanLunasBulanan(0)
                setPenjualanKreditBulanan(0)
            }
        } catch (error) {
            console.error('Ada kesalahan saat mengambil penjualan hari ini')
            setPenjualanLunasBulanan(0)
            setPenjualanKreditBulanan(0)
        }
    }

    useEffect(()=>{
        getPenjualanToday()
        getPenjualanBulanan()
    }, [])

    return (
        <PenjualanContext.Provider value={{ PenjualanLunas, PenjualanKredit, penjualanLunasBulanan, penjualanKreditBulanan }}>
            {children}
        </PenjualanContext.Provider>
    )
}