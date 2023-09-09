import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(){
    try {
        const query = "SELECT idSupplier, nmSupplier FROM supplier"
        const data = await dbConnect(query)

        return NextResponse.json({
            status: 200,
            data
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message : "Ada kesalahan"
        })
    }
}