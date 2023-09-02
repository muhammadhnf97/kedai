import { NextResponse } from 'next/server'
 
export function middleware(request) {
   const login = request.cookies.get('auth')
   const jabatan = request.cookies.get('jabatan')
   const getUrl = new URL(request.url).pathname

   if (login && jabatan) {
      if (jabatan?.value === 'pegawai') {
         if(getUrl?.toString() === '/pegawai' || getUrl?.toString() === '/user'){
            return NextResponse.redirect(new URL('/login', request.url))
         } else {
            return NextResponse.next()
         }
      } else {
         return NextResponse.next()
      }
   } else {
      return NextResponse.redirect(new URL('/login', request.url))
   }
   
}
 
export const config = {
  matcher: ['/', '/barang', '/supplier', '/pegawai', '/user', '/satuan', '/kategori', '/konsumen'  ]
}