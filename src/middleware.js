import { NextResponse } from 'next/server'
 
export async function middleware(request) {
   const alreadyLogin = request.cookies.get('alreadyLogin')
   const cookieEmail = request.cookies.get('email')
   const currentUrl = new URL(request.url).pathname

   const host = process.env.PUBLIC_URL

   if (alreadyLogin) {
      const response = await fetch(`${host}/api/auth`, {
         method: 'POST',
         headers: {
            "Content-Type": 'application/json'
         },
         body: JSON.stringify({
            email: cookieEmail.value
         })
      })
      const data = await response.json()

      const dataInsideData = data?.data[0]

      const { dateExpired, jabatan } = dataInsideData

      const currentDate = Date.parse(new Date())
      const expiredDate = Date.parse(dateExpired)

      if (data.status !== 200) {
         return NextResponse.redirect(new URL('/login', request.url))
      }

      if ( currentDate === expiredDate ) {
         return NextResponse.redirect(new URL('/login', request.url))
      } else {
         if (jabatan === 'pegawai') {
            if(currentUrl?.toString() === '/pegawai' || currentUrl?.toString() === '/user'){
               return NextResponse.redirect(new URL('/', request.url))
            } else {
               return NextResponse.next()
            }
         }
         return NextResponse.next()
      }
   } else {
      return NextResponse.redirect(new URL('/login', request.url))
   }
}
 
export const config = {
  matcher: ['/', '/barang', '/supplier', '/pegawai', '/user', '/satuan', '/kategori', '/konsumen', '/pembelian'  ]
}