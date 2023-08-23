import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const id = new URL(req.url).searchParams.get("id")
    const query = "SELECT idKategori, nmKategori FROM kategori WHERE idKategori = ?"
    const values = [id]

    try {
        const data = await dbConnect(query, values)

        if(data){
            return NextResponse.json({
                status: 200,
                data
            })
        } else {
            return NextResponse.json({
                status: 500,
                isNotif: true,
                alertTitle: 'info',
                desc: 'Terjadi kesalahan'
            })
        }
        
    } catch (error) {  
        return NextResponse.json({
            status: 500,
            isNotif: true,
            alertTitle: 'info',
            desc: 'Terjadi kesalahan'
        })
        
    }
    
    
} 