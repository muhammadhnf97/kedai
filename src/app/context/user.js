'use client'
import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext()
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [userCreated, setUserCreated] = useState([])

    const handleClickUserCreated = (idPegawai) => {
        setUserCreated(prevValue=>{
            return [
                ...prevValue, {
                    idPegawai: idPegawai,
                    status: 'active'
                }
            ]
        })
    }

    const handleClickInactiveUser = (idPegawai) => {
        setUserCreated(values=>values.filter(fil=>fil.idPegawai !== idPegawai))
    }

    useEffect(()=>{
        const cekAccount = async() => {
          try {
            const response = await fetch(`/api/pegawai/cekaccount`)
            const data = await response.json()
            setUserCreated(data.data)
          } catch (error) {
            console.error(error)
          }
        }
        cekAccount()
    }, [])
    return (
        <UserContext.Provider value={{ userCreated, handleClickUserCreated, handleClickInactiveUser }}>
            {children}
        </UserContext.Provider>
    )
} 