'use client'
import React from 'react'
import BarangProvider from './barang'
import KategoriProvider from './kategori'
import { SatuanProvider } from './satuan'
import { LoginContext, LoginProvider } from './login'
import { UserProvider } from './user'

const Providers = ({ children }) => {
  return (
    <BarangProvider>
      <KategoriProvider>
        <SatuanProvider>
          <LoginProvider>
            <UserProvider>
             {children}
            </UserProvider>
          </LoginProvider>
        </SatuanProvider>
      </KategoriProvider>
    </BarangProvider>
  )
}

export default Providers