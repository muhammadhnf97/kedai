'use client'
import React from 'react'
import BarangProvider from './barang'
import KategoriProvider from './kategori'
import { SatuanProvider } from './satuan'
import { LoginProvider } from './login'
import { UserProvider } from './user'
import SupplierProvider from './supplier'
import { PenjualanProvider } from './penjualan'

const Providers = ({ children }) => {
  return (
    <BarangProvider>
      <KategoriProvider>
        <SatuanProvider>
          <LoginProvider>
            <UserProvider>
              <SupplierProvider>
                <PenjualanProvider>
             {children}
                </PenjualanProvider>
             </SupplierProvider>
            </UserProvider>
          </LoginProvider>
        </SatuanProvider>
      </KategoriProvider>
    </BarangProvider>
  )
}

export default Providers