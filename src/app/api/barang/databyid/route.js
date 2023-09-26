import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const id = new URL(req.url).searchParams.get("id")

    try {
        const data = await dbConnect(`SELECT barang.idBarang, barang.namaBarang, barang.stok, barang.hargaSatuan, barang.hargaJual, satuan.idSatuan, kategori.idKategori, satuan.namaSatuan, kategori.nmKategori 
        FROM barang 
        INNER JOIN kategori ON barang.idKategori = kategori.idKategori 
        INNER JOIN satuan ON barang.idSatuan = satuan.idSatuan 
        WHERE idBarang = ${id}`, [id])

        if(data.length > 0){
            return NextResponse.json({
                status : 200,
                data: data[0]
            })
        } else {
            return NextResponse.json({
                status : 404,
                message: "Barang tidak ditemukan"
            })
        }
    } catch (error) {
        console.error("Error while fetching satuan data:", error);
        return NextResponse.json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data kategori"
        });
    }
} 