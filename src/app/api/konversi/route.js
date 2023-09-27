import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function PUT (req) {
    const {idBarang, idBarangKonversi, stokKonversi} = await req.json()

    const firstBarang = await dbConnect('SELECT * FROM barang WHERE idBarang = ? ', [idBarang])
    const firstBarangStok = firstBarang[0].stok
    const firstBaranghargaSatuan = firstBarang[0].hargaSatuan
    const firstBarangNewStok = firstBarangStok - 1

    const secondBarang = await dbConnect('SELECT * FROM barang WHERE idBarang = ? ', [idBarangKonversi])
    const secondBarangStok = secondBarang[0].stok
    const secondBarangHargaSatuan = secondBarang[0].hargaSatuan
    const secondBarangNewStok = secondBarangStok + stokKonversi
    const secondBarangNewHargaSatuan = (firstBaranghargaSatuan + (secondBarangStok * secondBarangHargaSatuan)) / secondBarangNewStok

    if (firstBarangStok < 1) {
        return NextResponse.json({
            status: 401,
            message: `${firstBarang.namaBarang} tidak bisa dikonversi karna stok tidak ada`
        })
    } else {
        await dbConnect('UPDATE barang SET stok = ? where idBarang = ? ', [firstBarangNewStok, idBarang])
        await dbConnect('UPDATE barang SET stok = ?, hargaSatuan = ? where idBarang = ? ', [secondBarangNewStok, secondBarangNewHargaSatuan, idBarangKonversi])

        return NextResponse.json({
            status: 200,
            message: `${firstBarang[0].namaBarang} telah dikonversi`
        })
    }
}