import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const keyword = new URL(req.url).searchParams.get("keyword")
    let query
    query = `SELECT idPegawai, nmPegawai, noTelp, alamat, jabatan, email FROM pegawai WHERE nmPegawai LIKE '%${keyword}%' OR idPegawai LIKE '%${keyword}%' ORDER BY dateCreated`
    const data = await dbConnect(query)
    
    return NextResponse.json({
        data,
        paggination: false
    })
}