import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-[100svh] text-black font-bold bg-gray-500 px-4">
      <div className='p-6 grow items-center flex'>
        <Link href='/customer' className='grow p-2 text-center flex items-center justify-center bg-gray-700 text-white h-full'>
          <span>User Interface</span>
        </Link></div>
      <div className='p-6 grow items-center flex'>
        <Link href='/restocker/login' className='grow p-2 text-center flex items-center justify-center bg-gray-700 text-white h-full'>
          <span>Restocker Interface</span>

        </Link>
      </div>
      <div className='p-6 grow items-center flex'>
        <Link href='/' className='grow p-2 text-center flex items-center justify-center bg-gray-700 text-white h-full'>
          <span>Management Interface</span>
        </Link>
      </div>
    </main>
  )
}
