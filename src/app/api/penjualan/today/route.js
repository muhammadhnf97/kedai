import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET () {
    const date = new Date()
    const year = date.getFullYear().toString()
    const month = (date.getMonth() + 1).toString().padStart(2, 0)
    const day = (date.getDate()).toString().padStart(2, 0)

    const newDate = `${year}-${month}-${day}`

    try {
        const data = await dbConnect(`
            SELECT penjualan_detail.total, status FROM penjualan
            INNER JOIN penjualan_detail ON penjualan_detail.noNota = penjualan.noNota
            WHERE penjualan.tglJual = '${newDate}'
        `)

        const penjualanLunas = data.filter(value=>value.status === 'LUNAS')
        const penjualanKredit = data.filter(value=>value.status === 'KREDIT')
    
        if (data.length > 0) {
            const totalPenjualanLunas = penjualanLunas.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue.total
            }, 0)

            const totalPenjualanKredit = penjualanKredit.reduce((accumulator, currentValue)=>{
                return accumulator + currentValue.total
            }, 0)
    
            return NextResponse.json({
                status: 200,
                totalPenjualanLunas,
                totalPenjualanKredit
            })
        } else {
            console.log('Data penjualan hari ini tidak dapat didapatkan')
            return NextResponse.json({
                status: 404
            })
        }
    } catch (error) {
        console.error('Ada kesalahan saat mengambil penjualan hari ini : ', error)
        return NextResponse.json({
            status: 500
        })
    }    
}