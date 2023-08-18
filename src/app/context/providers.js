'use client'
import React from 'react'
import BarangProvider from './barang'
import KategoriProvider from './kategori'
import { SatuanProvider } from './satuan'
import { LoginContext, LoginProvider } from './login'

const Providers = ({ children }) => {
  return (
    <BarangProvider>
      <KategoriProvider>
        <SatuanProvider>
          <LoginProvider>
          {children}
          </LoginProvider>
        </SatuanProvider>
      </KategoriProvider>
    </BarangProvider>
  )
}

export default Providers