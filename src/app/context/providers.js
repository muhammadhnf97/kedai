'use client'
import React from 'react'
import BarangProvider from './barang'
import KategoriProvider from './kategori'
import { SatuanProvider } from './satuan'

const Providers = ({ children }) => {
  return (
    <BarangProvider>
      <KategoriProvider>
        <SatuanProvider>
          {children}
        </SatuanProvider>
      </KategoriProvider>
    </BarangProvider>
  )
}

export default Providers