'use client'

import { createContext, useContext, useState } from "react"

export const LoginContext = createContext()
export const useLogin = () => useContext(LoginContext)

export const LoginProvider = ({ children }) => {
    const [loginData, setLoginData] = useState({
        userId: 'id0012391823',
        nmPegawai: 'Hanif',
        jabatan : 'administrator',
        token: '75483211a3sd13assgkjhasiudaskdjhaksd098123as2d162j1yte32f18reh31rh7w3e2r',
    })

    const handleClickSaveLoginData = () => {
        setLoginData({
            userId : '',
            nmPegawai : '',
            jabatan : '',
            token : '',
        })
    }
    return (
        <LoginContext.Provider value={{loginData, handleClickSaveLoginData}}>
            {children}
        </LoginContext.Provider>
    )
} 