import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const keyword = new URL(req.url).searchParams.get("keyword")
    const id = new URL(req.url).searchParams.get("id")
    let query
    query = `SELECT idSupplier, nmSupplier, noTelp, alamat, penanggungJawab FROM supplier WHERE nmSupplier LIKE '%${keyword}%' OR idSupplier LIKE '%${keyword}%' ORDER BY dateCreated`
    const data = await dbConnect(query)
    
    return NextResponse.json({
        data,
        paggination: false
    })
}