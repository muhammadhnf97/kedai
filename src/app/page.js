'use client'
import { useEffect, useState } from "react"
import StickyNote from "./components/StickyNote"
import Table from "./components/Table"
import { fieldTableBarang } from "./utils/tableName"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [tableBarang, setTableBarang] = useState([])

  useEffect(()=>{
    const getDataBarang = async() => {
      try {
        const response = await fetch(`/api/barang?page=${currentPage}`)
        const data = await response.json()
        return data
      } catch (error) {
        console.log(error)
      }
    }

    getDataBarang().then(barang=>setTableBarang(barang.data))

  }, [])

  return (
    <>
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-between space-y-10">
      <section className="w-full flex flex-col items-center justify-center gap-3 md:gap-10 md:flex-row">
        <StickyNote action={'Penjualan'} nominal={10000000} baseColor={1} />
        <StickyNote action={'Pembelian'} nominal={9000000} baseColor={2} />
      </section>
      <section className="w-full px-2 md:px-5">
        <h4 className="font-semibold text-xl">Barang</h4>
        <Table field={fieldTableBarang} row={tableBarang} />
      </section>
    </div>
    </>
  )
}
