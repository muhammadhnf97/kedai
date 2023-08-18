import Image from 'next/image'
import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div className='bg-white fixed w-full h-full flex flex-col justify-center items-center'>
        <Image src={'/images/notfound.png'} alt='notfound' width={300} height={300} loading='lazy' />
      <h2 className='text-3xl font-bold'>Not Found</h2>
      <Link href="/">Return Home</Link>
    </div>
  )
}