import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-items-stretch min-h-[100dvh] text-black font-bold bg-gray-300 px-4">
      <div className='p-6 grow items-center flex flex-col'>
        <Link href='/customer' className='rounded grow p-2 w-full text-center flex items-center justify-center bg-gray-700 text-white '>
          <span>User Interface</span>
        </Link></div>
      <div className='p-6 grow items-center flex flex-col'>
        <Link href='/restocker/login' className='rounded grow p-2 text-center flex items-center justify-center bg-gray-700 text-white w-full'>
          <span>Restocker Interface</span>

        </Link>
      </div>
      <div className='p-6 grow items-center flex flex-col'>
        <Link href='/management/login' className='rounded grow p-2 text-center flex items-center justify-center bg-gray-700 text-white w-full'>
          <span>Management Interface</span>
        </Link>
      </div>
    </main>
  )
}
