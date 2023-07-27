import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET () {
    try {
        const query = 'SELECT barang.stok, barang.hargaJual FROM barang'
        const data = await dbConnect(query)
        
        return NextResponse.json({
            data,
            status: 200
        }) 
    } catch (error) {
        
    }
}