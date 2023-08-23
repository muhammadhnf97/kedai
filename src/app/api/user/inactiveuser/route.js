import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function PUT(req) {
    try {
        const { idPegawai } = await req.json()
        await dbConnect('UPDATE user SET status = ? WHERE idPegawai = ?', ['inactive', idPegawai])
        
        return NextResponse.json({
            status: 500,
            message: "User telah di nonaktifkan"
        })

    } catch (error) {
        console.error("Gagal mengupdate data", error)
        return NextResponse.json({
            status: 500,
            message: "Gagal mengupdate data"
        })
    }
}
