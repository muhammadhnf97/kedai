import dbConnect from "@/app/utils/dbConnect";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { loginData } = await req.json()
    const cookieStore = cookies()

    try {
        if(cookieStore.get('alreadyLogin') && cookieStore.get('jabatan')){
            await dbConnect(`DELETE FROM session WHERE sessionId = ${loginData.sessionId}`)
            cookieStore.delete('alreadyLogin')
            cookieStore.delete('jabatan')
            cookieStore.delete('email')
            cookieStore.delete('sessionId')
            cookieStore.delete('token')
            
            return NextResponse.json({
                status: 200,
                loginData
            })
    
        }
    } catch (error) {
        console.error(error)
        return NextResponse.json({
            status: 500,
            message: "Proses terhenti karna ada kesalahan"
        })
        
    }
}