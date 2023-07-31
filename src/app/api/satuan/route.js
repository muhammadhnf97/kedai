import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
    const page = new URL(req.url).searchParams.get("page") || 1
    const itemsPerPage = 10
    const offsed = (page - 1) * itemsPerPage

    try {
        const query = `SELECT * FROM satuan`
        const data = await dbConnect(query);
        const newData = data.map(prev=>{
            return {
                nama: prev.namaSatuan
            }
        })

        return NextResponse.json({
            newData,
            status: 200,
            page
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
        const { namaBarang, stok, modalBeli,hargaJual, satuan,idKategori } = await req.json()

        const lastIdQuery = `SELECT barang.idBarang FROM barang WHERE idKategori = ${parseInt(idKategori)}`
        const listOfID = await dbConnect(lastIdQuery)
        const sliceID = listOfID.map(dataID=>Number(dataID.idBarang.substr(7))) 
        const maxID = Math.max(...sliceID) + 1 || 1
        const newID = '9999'+idKategori.toString()+maxID.toString().padStart(3, '0') 

        const queryNamaKategori = `SELECT nmKategori FROM kategori WHERE idKategori = ${idKategori}`
        const dataNama = await dbConnect(queryNamaKategori)
        const nmKategori = dataNama[0]

        const PostQuery = `INSERT INTO barang (idBarang, namaBarang, stok, modalBeli, hargaJual, satuan, idKategori) VALUES (?, ?, ?, ?, ?, ?, ?)`
        const values = [newID, namaBarang, stok, modalBeli,hargaJual, satuan, idKategori]
        await dbConnect(PostQuery, values)

        const newTotalAset = hargaJual * stok

        return NextResponse.json({
            showNotif: true,
            alertTitle: 'caution',
            desc: "Data berhasil disimpan",
            input : {
                newID, 
                namaBarang, 
                stok, 
                modalBeli,
                hargaJual, 
                satuan, 
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

