import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const keyword = new URL(req.url).searchParams.get("keyword")
    const id = new URL(req.url).searchParams.get("id")
    let query
    if(keyword && !id){
        query = `SELECT idKategori, nmKategori FROM kategori WHERE idKategori LIKE '%${keyword}%' OR nmKategori LIKE '%${keyword}%' ORDER BY dateCreated`
    } else if(!keyword && id){
        query = `SELECT idKategori, nmKategori FROM kategori WHERE idKategori = ${id}`
    }
    const data = await dbConnect(query)
    
    return NextResponse.json({
        data,
        paggination: false
    })
}


// OR idKategori LIKE '%${kategori}%'