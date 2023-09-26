import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET (req) {
    const supplier = new URL(req.url).searchParams.get('supplier') || null
    const noFaktur = new URL(req.url).searchParams.get('nofaktur') || null
    const status = 'KREDIT'
    try {
        let data
        if (supplier && !noFaktur) {
            data = await dbConnect('SELECT noFaktur FROM pembelian WHERE idSupplier = ? AND status = ?', [supplier, status])
        } else if (supplier && noFaktur) {
            data = await dbConnect('SELECT pembelian.idPembelian, pembelian.tglBeli, barang.namaBarang, pembelian.jumlahBeli, pembelian.hargaBeli, pembelian.totalHarga, pembelian.status FROM pembelian INNER JOIN barang ON barang.idBarang = pembelian.idBarang WHERE pembelian.idSupplier = ? AND pembelian.noFaktur = ? AND pembelian.status = ?', [supplier, noFaktur, status])
        }

        if (data.length > 0) {
            return NextResponse.json({
                status: 200,
                data
            })
        } else {
            return NextResponse.json({
                status: 401,
                data: [],
                message: 'Data tidak ditemukan'
            })
        }
    } catch (error) {
        console.error('Ada kesalahan : ', error)
    }
}

export async function POST (req){
    const { insertValue } = await req.json()

    const date = new Date();
    const year = date.getFullYear().toString();
    const month = date.getMonth().toString().padStart(2, 0)
    const day = date.getDate().toString().padStart(2, 0);

    const tglBeli = `${year}-${month}-${day}`
    
    const getPembelian = await dbConnect("SELECT idPembelian, tglBeli FROM pembelian")
    const getTglBeli = getPembelian.filter(data=>data.tglBeli === tglBeli)

    try {
        insertValue.forEach(async(data, index)=>{
            const {idPegawai, idSupplier, noFaktur, idBarang, jumlahBeli, hargaBeli, totalBayar, status} = data
            let statusLunas

            if (status) {
                statusLunas = 'LUNAS'
            } else {
                statusLunas= 'KREDIT'
            }

            const beli = getTglBeli.map(data=>Number(data.idPembelian.toString().substring(10)))
            const getMax = beli.length > 0 ? Math.max(...beli) + 1 + index : 1 + index
        
            
            //ID PEMBELIAN
            const idPembelian = 'BL'+year+month+day+getMax.toString().padStart(3,0)
            
            //SIMPAN DATA KE KE BARANG
            const barang = await dbConnect('SELECT * FROM barang WHERE idBarang = ?', [idBarang])
            const newStok = Number(barang[0].stok) + Number(jumlahBeli)
            const hargaSatuan = ((Number(barang[0].stok) * Number(barang[0].modalBeli)) + (jumlahBeli * hargaBeli)) / newStok 

            await dbConnect('UPDATE barang SET stok = ?, modalBeli = ? WHERE idBarang = ?', [newStok, hargaSatuan, idBarang])
            
            //MASUKAN KEDALAM TABEL PEMBELIAN
            const values = [idPembelian, tglBeli, idSupplier, idPegawai, idBarang, jumlahBeli, hargaBeli, totalBayar, noFaktur, statusLunas]
            await dbConnect("INSERT INTO pembelian (idPembelian, tglBeli, idSupplier, idPegawai, idBarang, jumlahBeli, hargaBeli, totalHarga, noFaktur, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", values)
        })
        return NextResponse.json({
            status: 200,
            getTglBeli,
            message: 'Data telah pembelian telah disimpan'
        })
        

    } catch (error) {
        console.error('Ada kesalahan : ', error)
        return NextResponse.json({
            status: 500,
            message: 'Ada kesalahan saat menyimpan'
        })
    }
}

export async function PUT(req) {
    const { pembelian } = await req.json()

    try {
        pembelian.forEach(async(data) => {
            const { idPembelian, status } = data
            const newStatus = 'LUNAS' 

            await dbConnect('UPDATE pembelian SET status = ? WHERE idPembelian = ?', [newStatus, idPembelian])

        })
        
        return NextResponse.json({
            status: 200,
            message: 'Pembayaran telah dilunasi'
        })
    } catch (error) {
        console.error('Ada kesalahan : ', error)
        return NextResponse.json({
            status: 500,
            message: 'kesalahan di BE'
        })
    }
    // return NextResponse.json({
    //     pembelian
    // })
}