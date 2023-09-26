import dbConnect from "@/app/utils/dbConnect";
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { cookies } from "next/dist/client/components/headers";
import { NextResponse } from "next/server";

export async function POST (req) {
    const { user } = await req.json()
    const { email, password } = user

    try {
        const dataUser = await dbConnect(`SELECT userId, password, status FROM user WHERE email = ?`, [email])
        const isCorrect = await bcrypt.compare(password, dataUser[0].password)
        const UID = dataUser[0].userId
        const status = dataUser[0].status
    
        if(isCorrect && status === 'active'){
            //TOKEN
            const secretKey = 'iwannaberichman'
            const payload = {userId: UID}
            const token = jwt.sign(payload, secretKey, { expiresIn: '1d'})
    
            //CURRENT DATE DAN EXPIREDDATE
            const currentDate = new Date
            const oneDayFromNow = new Date(currentDate)
            oneDayFromNow.setDate(currentDate.getDate() + 1)
            const expiredDate = oneDayFromNow.toISOString()
            
            //NEW ID
            const totalSession = await dbConnect('SELECT sessionId FROM session')
            const SID = totalSession.map(values=>values.sessionId)
            const sessionId = SID.length > 0 ? Math.max(...SID) + 1 : 1
            
            const getUser = await dbConnect('SELECT user.userId, user.jabatan, pegawai.idPegawai, pegawai.nmPegawai, user.email FROM user INNER JOIN pegawai ON pegawai.idPegawai = user.idPegawai WHERE user.email = ?', [email])
            const jabatan = getUser[0].jabatan
            const idPegawai = getUser[0].idPegawai
            const nmPegawai = getUser[0].nmPegawai

            const cekSession = await dbConnect(`SELECT * FROM session WHERE userId = ?`, [UID])

            if (cekSession.length > 0) {
                await dbConnect('UPDATE session SET token = ?, dateCreated = ?, dateExpired = ? WHERE userId = ?', [token, currentDate, expiredDate, UID])

            } else {
                await dbConnect("INSERT INTO session (sessionId, userId, token, dateCreated, dateExpired) VALUES (?, ?, ?, ?, ?)", [sessionId, UID, token, currentDate, expiredDate])
        
            }

            const oneDay = 24 * 60 * 60 * 1000
            
            cookies().set('alreadyLogin', true, { expires: Date.now() + oneDay})
            cookies().set('email', email, { expires: Date.now() + oneDay})
            cookies().set('jabatan', jabatan, { expires: Date.now() + oneDay})
    
            return NextResponse.json({
                status: 200,
                data: {
                    sessionId,
                    userId: UID,
                    idPegawai,
                    nmPegawai,
                    jabatan,
                    token,
                    email,
                },
                message: "Login berhasil"
            })
        } else {
            return NextResponse.json({
                status: 401,
                message: "Email atau Password salah" 
            })
        }
        
    } catch (error) {
        return NextResponse.json({
            status: 500,
            message: 'Tidak dapat terhubung ke server. Ada kesalahan'
        })
    }

}