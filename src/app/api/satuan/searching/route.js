import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const keyword = new URL(req.url).searchParams.get("keyword")
    const query = `SELECT idSatuan, namaSatuan FROM satuan WHERE idSatuan LIKE '%${keyword}%' OR namaSatuan LIKE '%${keyword}%' ORDER BY dateCreated`
    const data = await dbConnect(query)
    
    return NextResponse.json({
        data,
        paggination: false
    })
}
