import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function POST (req) {
    const {idPegawai, idKonsumen, status, listTempBarang} = await req.json()

    const date = new Date()
    const getYear = date.getFullYear().toString()
    const getMonth = (date.getMonth() + 1).toString().padStart(2, 0)
    const getDay = date.getDate().toString().padStart(2, 0)

    const tglJual = `${getYear}-${getMonth}-${getDay}`

    try {

        const allPenjualan = await dbConnect('SELECT noNota FROM penjualan WHERE tglJual = ?', [tglJual])
        const allNota = allPenjualan.map(data=>Number(data.noNota.toString().substring(8)))
        const maxNota =( allNota.length > 0 ? (Math.max(...allNota) + 1) : 1).toString().padStart(3, 0)
        const noNota = getYear+getMonth+getDay+maxNota.toString().padStart(0, 3)

        await dbConnect('INSERT INTO penjualan (noNota, tglJual, idPegawai, idKonsumen, status) VALUES (?, ?, ?, ?, ?)', [noNota, tglJual, idPegawai, idKonsumen, status])

        listTempBarang.forEach(async (element) => {
            const {idBarang, stok,  hargaJual, jumlah, total} = element

            const newStok = stok - jumlah

            await dbConnect('INSERT INTO penjualan_detail (noNota, idBarang, hargaJual, jumlah, total) VALUES (?, ?, ?, ?, ?)', [noNota, idBarang, hargaJual, jumlah, total])
            await dbConnect('UPDATE barang SET stok = ? WHERE idBarang = ?', [newStok, idBarang])
        });


        return NextResponse.json({
            status: 200, 
            message: "Penjualan telah disimpan",
            listTempBarang
        })
    } catch (error) {
        console.error('Ada kesalahan saat mengirim data :', error)
        return NextResponse.json({
            status: 500,
            message: "Gagal mengirim data"
        })
    }
    

}