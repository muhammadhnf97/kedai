'use client'
import StickyNote from "./components/StickyNote"
import { useBarang } from "./context/barang"
import { usePenjualan } from "./context/penjualan"

export default function Home() {
  const { totalAset } = useBarang()
  const { PenjualanLunas, PenjualanKredit, penjualanLunasBulanan, penjualanKreditBulanan } = usePenjualan()

  const harian = [
    {
      id: 1,
      title: 'Penjualan Hari ini',
      nominal: PenjualanLunas
    },
    {
      id: 2,
      title: 'Piutang',
      nominal: PenjualanKredit
    }
  ]

  const bulanan = [
    {
      id: 1,
      title: 'Penjualan Bulan ini',
      nominal: penjualanLunasBulanan
    },
    {
      id: 2,
      title: 'Piutang Bulan ini',
      nominal: penjualanKreditBulanan
    }
  ]

  const daftarBulan = ['januari','februari','maret','april','mei','juni','juli','agustus','september','oktober','november','desember',]

  const date = new Date()
  const month = date.getMonth()

  
  const monthName = daftarBulan.find((value, index)=>{
    if (index === month) {
      return value
    } 
  })


  return (
    <>
    <div className="max-w-7xl mx-auto flex flex-col items-center justify-between space-y-5 text-center">
      <section className="w-full">
        {
            <StickyNote
              title={'Total Aset'} 
              nominal={totalAset} 
              bg={'bg-red-200'} />
        }
      </section>
      <section className="w-full space-y-2">
        <p className="text-xl font-semibold">Data Harian</p>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {
            harian.map((noteData, index)=>(
              <StickyNote 
                key={noteData.id} 
                title={noteData.title} 
                nominal={noteData.nominal} 
                bg={index % 2 === 0 ? 'bg-orange-200' : 'bg-green-200'} />
            ))
          }
        </div>
      </section>
      <section className="w-full space-y-2">
        <p className="text-xl font-semibold">Data Bulan {monthName.toUpperCase().slice(0, 1) + monthName.slice(1)}</p>
        <div className="grid grid-cols-1 gap-7 md:grid-cols-2">
          {
            bulanan.map((noteData, index)=>(
              <StickyNote 
                key={noteData.id} 
                title={noteData.title} 
                nominal={noteData.nominal} 
                bg={index % 2 === 0 ? 'bg-blue-200' : 'bg-violet-200'} />
            ))
          }
        </div>
      </section>
    </div>
    </>
  )
}
