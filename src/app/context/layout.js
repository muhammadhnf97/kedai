'use client'

import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

export const LayoutContext = createContext()
export const useLayout = () => useContext(LayoutContext)

export const LayoutProvider = ({ children }) => {
    const pathname = usePathname()
    const [currentPathname, setCurrentPathname] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    
  useEffect(()=>{
    setCurrentPathname(pathname)
    setIsLoading(false)
  }, [pathname])
    
    return (
        <LayoutContext.Provider value={{ currentPathname, isLoading }}>
            {children}
        </LayoutContext.Provider>
    )
} 