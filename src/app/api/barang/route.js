import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = 
        `SELECT barang.idBarang, barang.namaBarang, barang.stok, barang.modalBeli, barang.hargaJual, barang.idSatuan, satuan.namaSatuan, kategori.idKategori, kategori.nmKategori 
        FROM barang 
        INNER JOIN kategori ON barang.idKategori = kategori.idKategori 
        INNER JOIN satuan ON barang.idSatuan = satuan.idSatuan ORDER BY barang.dateCreated DESC LIMIT ${itemsPerPage} OFFSET ${offsed}`
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
    const { namaBarang, stok, modalBeli,hargaJual, idSatuan, idKategori } = insertData

    try {
        const lastIdQuery = `SELECT barang.idBarang FROM barang WHERE idKategori = ${parseInt(idKategori)}`
        const listOfID = await dbConnect(lastIdQuery)
        const sliceID = listOfID.map(dataID=>Number(dataID.idBarang.substr(7)))
        const maxID = sliceID.length > 0 ? Math.max(...sliceID) + 1 : 1
        const newID = '9999' + idKategori.toString().padStart(3, '0') + maxID.toString().padStart(3, '0') 

        const dateCreated = new Date 
        
        const listNamaKategori = await dbConnect(`SELECT nmKategori FROM kategori WHERE idKategori = ${idKategori}`)
        const nmKategori = listNamaKategori[0].nmKategori

        const listNamaSatuan = await dbConnect(`SELECT namaSatuan FROM satuan WHERE idSatuan = ${idSatuan}`)
        const namaSatuan = listNamaSatuan[0].namaSatuan

        await dbConnect(`INSERT INTO barang (idBarang, namaBarang, stok, modalBeli, hargaJual, idSatuan, idKategori, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [newID, namaBarang, stok, modalBeli,hargaJual, idSatuan, idKategori, dateCreated])

        const newTotalAset = hargaJual * stok

        return NextResponse.json({
            status: 200,
            idBarang: newID,
            nmKategori,
            namaSatuan,
            newTotalAset,
            message: "Data berhasil disimpan"
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
    const { idBarang } = tempData

    try {
        await dbConnect(`DELETE FROM barang WHERE idBarang = ?`, [idBarang])

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
    const {idBarang, namaBarang, stok, modalBeli, hargaJual, idSatuan, idKategori} = tempData
    
    try {
        const listNamaKategori = await dbConnect(`SELECT * FROM kategori WHERE idKategori = ?`, [idKategori])
        const nmKategori = listNamaKategori[0]?.nmKategori
        const listNamaSatuan = await dbConnect(`SELECT * FROM satuan WHERE idSatuan = ?`, [idSatuan])
        const namaSatuan = listNamaSatuan[0]?.namaSatuan
        const getBarang = await dbConnect(`SELECT barang.stok, barang.hargaJual FROM barang WHERE idBarang = ?`, [idBarang])

        const oldAsset = getBarang[0]?.stok * getBarang[0]?.hargaJual
        const newAsset = stok * hargaJual

        await dbConnect('UPDATE barang SET namaBarang = ?, stok = ?, modalBeli = ?, hargaJual = ?, idSatuan = ?, idKategori = ? WHERE idBarang = ?', [namaBarang, stok, modalBeli, hargaJual, idSatuan, idKategori, idBarang])

        return NextResponse.json({
            status: 200,
            message: "Data berhasil diubah",
            namaSatuan, nmKategori, oldAsset, newAsset
        })
    } catch (error) {
        console.error("Gagal mengupdate data", error)
        return NextResponse.json({
            status: 500,
            message: "Gagal mengupdate data"
        })
    }
}

