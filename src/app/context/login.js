'use client'

import { createContext, useContext, useEffect, useState } from "react"

export const LoginContext = createContext()
export const useLogin = () => useContext(LoginContext)

export const LoginProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({
        userId: '',
        idPegawai: '',
        sessionId: '',
        email: '',
        nmPegawai: '',
        jabatan : '',
        token: '',
    })

    
    useEffect(()=>{
        const cekLocalStorage = localStorage.getItem('auth')
        if ( cekLocalStorage ) {
            const storage = JSON.parse(cekLocalStorage)

            setLoginData({
                userId: storage?.userId,
                sessionId: storage?.sessionId,
                idPegawai: storage?.idPegawai,
                email: storage?.email,
                nmPegawai: storage?.nmPegawai,
                jabatan: storage?.jabatan,
                token: storage?.token
            })
        }
    }, [])

    const handleClickSaveLoginData = ( userId, sessionId, email, nmPegawai, jabatan, token, idPegawai ) => {
        setLoginData({
            userId, sessionId, email, nmPegawai, jabatan, token, idPegawai
        })
    }
    return (
        <LoginContext.Provider value={{ loginData, handleClickSaveLoginData }}>
            {children}
        </LoginContext.Provider>
    )
} 