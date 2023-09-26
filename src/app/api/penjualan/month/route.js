import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET () {
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, 0)
    const day = (date.getDate()).toString().padStart(2, 0)

    const thisMonth = date.getMonth()+1

    try {
        const data = await dbConnect(`
            SELECT penjualan_detail.total, status FROM penjualan
            INNER JOIN penjualan_detail ON penjualan_detail.noNota = penjualan.noNota
            WHERE MONTH(STR_TO_DATE (tglJual, '%Y-%m-%d')) = ${thisMonth}
        `)

        
        const penjualanLunas = data.filter(value=>value.status === 'LUNAS')
        const penjualanKredit = data.filter(value=>value.status === 'KREDIT')

    
        if (data.length > 0) {
            const totalPenjualanLunasBulanan = penjualanLunas.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue.total
            }, 0)

            const totalPenjualanKreditBulanan = penjualanKredit.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue.total
            }, 0)
    
            return NextResponse.json({
                status: 200,
                totalPenjualanLunasBulanan,
                totalPenjualanKreditBulanan
            })
        } else {
            console.log('Data tidak ditemukan')
            return NextResponse.json({
                status: 404,
                newDate
            })
        }
    } catch (error) {
        console.error('Ada kesalahan saat mengambil penjualan hari ini : ', error)
        return NextResponse.json({
            status: 500
        })
    }    
}