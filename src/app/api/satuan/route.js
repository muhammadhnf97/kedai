import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = `SELECT idSatuan, namaSatuan FROM satuan ORDER BY dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed}`
        const data = await dbConnect(query);

        return NextResponse.json({
            data,
            status: 200,
            paggination: true
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'caution',
            desc: "Error saat mengambil data dari database",
        })
    }
}

export async function POST(req) {

    const querySatuan = await dbConnect('SELECT idSatuan FROM satuan')
    const satuan = querySatuan.map(kat=>kat.idSatuan)
    const newId = satuan.length > 0 ? Math.max(...satuan) + 1 : 1

    const { namaSatuan } = await req.json()
   
    const query = `INSERT INTO satuan ( idSatuan, namaSatuan ) VALUES (?, ?)`
    const values = [newId, namaSatuan]
    await dbConnect(query, values)

    return NextResponse.json({
        isLoading: false,
        status: 200,
        showNotif: true,
        alertTitle: 'info',
        desc: 'Data telah disimpan ke database',
        data : {
            idSatuan : newId, namaSatuan
        }
    })
}

export async function DELETE(req) {
    const { idSatuan } = await req.json()
    try {
        const query = `DELETE FROM satuan WHERE idSatuan = ?`
        const values = [idSatuan]
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
        const {idSatuan, namaSatuan} = await req.json()
        const query = 'UPDATE satuan SET namaSatuan = ? WHERE idSatuan = ?'
        const values = [namaSatuan, idSatuan]
        await dbConnect(query, values)

        return NextResponse.json({
            data: 'success',
            showNotif: true,
            alertTitle: 'info',
            desc: "Data berhasil diubah",
            isLoading: false,
            data: { idSatuan, namaSatuan }
            
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