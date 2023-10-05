import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST (req) {
    const { userId, entryPassword } = await req.json()
    const { oldPassword, newPassword} = entryPassword

    try {
        const data = await dbConnect(`SELECT email, password FROM user WHERE userId = '${userId}'`)
        const oldPasswordHashed = data[0].password
        
        if (data.length > 0) {
            // Check for the correct current password
            const checkTheOldPassword = await bcrypt.compare(oldPassword, oldPasswordHashed)
            
            if (checkTheOldPassword) {
                const saltRounds = 10;

                const hashPassword = await bcrypt.hash(newPassword, saltRounds)
                await dbConnect(`UPDATE user SET password = '${hashPassword}' WHERE userId = '${userId}'`)

                return NextResponse.json({
                    status: 200,
                    message: "Password berhasil diganti",
                    newPassword,
                    hashPassword,
                    oldPassword,
                    oldPasswordHashed
                })
            } else {
                return NextResponse.json({
                    status: 201,
                    message: "Password lama salah"
                })
            }
        } else {
            console.log("Gagal mendapatkan data user")
            return NextResponse.json({
                status: 404, 
                message: "Gagal mendapatkan data user"
            })
        }
        
    } catch (error) {
        console.error('Terjadi kesalahan saat mencoba mengambil data user', error)
        return NextResponse({
            status: 500,
            message: "Terjadi kesalahan saat mencoba mengambil data user"
        })
    }
}