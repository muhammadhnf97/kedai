import { NextResponse } from 'next/server'
 
export function middleware(request) {
   const cekLogin = request.cookies.get('auth')
   const cekJabatan = request.cookies.get('jabatan')
   const getUrl = new URL(request.url).pathname

   if ( cekLogin && cekJabatan ){
      if ( cekJabatan.value === 'pimpinan' ){
         if ( getUrl.toString() !== '/barang' && getUrl.toString() !== '/kategori' && getUrl.toString() !== '/satuan' && getUrl.toString() !== '/' && getUrl.toString() !== 'supplier' ){
            return NextResponse.redirect(new URL('/', request.url))
         }
      } else if ( cekJabatan.value === 'pegawai' ){
         if ( getUrl.toString() !== '/barang' && getUrl.toString() !== '/kategori' && getUrl.toString() !== '/satuan' && getUrl.toString() !== '/' ){
            return NextResponse.redirect(new URL('/', request.url))
         }
      }
      return NextResponse.next()
   } else {
      return NextResponse.redirect(new URL('/login', request.url))
   }
}


export const config = {
   matcher: ['/barang/:path*', '/kategori', '/satuan', '/pegawai', '/supplier', '/konsumen', '/'],
 }