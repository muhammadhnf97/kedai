import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const query = "SELECT * FROM kategori"
        const data = await dbConnect(query)

        return NextResponse.json({
            status: 200,
            data
        })
    } catch (error) {
        return NextResponse.json({
            status: 200,
            message : "Ada kesalahan"
        })
    }
}