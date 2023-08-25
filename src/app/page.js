'use client'
import { useEffect, useState } from "react"
import StickyNote from "./components/StickyNote"
import Table from "./components/Table"
import { fieldBarang } from "./utils/tableName"
import TableAset from "./components/TableAset"
import { useBarang } from "./context/barang"

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1)
  const [tableBarang, setTableBarang] = useState([])

  const { totalAset } = useBarang()

  useEffect(()=>{
    const getDataBarang = async() => {
      try {
        const response = await fetch(`/api/barang`)
        const data = await response.json()
        return data
      } catch (error) {
        console.log('error : ', error)
      }
    }

    getDataBarang().then(barang=>setTableBarang(barang.data))
  }, [])

  return (
    <>
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-between space-y-10">
      <section className="w-full flex flex-wrap flex-col items-center justify-center gap-2 md:gap-5 md:flex-row">
        <StickyNote desc={'Penjualan Januari'} nominal={10000000} baseColor={1} />
        <StickyNote desc={'Pembelian Januari'} nominal={9000000} baseColor={2} />
        <StickyNote desc={'Total Hutang'} nominal={10000000} baseColor={1} />
        <StickyNote desc={'Total Piutang'} nominal={9000000} baseColor={2} />
        <StickyNote desc={'Total Aset'} nominal={totalAset} baseColor={1} />
      </section>
      <section className="w-full px-2 md:px-5">
        <h4 className="font-semibold text-xl">Barang</h4>
        <Table field={fieldBarang} row={tableBarang} />
        <TableAset desc={'Total Aset'} nominal={totalAset} />
      </section>
    </div>
    </>
  )
}
