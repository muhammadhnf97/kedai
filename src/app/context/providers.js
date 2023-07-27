'use client'
import React from 'react'
import BarangProvider from './barang'
import KategoriProvider from './kategori'

const Providers = ({ children }) => {
  return (
    <BarangProvider>
      <KategoriProvider>
        {children}
      </KategoriProvider>
    </BarangProvider>
  )
}

export default Providers