import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-wrap min-h-screen text-black font-bold">
      <Link href='/customer' className='grow bg-gray-200 text-center flex items-center justify-center'>
        <span>User Interface</span>
      </Link>
      <Link href='/restocker/login' className='grow bg-gray-200 text-center flex items-center justify-center'>
        <span>Restocker Interface</span>
        
      </Link>
      <Link href='/' className='grow bg-gray-200 text-center flex items-center justify-center'>
        <span>Management Interface</span> 
      </Link>
    </main>
  )
}
