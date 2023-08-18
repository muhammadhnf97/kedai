import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = 
        `SELECT idPegawai, nmPegawai, alamat, noTelp, jabatan FROM pegawai ORDER BY dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed} `
        const data = await dbConnect(query);

        return NextResponse.json({
            status: 200,
            data,
            paggination: true,
            isLoading: false
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
        const { nmPegawai, noTelp, alamat, jabatan } = await req.json()

        const lastIdQuery = `SELECT idPegawai FROM pegawai`
        const listOfID = await dbConnect(lastIdQuery)
        const sliceID = listOfID.map(dataID=>Number(dataID.idPegawai.substr(4)))
        const maxID = sliceID.length > 0 ? Math.max(...sliceID) + 1 : 1
        const newID = 'PEG-' + maxID.toString().padStart(3, '0') 

        const dateCreated = new Date 

        const PostQuery = `INSERT INTO pegawai (idPegawai, nmPegawai, noTelp, alamat, jabatan, dateCreated) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [newID, nmPegawai, noTelp, alamat, jabatan, dateCreated]
        await dbConnect(PostQuery, values)

        return NextResponse.json({
            showNotif: true,
            alertTitle: 'info',
            desc: "Data berhasil disimpan",
            isLoading: false,
            data : {
                idPegawai: newID, nmPegawai, noTelp, alamat, jabatan
            }
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'info',
            desc: "Error saat menyimpan data",
            error
        })
    }
}

export async function DELETE(req) {
    try {
        const { idPegawai } = await req.json()
        const query = `DELETE FROM pegawai WHERE idPegawai = ?`
        const values = [idPegawai]
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
        const {idPegawai, nmPegawai, noTelp, alamat,  jabatan} = await req.json()
        const query = 'UPDATE pegawai SET nmPegawai = ?, noTelp = ?, alamat  = ?, jabatan = ?  WHERE idPegawai = ?'

        const values = [nmPegawai, noTelp, alamat, jabatan, idPegawai]
        await dbConnect(query, values)

        return NextResponse.json({
            data: 'success',
            showNotif: true,
            alertTitle: 'info',
            desc: "Data berhasil diubah",
            isLoading: false,
            data: { idPegawai, nmPegawai, noTelp, alamat }
            
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'info',
            desc: "error masbro",
            isLoading: false
        })
    }
}

