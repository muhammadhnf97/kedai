import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req){
    const { sessionId } = await req.json()
    
    try {
        const data = await dbConnect(`SELECT session.sessionId, user.userId, user.jabatan, pegawai.nmPegawai FROM session INNER JOIN user ON user.userId = session.userId WHERE session.sessionId = ?`, [sessionId])
        
        if (data.length > 0) {
            return NextResponse.json({
                status: 200,
                data
            })
        } else {
            return NextResponse.json({
                status: 204,
                message: 'Tidak tidak ada'
            })
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            status :501 ,
            message:'Server Error'
        })
    }
    
}