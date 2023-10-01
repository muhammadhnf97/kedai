import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST (req) {
    const { selectedLaporan, selectedTanggal, selectedStatus, manualDate  } = await req.json()

    const status = selectedStatus === '1' ? 'LUNAS' : 'KREDIT'
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, 0)
    const day = date.getDate().toString().padStart(2, 0)
    
    let query

    if (selectedLaporan === '1') {
        if (selectedTanggal === '1') {
            const currentDate = `${year}-${month}-${day}`
            query = `SELECT penjualan.noNota, penjualan.tglJual, barang.namaBarang, satuan.namaSatuan, penjualan_detail.hargaJual, penjualan_detail.jumlah, penjualan_detail.total, penjualan.status 
                FROM penjualan
                INNER JOIN penjualan_detail ON penjualan_detail.noNota = penjualan.noNota
                INNER JOIN barang ON barang.idBarang = penjualan_detail.idBarang
                INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
                WHERE penjualan.tglJual = '${currentDate}' && penjualan.status = '${status}'`
        } else if (selectedTanggal === '2') {
            query = `SELECT penjualan.noNota, penjualan.tglJual, barang.namaBarang, satuan.namaSatuan, penjualan_detail.hargaJual, penjualan_detail.jumlah, penjualan_detail.total, penjualan.status 
                FROM penjualan
                INNER JOIN penjualan_detail ON penjualan_detail.noNota = penjualan.noNota
                INNER JOIN barang ON barang.idBarang = penjualan_detail.idBarang
                INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
                WHERE STR_TO_DATE(tglJual, '%Y-%m-%d') >= DATE_SUB(NOW(), INTERVAL 7 DAY) && penjualan.status = '${status}'`
        } else if (selectedTanggal === '3') {
            query = `SELECT penjualan.noNota, penjualan.tglJual, barang.namaBarang, satuan.namaSatuan, penjualan_detail.hargaJual, penjualan_detail.jumlah, penjualan_detail.total, penjualan.status 
                FROM penjualan
                INNER JOIN penjualan_detail ON penjualan_detail.noNota = penjualan.noNota
                INNER JOIN barang ON barang.idBarang = penjualan_detail.idBarang
                INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
                WHERE MONTH(STR_TO_DATE(tglJual, '%Y-%m-%d')) = 09 AND penjualan.status = '${status}'`
        } else if (selectedTanggal === '4') {
            query = `SELECT penjualan.noNota, penjualan.tglJual, barang.namaBarang, satuan.namaSatuan, penjualan_detail.hargaJual, penjualan_detail.jumlah, penjualan_detail.total, penjualan.status 
                FROM penjualan
                INNER JOIN penjualan_detail ON penjualan_detail.noNota = penjualan.noNota
                INNER JOIN barang ON barang.idBarang = penjualan_detail.idBarang
                INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
                WHERE STR_TO_DATE(tglJual, '%Y-%m-%d') =  STR_TO_DATE('${manualDate}', '%Y-%m-%d') && penjualan.status = '${status}'`
        }
    } else {
        if (selectedTanggal === '1') {
            const currentDate = `${year}-${month}-${day}`
            query = `SELECT pembelian.noFaktur, pembelian.tglBeli, barang.namaBarang, satuan.namaSatuan, pembelian.jumlahBeli, pembelian.hargaBeli, pembelian.totalHarga, pembelian.status
            FROM pembelian
            INNER JOIN barang ON barang.idBarang = pembelian.idBarang
            INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
            WHERE pembelian.tglBeli = ${currentDate} && pembelian.status = '${status}'`
        } else if (selectedTanggal === '2') {
            query = `SELECT pembelian.noFaktur, pembelian.tglBeli, barang.namaBarang, satuan.namaSatuan, pembelian.jumlahBeli, pembelian.hargaBeli, pembelian.totalHarga, pembelian.status
            FROM pembelian
            INNER JOIN barang ON barang.idBarang = pembelian.idBarang
            INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
            WHERE STR_TO_DATE(tglBeli, '%Y-%m-%d') >= DATE_SUB(NOW(), INTERVAL 7 DAY) && pembelian.status = '${status}'`
        } else if (selectedTanggal === '3') {
            query = `SELECT pembelian.noFaktur, pembelian.tglBeli, barang.namaBarang, satuan.namaSatuan, pembelian.jumlahBeli, pembelian.hargaBeli, pembelian.totalHarga, pembelian.status
            FROM pembelian
            INNER JOIN barang ON barang.idBarang = pembelian.idBarang
            INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
            WHERE MONTH(STR_TO_DATE(tglBeli, '%Y-%m-%d')) = 09 AND pembelian.status = '${status}'`
        } else if (selectedTanggal === '4') {
            query = `SELECT pembelian.noFaktur, pembelian.tglBeli, barang.namaBarang, satuan.namaSatuan, pembelian.jumlahBeli, pembelian.hargaBeli, pembelian.totalHarga, pembelian.status
            FROM pembelian
            INNER JOIN barang ON barang.idBarang = pembelian.idBarang
            INNER JOIN satuan ON satuan.idSatuan = barang.idSatuan
            WHERE STR_TO_DATE(tglBeli, '%Y-%m-%d') =  STR_TO_DATE('${manualDate}', '%Y-%m-%d') && pembelian.status = '${status}'`
        }
    }

    try {
        const data = await dbConnect(query)

        if (data.length > 0) {
            return NextResponse.json({
                status: 200,
                data,
                message: "Berhasil memanggil laporan"
            })
        } else {
            return NextResponse.json({
                status: 404,
                data,
                message: "Data tidak ditemukan"
            })
        }

        
    } catch (error) {
        console.error('Terjadi kesalahan saat mencoba memanggil laporan')
        return NextResponse.json({
            selectedStatus: 500,
            data,
            message: "Terjadi kesalahan saat mencoba memanggil laporan"
        })
        
    }
}