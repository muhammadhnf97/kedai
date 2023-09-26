import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET () {
    try {
        const query = 'SELECT barang.stok, barang.hargaSatuan, barang.hargaJual FROM barang'
        const data = await dbConnect(query)

        const totalAset = data.map(prev=>{
            return {
                ...prev,
                profit: (prev.hargaJual - prev.hargaSatuan) * prev.stok
            }
        })

        const totalAsetBersih = totalAset.reduce((accumulator, currentValue)=>{
            return accumulator + currentValue.profit
        }, 0)
        
        return NextResponse.json({
            status: 200,
            totalAsetBersih
        }) 
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Gagal mengambil data'
        }) 
    }
}