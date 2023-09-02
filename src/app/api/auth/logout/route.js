import dbConnect from "@/app/utils/dbConnect";
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST(req) {
    const { loginData } = await req.json()
    const cookieStore = cookies()

    try {
        if(cookieStore.get('auth') && cookieStore.get('jabatan')){
            await dbConnect(`DELETE FROM session WHERE sessionId = ${loginData.sessionId}`)
            cookieStore.delete('auth')
            cookieStore.delete('jabatan')
            cookieStore.delete('userId')
            cookieStore.delete('sessionId')
            
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
    

    // try {
    //     if(cookiesStorage.has('auth') && cookiesStorage.has('jabatan')){
    //         await dbConnect(`DELETE FROM session WHERE sessionId = ${sessionId}`)
    //         cookiesStorage.delete('auth')
    //         cookiesStorage.delete('jabatan')

    //         return NextResponse.json({
    //             status: 200,
    //             message: 'Telah logout'
    //         })
    //     } else {
    //         return NextResponse.json({
    //             status: 401,
    //             message: 'Gagal logout'
    //         })
    //     }
    // } catch (error) {
    //     return NextResponse.json({
    //         status: 500,
    //         message: "Gagal terhubung ke server"
    //     })
    // }

}