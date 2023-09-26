import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET () {
    const data = await dbConnect(`
    SELECT konsumen.idKonsumen, konsumen.nmKonsumen, penjualan.status
    FROM konsumen
    INNER JOIN penjualan ON penjualan.idKonsumen = konsumen.idKonsumen
    WHERE penjualan.status = 'KREDIT'`)

    if (data.length > 0) {
        return NextResponse.json({
            status: 200,
            data
        })
    } else {
        return NextResponse.json({
            status: 404,
        })
    }
    
}