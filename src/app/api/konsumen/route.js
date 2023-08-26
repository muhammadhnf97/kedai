import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = 
        `SELECT idKonsumen, nmKonsumen, noTelp, alamat FROM konsumen ORDER BY dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed} `
        const data = await dbConnect(query);

        return NextResponse.json({
            status: 200,
            data,
            paggination: true
        })
    } catch (error) {
        return NextResponse.json({
            status:500,
            showNotif: true,
            alertTitle: 'info',
            desc: "Gagal menghubungkan ke database",
        })
    }
}

export async function POST(req) {
    try {
        const { insertData } = await req.json()
        const { nmKonsumen, noTelp, alamat } = insertData

        const lastIdQuery = `SELECT idKonsumen FROM konsumen`
        const listOfID = await dbConnect(lastIdQuery)
        const sliceID = listOfID.map(dataID=>Number(dataID.idKonsumen.substr(4)))
        const maxID = sliceID.length > 0 ? Math.max(...sliceID) + 1 : 1
        const newID = 'CUS-' + maxID.toString().padStart(3, '0') 

        const dateCreated = new Date 

        const PostQuery = `INSERT INTO konsumen (idKonsumen, nmKonsumen, noTelp, alamat, dateCreated) VALUES (?, ?, ?, ?, ?)`
        const values = [newID, nmKonsumen, noTelp, alamat, dateCreated]
        await dbConnect(PostQuery, values)

        return NextResponse.json({
            status: 200,
            idKonsumen: newID,
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
    try {
        const { tempData } = await req.json()
        const { idKonsumen } = tempData
        await dbConnect(`DELETE FROM konsumen WHERE idKonsumen = ?`, [idKonsumen])

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
    try {
        const { tempData } = await req.json()
        const { idKonsumen, nmKonsumen, noTelp, alamat } = tempData
        const query = 'UPDATE konsumen SET nmKonsumen = ?, noTelp = ?, alamat  = ? WHERE idKonsumen = ?'

        const values = [nmKonsumen, noTelp, alamat, idKonsumen]
        await dbConnect(query, values)

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

