import { createContext, useContext, useEffect, useState } from "react";

export const SupplierContext = createContext()
export const useSupplier = () => useContext(SupplierContext)

export default function SupplierProvider({ children }){
    const [listSupplier, setListSupplier] = useState([])

    useEffect(()=>{
        const getSupplier = async() => {
            try {
                const response = await fetch('/api/supplier/getall')
                const data = await response.json()
                return data.data
            } catch (error) {
                console.error('Gagal mengambil data supplier', error)
            }
        }
        

        getSupplier().then(data=>setListSupplier(data))
    }, [])

    return(
        <SupplierContext.Provider value={{listSupplier, setListSupplier}}>
            {children}
        </SupplierContext.Provider>
    )
}