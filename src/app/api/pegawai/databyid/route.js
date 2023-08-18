import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const id = new URL(req.url).searchParams.get("id")
    
    const query = "SELECT idPegawai, nmPegawai, alamat, noTelp, jabatan FROM pegawai WHERE idPegawai = ?"
    const values = [id]

    const data = await dbConnect(query, values)
    
    return NextResponse.json({
        data
    })
} 