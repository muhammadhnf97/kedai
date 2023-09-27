import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = `SELECT idKategori, nmKategori FROM kategori ORDER BY dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed}`
        const data = await dbConnect(query)

        return NextResponse.json({
            status: 200,
            data,
            paggination: true
        })
    } catch (error) {
        return NextResponse.json({
            status:500,
            message: "Gagal mengambil data dari database"
        })
    }
}

export async function POST(req) {
    const { insertData } = await req.json()
    const { nmKategori } = insertData

    try {
        const queryKategori = await dbConnect('SELECT idKategori FROM kategori')
        const kategori = queryKategori.map(kat=>kat.idKategori)
        const newID = kategori.length > 0 ? Math.max(...kategori) + 1 : 1
        
        await dbConnect(`INSERT INTO kategori ( idKategori, nmKategori ) VALUES (?, ?)`, [newID, nmKategori])
       
        return NextResponse.json({
            status: 200,
            idKategori: newID,
            message: "Data berhasil disimpan",
        })
    } catch (error) {
        console.error("Gagal menyimpan data", error)
        return NextResponse.json({
            status: 500,
            message: "Gagal menyimpan data"
        })
    }
}

export async function DELETE(req) {
    const { tempData } = await req.json()
    const { idKategori } = tempData
    try {
        await dbConnect(`DELETE FROM kategori WHERE idKategori = ?`, [idKategori])
    
        return NextResponse.json({
            status: 200,
            message: "Data telah dihapus"
        })
    } catch (error) {
        console.error("Gagal menghapus data", error)
        return NextResponse.json({
            status: 500,
            message: "Gagal menghapus data"
        })
    }
}

export async function PUT(req){
    const { tempData } = await req.json()
    const { idKategori, nmKategori } = tempData

    try {
        await dbConnect('UPDATE kategori SET nmKategori = ? WHERE idKategori = ?', [nmKategori, idKategori])

        return NextResponse.json({
            status: 200,
            message: "Berhasil mengubah data "
        })
    } catch (error) {
        console.error("Gagal mengupdate data", error)
        return NextResponse.json({
            status: 500,
            message: "Gagal mengupdate data"
        })
    }
}