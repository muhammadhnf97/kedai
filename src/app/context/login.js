'use client'

import { createContext, useContext, useState } from "react"

export const LoginContext = createContext()
export const useLogin = () => useContext(LoginContext)

export const LoginProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({
        userId: 'id0012391823',
        nmPegawai: 'Hanif',
        status : 'Administrator',
        token: '32s1df8er12we5t7uy1g2m3kl5o3',
    })

    const handleClickSaveLoginData = () => {
        setLoginData({
            userId : '',
            nmPegawai : '',
            status : '',
            token : '',
        })
    }
    return (
        <LoginContext.Provider value={{loginData, handleClickSaveLoginData}}>
            {children}
        </LoginContext.Provider>
    )
} 