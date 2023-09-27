import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = 
        `SELECT idPegawai, nmPegawai, alamat, noTelp, jabatan, email FROM pegawai ORDER BY dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed} `
        const data = await dbConnect(query);

        return NextResponse.json({
            status: 200,
            data,
            paggination: true
        })
    } catch (error) {
        return NextResponse.json({
            status:500,
            isNotif: true,
            alertTitle: 'info',
            desc: "Gagal menghubungkan ke database",
        })
    }
}

export async function POST(req) {
    try {
        const { insertData } = await req.json()
        const { nmPegawai, noTelp, alamat, jabatan, email } = insertData

        const lastIdQuery = `SELECT idPegawai FROM pegawai`
        const listOfID = await dbConnect(lastIdQuery)
        const sliceID = listOfID.map(dataID=>Number(dataID.idPegawai.substr(4)))
        const maxID = sliceID.length > 0 ? Math.max(...sliceID) + 1 : 1

        //NEW ID
        const newID = 'PEG-' + maxID.toString().padStart(3, '0') 

        //GET DATE
        const dateCreated = new Date 

        const PostQuery = `INSERT INTO pegawai (idPegawai, nmPegawai, noTelp, alamat, jabatan, email, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const values = [newID, nmPegawai, noTelp, alamat, jabatan, email, dateCreated]
        await dbConnect(PostQuery, values)

        return NextResponse.json({
            status: 200,
            idPegawai: newID,
            message: "Data berhasil disimpan",
        })
    } catch (error) {
        console.error("Gagal menyimpan data pegawai", error)
        return NextResponse.json({
            status: 500,
            message: "Gagal menyimpan data pegawai"
        })
    }
}

export async function DELETE(req) {
    try {
        const { tempData } = await req.json()
        const idPegawai = tempData.idPegawai
        await dbConnect(`DELETE FROM pegawai WHERE idPegawai = ?`, [idPegawai])

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
        const { idPegawai, nmPegawai, noTelp, alamat, jabatan, email  } = tempData
        const query = 'UPDATE pegawai SET nmPegawai = ?, noTelp = ?, alamat  = ?, jabatan = ?, email = ?  WHERE idPegawai = ?'
        const values = [nmPegawai, noTelp, alamat, jabatan, email, idPegawai]
        await dbConnect(query, values)

        return NextResponse.json({
            status: 200,
            message: "Berhasil mengubah data "
        })
    } catch (error) {
        console.error("Gagal mengupdate data pegawai", error)
        return NextResponse.json({
            status: 500,
            message: "Gagal mengupdate data pegawai"
        })
    }
}

