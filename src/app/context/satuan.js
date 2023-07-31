const { createContext, useContext, useState, useEffect } = require("react");

export const SatuanContext = createContext()
export const useSatuan = () => useContext(SatuanContext)

export const SatuanProvider = ({ children }) => {

    const [satuan, setSatuan] = useState([])

    useEffect(()=>{
        const getSatuan = async() => {
            const response = await fetch('/api/satuan/getall')
            const data = await response.json()
            return data.data
        }

        getSatuan().then(data=>setSatuan(data))
    }, [])

    return (
        <SatuanContext.Provider value={{ satuan }} >
            {children}
        </SatuanContext.Provider>
    )
}