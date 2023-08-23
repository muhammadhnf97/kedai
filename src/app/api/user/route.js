import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";


export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = 
        `SELECT user.userId, pegawai.nmPegawai, user.idPegawai, user.email, user.jabatan, user.status FROM user
        INNER JOIN pegawai ON pegawai.idPegawai = user.idPegawai ORDER BY user.dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed} `
        const data = await dbConnect(query);

        return NextResponse.json({
            status: 200,
            data,
            paggination: true,
            isLoading: false
        })
    } catch (error) {
        return NextResponse.json({
            status:500,
            showNotif: true,
            alertTitle: 'info',
            desc: "Gagal menghubungkan ke database",
        })
    }
}