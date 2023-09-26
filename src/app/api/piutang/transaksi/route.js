import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET (req) {
    const idKonsumen = new URL (req.url).searchParams.get('idKonsumen')
    try {
        const data = await dbConnect(`
            SELECT konsumen.idKonsumen, penjualan.noNota, penjualan.tglJual, barang.namaBarang, satuan.namaSatuan, penjualan_detail.idBarang, penjualan_detail.hargaJual, penjualan_detail.jumlah, penjualan_detail.total 
            FROM penjualan 
            INNER JOIN konsumen ON konsumen.idKonsumen = penjualan.idKonsumen
            INNER JOIN penjualan_detail ON penjualan_detail.noNota = penjualan.noNota 
            INNER JOIN barang ON barang.idBarang = penjualan_detail.idBarang
            INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
            WHERE penjualan.status = 'KREDIT' && konsumen.idKonsumen = ?`, [idKonsumen])
        
            if (data.length > 0) {
                return NextResponse.json({
                    status: 200,
                    data
                })
            } else {
                console.log('Data not found')
                return NextResponse.json({
                    status: 404
                })
            }
    } catch (error) {
        console.error('Ada kendala saat mengambil data : ', error)
        return NextResponse.json({
            status: 500
        })
    }
    
    
}