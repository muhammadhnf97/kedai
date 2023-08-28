'use client'

import { createContext, useContext, useEffect, useState } from "react"

export const LoginContext = createContext()
export const useLogin = () => useContext(LoginContext)

export const LoginProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({
        isLogin: false,
        userId: '',
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
                isLogin: true,
                userId: storage.data.userId,
                sessionId: storage.data.sessionId,
                email: storage.data.email,
                nmPegawai: storage.data.nmPegawai,
                jabatan: storage.data.jabatan,
                token: storage.data.token
            })
        }
    }, [])

    const handleClickSaveLoginData = ( isLogin, userId, email, nmPegawai, jabatan, token ) => {
        setLoginData({
            isLogin, userId, email, nmPegawai, jabatan, token
        })
    }
    return (
        <LoginContext.Provider value={{ loginData, handleClickSaveLoginData }}>
            {children}
        </LoginContext.Provider>
    )
} 