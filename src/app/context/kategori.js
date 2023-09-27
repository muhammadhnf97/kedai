import { createContext, useContext, useEffect, useState } from "react";

export const KategoriContext = createContext()
export const useKategori = () => useContext(KategoriContext)

export default function KategoriProvider({ children }){
    const [listKategori, setListKategori] = useState([])

    useEffect(()=>{
        const getKategori = async() => {
            try {
                const response = await fetch('/api/kategori/getall')
                const data = await response.json()
                return data.data
            } catch (error) {
                console.error('Gagal mengambil data kategori : ', error)
            }
        }
        

        getKategori().then(data=>setListKategori(data))
    }, [])

    return(
        <KategoriContext.Provider value={{listKategori, setListKategori}}>
            {children}
        </KategoriContext.Provider>
    )
}