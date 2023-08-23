import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET (req){
    try {
        const query = "SELECT idPegawai, status FROM user"
        const data = await dbConnect(query)
        
        return NextResponse.json({
            status: 'success',
            data
        })
    } catch (error) {
        return NextResponse.json({
            status: 'failed',
            isNotif: true,
            alertTitle: 'info',
            desc: "Ada kesalahan di backend"
        })
    }
} 