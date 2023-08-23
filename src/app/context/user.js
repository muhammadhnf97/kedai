'use client'
import { createContext, useContext, useState, useEffect } from "react";

export const UserContext = createContext()
export const useUser = () => useContext(UserContext)

export const UserProvider = ({ children }) => {
    const [userCreated, setUserCreated] = useState([])

    const handleClickUserCreated = (idPegawai, status) => {
        setUserCreated(prevValue=>{
            return [
                ...prevValue, {
                    idPegawai: idPegawai,
                    status: status
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
            console.log(error)
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