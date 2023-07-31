import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET () {
    try {
        const query = "SELECT * FROM satuan"
        const data = await dbConnect(query)
        
        return NextResponse.json({
            data
        })
    } catch (error) {
        
    }
}