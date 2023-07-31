import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET() {

    const query = "SELECT COUNT(*) FROM barang "
    const data = await dbConnect(query)
    const totalRow = data[0]["COUNT(*)"]

    return NextResponse.json({
        status: 200,
        totalRow
    })
}