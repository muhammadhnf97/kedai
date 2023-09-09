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
                console.log({
                    message: "Tidak bisa fetching data",
                    error
                })
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