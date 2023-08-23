import dbConnect from "@/app/utils/dbConnect";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req) {
    try {
        const { idPegawai } = await req.json() 

        const getPegawai = await dbConnect("SELECT idPegawai, email, jabatan FROM pegawai WHERE idPegawai = ? ", [idPegawai])
        const email = getPegawai[0].email
        const jabatan = getPegawai[0].jabatan
        const status = 'active'

        const cekUser = await dbConnect("SELECT * FROM user WHERE idPegawai = ? ", [idPegawai])
        
        if(cekUser.length < 1){
    
            const allUserID = await dbConnect("SELECT userId FROM user")
            const newUser = allUserID.map(value=>value.userId)
            
            //USER ID
            const newUserID = newUser.length > 0 ? Math.max(...newUser) + 1 : 1
    
            //DATE
            const getDate = new Date
    
            //PASSWORD
            const saltRounds = 10;
            const myPlaintextPassword = 'mypassword';
            const newPassword = await bcrypt.hash(myPlaintextPassword, saltRounds)
    
            //STATUS
    
            const values = [newUserID, email, newPassword, jabatan, idPegawai, status, getDate]
            await dbConnect('INSERT INTO user(userId, email, password, jabatan, idPegawai, status, dateCreated) VALUES (?, ?, ?, ?, ?, ?, ?)', 
            values)
            
            return NextResponse.json({
                status: 200,
                message: `User baru dengan ID ${idPegawai} telah dibuat`
            })
        } else {
            await dbConnect('UPDATE user SET status = ? WHERE idPegawai = ?', ['active', idPegawai])
            return NextResponse.json({
                status: 200,
                message: `User dengan ID ${idPegawai} sudah ada`
            })

        }

    } catch (error) {
        
    }

    

}