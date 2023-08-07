import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = 
        `SELECT barang.idBarang, barang.namaBarang, barang.stok, barang.modalBeli, barang.hargaJual, satuan.namaSatuan, kategori.nmKategori 
        FROM barang 
        INNER JOIN kategori ON barang.idKategori = kategori.idKategori 
        INNER JOIN satuan ON barang.idSatuan = satuan.idSatuan ORDER BY barang.dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed} `
        const data = await dbConnect(query);

        return NextResponse.json({
            data,
            paggination: true
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'caution',
            desc: "error masbro",
        })
    }
}

export async function POST(req) {
    try {
        const { namaBarang, stok, modalBeli,hargaJual, idSatuan, idKategori } = await req.json()

        const lastIdQuery = `SELECT barang.idBarang FROM barang WHERE idKategori = ${parseInt(idKategori)}`
        const listOfID = await dbConnect(lastIdQuery)
        const sliceID = listOfID.map(dataID=>Number(dataID.idBarang.substr(7)))
        const maxID = sliceID.length > 0 ? Math.max(...sliceID) + 1 : 1
        const newID = '9999' + idKategori.toString().padStart(3, '0') + maxID.toString().padStart(3, '0') 

        const dateCreated = new Date 

        const queryNamaKategori = `SELECT nmKategori FROM kategori WHERE idKategori = ${idKategori}`
        const dataNama = await dbConnect(queryNamaKategori)
        const nmKategori = dataNama[0]

        const queryNamaSatuan = `SELECT namaSatuan FROM satuan WHERE idSatuan = ${idSatuan}`
        const dataNamaSatuan = await dbConnect(queryNamaSatuan)
        const namaSatuan = dataNamaSatuan[0]

        const PostQuery = `INSERT INTO barang (idBarang, namaBarang, stok, modalBeli, hargaJual, idSatuan, idKategori, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
        const values = [newID, namaBarang, stok, modalBeli,hargaJual, idSatuan, idKategori, dateCreated]
        await dbConnect(PostQuery, values)

        const newTotalAset = hargaJual * stok

        return NextResponse.json({
            showNotif: true,
            alertTitle: 'caution',
            desc: "Data berhasil disimpan",
            isLoading: false,
            input : {
                newID, 
                namaBarang, 
                stok, 
                modalBeli,
                hargaJual, 
                namaSatuan, 
                nmKategori,
                newTotalAset
            }
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'caution',
            desc: "error masbro",
        })
    }
}

export async function DELETE(req) {
    try {
        const { idBarang } = await req.json()
        const query = `DELETE FROM barang WHERE idBarang = ?`
        const values = [idBarang]
        await dbConnect(query, values)

        return NextResponse.json({
            showNotif: true,
            alertTitle: 'caution',
            desc: "Data telah dihapus",
            isLoading: false
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'caution',
            desc: "error masbro",
            isLoading: false
        })
        
    }
}

export async function PUT(req){
    try {
        const {idBarang, namaBarang, stok, modalBeli, hargaJual, idSatuan, idKategori} = await req.json()
        const query = 'UPDATE barang SET namaBarang = ?, stok = ?, modalBeli = ?, hargaJual = ?, idSatuan = ?, idKategori = ? WHERE idBarang = ?'
        const values = [idBarang, namaBarang, stok, modalBeli, hargaJual, idSatuan, idKategori]
        await dbConnect(query, values)

        return NextResponse.json({
            data: 'success'
        })
    } catch (error) {
        return NextResponse.json({
            showNotif: true,
            alertTitle: 'caution',
            desc: "error masbro",
            isLoading: false
        })
    }
}

