import dbConnect from "@/app/utils/dbConnect"
import { NextResponse } from "next/server"

export async function GET(req){
    const id = new URL(req.url).searchParams.get("id")

    try {
        const data = await dbConnect("SELECT idKonsumen, nmKonsumen, alamat, noTelp FROM konsumen WHERE idKonsumen = ?", [id])

        if(data.length > 0){
            return NextResponse.json({
                status : 200,
                data: data[0]
            })
        } else {
            return NextResponse.json({
                status : 404,
                message: "konsumen tidak ditemukan"
            })
        }
    } catch (error) {
        console.error("Error while fetching konsumen data:", error);
        return NextResponse.json({
            status: 500,
            message: "Terjadi kesalahan saat mengambil data konsumen"
        });
    }
} 