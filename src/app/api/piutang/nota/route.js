import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET (req) {
    const idKonsumen = new URL (req.url).searchParams.get('idKonsumen')
    try {
        const data = await dbConnect("SELECT noNota, tglJual FROM penjualan WHERE idKonsumen = ? && status = 'KREDIT' ", [idKonsumen])
        
        if (data.length > 0) {
            return NextResponse.json({
                status: 200,
                data
            })
        } else {
            return NextResponse.json({
                status: 404,
                data: []
            })
        }
    } catch (error) {
        console.error('Ada kesalahan pada backend : ', error)
        return NextResponse.json({
            status: 500
        })
    }
} 