import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function PUT (req) {
    const {allNota} = await req.json()

    try {
        allNota.forEach( async (element) => {
            const { noNota } = element
            await dbConnect('UPDATE penjualan SET status = ? WHERE noNota = ? ', ['LUNAS', noNota])
        });

        return NextResponse.json({
            status: 200,
            message: 'Pembayaran telah dilunasi'
        })
    } catch (error) {
        console.error('Ada kesalahan saat mengirim data : ', error)
        return NextResponse.json({
            status: 500,
            message: 'Ada kesalahan saat mengirim data'
        })
    }

}