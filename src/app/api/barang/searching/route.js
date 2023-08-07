import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const keyword = new URL(req.url).searchParams.get("keyword")
    const kategori = new URL(req.url).searchParams.get("kategori")
    const id = new URL(req.url).searchParams.get("id")

    let query 

    if(keyword && !kategori) {
        query = `SELECT barang.idBarang, barang.namaBarang, barang.stok, barang.modalBeli, barang.hargaJual, satuan.namaSatuan, kategori.nmKategori 
        FROM barang 
        INNER JOIN kategori ON barang.idKategori = kategori.idKategori 
        INNER JOIN satuan ON barang.idSatuan = satuan.idSatuan 
        WHERE namaBarang LIKE '%${keyword}%' OR idBarang LIKE '%${keyword}%' 
        ORDER BY barang.idBarang DESC`
    } else if(!keyword && kategori){
        query = `SELECT barang.idBarang, barang.namaBarang, barang.stok, barang.modalBeli, barang.hargaJual, satuan.namaSatuan, kategori.nmKategori 
        FROM barang 
        INNER JOIN kategori ON barang.idKategori = kategori.idKategori 
        INNER JOIN satuan ON barang.idSatuan = satuan.idSatuan 
        WHERE barang.idKategori = ${kategori} 
        ORDER BY barang.idBarang DESC`
    } else if(keyword && kategori){
        query = `SELECT barang.idBarang, barang.namaBarang, barang.stok, barang.modalBeli, barang.hargaJual, satuan.namaSatuan, kategori.nmKategori 
        FROM barang 
        INNER JOIN kategori ON barang.idKategori = kategori.idKategori 
        INNER JOIN satuan ON barang.idSatuan = satuan.idSatuan 
        WHERE namaBarang LIKE '%${keyword}%' OR idBarang LIKE '%${keyword}%' AND barang.idKategori = ${kategori}
        ORDER BY barang.idBarang DESC`
    } else if(id){
        query = `SELECT barang.idBarang, barang.namaBarang, barang.stok, barang.modalBeli, barang.hargaJual, satuan.idSatuan, kategori.idKategori 
        FROM barang 
        INNER JOIN kategori ON barang.idKategori = kategori.idKategori 
        INNER JOIN satuan ON barang.idSatuan = satuan.idSatuan 
        WHERE idBarang = ${id}`
    }
    const data = await dbConnect(query)
    
    return NextResponse.json({
        data,
        paggination: false
    })
}


// OR idKategori LIKE '%${kategori}%'