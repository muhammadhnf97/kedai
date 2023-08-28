import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { loginData } = await req.json()
    const { sessionId } = loginData
    await dbConnect(`DELETE FROM session WHERE sessionId = ${sessionId}`)

    return NextResponse.json({
        status: 200,
        message: 'Telah logout'
    })
}