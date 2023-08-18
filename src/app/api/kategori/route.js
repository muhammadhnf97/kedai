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
            isLoading: false,
            paggination: true
        })
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: "Tidak bisa memanggil database",
            isLoading: false
        })
    }
}

export async function POST(req) {

    const queryKategori = await dbConnect('SELECT idKategori FROM kategori')
    const kategori = queryKategori.map(kat=>kat.idKategori)
    const newId = kategori.length > 0 ? Math.max(...kategori) + 1 : 1

    const { nmKategori } = await req.json()
   
    const query = `INSERT INTO kategori ( idKategori, nmKategori ) VALUES (?, ?)`
    const values = [newId, nmKategori]
    await dbConnect(query, values)

    return NextResponse.json({
        isLoading: false,
        status: 200,
        showNotif: true,
        alertTitle: 'info',
        desc: 'Data telah disimpan ke database',
        data : {
            idKategori : newId, nmKategori
        }
    })
}

export async function DELETE(req) {
    const { idKategori } = await req.json()
    try {
        const query = `DELETE FROM kategori WHERE idKategori = ?`
        const values = [idKategori]
        await dbConnect(query, values)
    
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'info',
            desc: "Data telah dihapus",
            isLoading: false
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'info',
            desc: "Gagal menghapus data",
            isLoading: false,
            error
        })
    }
}

export async function PUT(req){
    try {
        const {idKategori, nmKategori} = await req.json()
        const query = 'UPDATE kategori SET nmKategori = ? WHERE idKategori = ?'
        const values = [nmKategori, idKategori]
        await dbConnect(query, values)

        return NextResponse.json({
            data: 'success',
            showNotif: true,
            alertTitle: 'info',
            desc: "Data berhasil diubah",
            isLoading: false,
            data: { idKategori, nmKategori }
            
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'info',
            desc: "Error saat mengubah data",
            isLoading: false
        })
    }
}