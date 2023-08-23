import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const keyword = new URL(req.url).searchParams.get("keyword")
    let query
    query = `SELECT user.userId, pegawai.nmPegawai, user.idPegawai, user.email, user.jabatan, user.status FROM user
    INNER JOIN pegawai ON pegawai.idPegawai = user.idPegawai
    WHERE pegawai.nmPegawai LIKE '%${keyword}%' OR user.email LIKE '%${keyword}%' 
    ORDER BY user.userId DESC`
    const data = await dbConnect(query)
    
    return NextResponse.json({
        data,
        paggination: false
    })
}