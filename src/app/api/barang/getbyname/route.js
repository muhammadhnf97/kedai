import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const keyword = new URL(req.url).searchParams.get('keyword')
    try {
        const data = await dbConnect(`SELECT barang.idBarang, barang.namaBarang, barang.stok, satuan.namaSatuan, kategori.nmKategori FROM barang INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan INNER JOIN kategori ON kategori.idKategori = barang.idKategori WHERE idBarang LIKE '%${keyword}%' OR namaBarang LIKE '%${keyword}%'`)
        
        if(data.length > 0){
            return NextResponse.json({
                status : 200,
                data
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