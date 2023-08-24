import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const id = new URL(req.url).searchParams.get("id")

    try {
        const data = await dbConnect("SELECT idSupplier, nmSupplier, alamat, noTelp, penanggungJawab FROM supplier WHERE idSupplier = ?", [id])

        if(data.length > 0){
            return NextResponse.json({
                status : 200,
                data: data[0]
            })
        } else {
            return NextResponse.json({
                status : 404,
                message: "Supplier tidak ditemukan"
            })
        }
    } catch (error) {
        console.error("Error while fetching employee data:", error);
        return NextResponse.json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data Supplier"
        });
    }
} 