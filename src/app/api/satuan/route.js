import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = `SELECT idSatuan, namaSatuan, turunan FROM satuan ORDER BY dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed}`
        const data = await dbConnect(query);

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
    const { namaSatuan, turunan } = insertData
    
    try {
        const querySatuan = await dbConnect('SELECT idSatuan FROM satuan')
        const satuan = querySatuan.map(kat=>kat.idSatuan)
        const newID = satuan.length > 0 ? Math.max(...satuan) + 1 : 1

        if (!turunan) {
            await dbConnect(`INSERT INTO satuan ( idSatuan, namaSatuan, turunan ) VALUES (?, ?, ?)`, [newID, namaSatuan, namaSatuan])
        } else {
            await dbConnect(`INSERT INTO satuan ( idSatuan, namaSatuan, turunan ) VALUES (?, ?, ?)`, [newID, namaSatuan, turunan])
            
            const cekTurunan = await dbConnect('SELECT * FROM satuan WHERE namaSatuan = ?', [turunan])
            console.log(cekTurunan)

            if (cekTurunan.length < 1) {
                await dbConnect(`INSERT INTO satuan ( idSatuan, namaSatuan, turunan ) VALUES (?, ?, ?)`, [newID + 1, turunan, turunan])
            }
        }

        return NextResponse.json({
            status: 200,
            idSatuan: newID,
            message: "Data berhasil disimpan",
        })
    } catch (error) {
        console.log("Gagal menyimpan data", error)
        return NextResponse.json({
            status: 500,
            message: "Gagal menyimpan data"
        })
    }
}

export async function DELETE(req) {
    const { tempData } = await req.json()
    const { idSatuan } = tempData

    try {
        await dbConnect(`DELETE FROM satuan WHERE idSatuan = ?`, [idSatuan])
    
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
    const { idSatuan, namaSatuan } = tempData
    
    try {
        await dbConnect('UPDATE satuan SET namaSatuan = ? WHERE idSatuan = ?', [namaSatuan, idSatuan])

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