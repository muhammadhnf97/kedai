'use client'

import { createContext, useContext, useState } from "react";

export const NotificationContext = createContext()
export const useNotification = () => useContext(NotificationContext)

export const NotificationProvider = ({ children }) => {
    const [notif, setNotif] = useState({})

    const handleNotif = (showNotif = false, message = null) => {
        setNotif({ showNotif, message })
    }
    return (
        <NotificationContext.Provider value={{notif, handleNotif}}>
            {children}
        </NotificationContext.Provider>
    )
}