import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = `SELECT barang.idBarang, barang.namaBarang, barang.stok, barang.modalBeli, barang.hargaJual, barang.satuan, kategori.nmKategori FROM barang INNER JOIN kategori ON barang.idKategori = kategori.idKategori ORDER BY barang.idBarang ASC LIMIT ${itemsPerPage} OFFSET ${offsed} `
        const data = await dbConnect(query);

        return NextResponse.json({
            data,
            status: 200
        })
    } catch (error) {
        console.log(error);
    }
}

export async function POST(req) {
    try {
        const { namaBarang, stok, modalBeli,hargaJual, satuan,idKategori } = await req.json()

        return NextResponse.json({
            namaBarang, stok, modalBeli,hargaJual, satuan,idKategori
        })
    } catch (error) {
        console.log(error);
    }
}

