import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET () {
    const data = await dbConnect('SELECT idKonsumen, nmKonsumen FROM konsumen')

    if (data.length > 0) {
        return NextResponse.json({
            status: 200,
            data
        })
    } else {
        return NextResponse.json({
            status: 404,
        })
    }
    
}