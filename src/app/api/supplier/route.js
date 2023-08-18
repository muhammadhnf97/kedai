import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = 
        `SELECT idSupplier, nmSupplier, noTelp, alamat, penanggungJawab FROM supplier ORDER BY dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed} `
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
        const { nmSupplier, noTelp, alamat, penanggungJawab } = await req.json()

        const lastIdQuery = `SELECT idSupplier FROM supplier`
        const listOfID = await dbConnect(lastIdQuery)
        const sliceID = listOfID.map(dataID=>Number(dataID.idSupplier.substr(4)))
        const maxID = sliceID.length > 0 ? Math.max(...sliceID) + 1 : 1
        const newID = 'SUP-' + maxID.toString().padStart(3, '0') 

        const dateCreated = new Date 

        const PostQuery = `INSERT INTO supplier (idSupplier, nmSupplier, noTelp, alamat,  penanggungJawab, dateCreated) VALUES (?, ?, ?, ?, ?, ?)`
        const values = [newID, nmSupplier, noTelp, alamat, penanggungJawab, dateCreated]
        await dbConnect(PostQuery, values)

        return NextResponse.json({
            showNotif: true,
            alertTitle: 'info',
            desc: "Data berhasil disimpan",
            isLoading: false,
            data : {
                idSupplier: newID, nmSupplier, noTelp, alamat, penanggungJawab
            }
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'info',
            desc: "error masbro",
        })
    }
}

export async function DELETE(req) {
    try {
        const { idSupplier } = await req.json()
        const query = `DELETE FROM supplier WHERE idSupplier = ?`
        const values = [idSupplier]
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
            isLoading: false
        })
        
    }
}

export async function PUT(req){
    try {
        const {idSupplier, nmSupplier, noTelp, alamat,  penanggungJawab} = await req.json()
        const query = 'UPDATE supplier SET nmSupplier = ?, noTelp = ?, alamat  = ?, penanggungJawab = ? WHERE idSupplier = ?'

        const values = [nmSupplier, noTelp, alamat,  penanggungJawab, idSupplier]
        await dbConnect(query, values)

        return NextResponse.json({
            data: 'success',
            showNotif: true,
            alertTitle: 'info',
            desc: "Data berhasil diubah",
            isLoading: false,
            data: { idSupplier, nmSupplier, noTelp, alamat,  penanggungJawab }
            
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

