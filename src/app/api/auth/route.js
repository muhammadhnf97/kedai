import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function POST (req) {

    const { email } = await req.json()
    
    try {
        const data = await dbConnect("SELECT session.sessionId, session.dateExpired, user.userId, user.email, user.jabatan FROM session INNER JOIN user ON user.userId = session.userId WHERE user.email = ?", [email])

        return NextResponse.json({
            status: 200, 
            data
        })
    } catch (error) {
        console.error('Terjadi kesalahan : ', error)
        return NextResponse.json({
            status: 404,
            message: "Gagal melakukan authentication"
        })
    }
}