import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const id = new URL(req.url).searchParams.get("id")
    
    const query = "SELECT idSupplier, nmSupplier, alamat, noTelp, penanggungJawab FROM supplier WHERE idSupplier = ?"
    const values = [id]

    const data = await dbConnect(query, values)
    
    return NextResponse.json({
        data
    })
} 