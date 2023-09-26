import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET () {
    try {
        const query = 'SELECT barang.stok, barang.hargaJual FROM barang'
        const data = await dbConnect(query)

        const aset = data.map(prev=>{
            return {
                ...prev,
                total: prev.stok * prev.hargaJual
            }
        })

        const totalAset = aset.reduce((accumulator, currentValue)=>{
            return accumulator + currentValue.total
        }, 0)

        return NextResponse.json({
            status: 200,
            totalAset
        }) 
        
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            status: 500,
            message: 'Gagal mengambil data'
        }) 
    }
}