import Image from 'next/image'
import Link from 'next/link'
const navs = [{
  name: 'Transaction Simulator',
  link: '/customer'
}, {
  name: 'Restocker',
  link: '/restocker/login'
}, {
  name: 'Management',
  link: '/login/management'
}]
export default function Home() {
  return (
    <main className=" h-[100dvh] overflow-hidden bg-black w-full relative text-black  font-bold px-4 flex justify-center flex-col items-center">
      <Image src='/home2.jpg' objectFit='cover' layout='fill' className='absolute blur-sm  scale-105'/>
      <div className='flex flex-col '>
        {navs.map((nav, index) => (
          <NavButton nav={nav} />
        ))}
      </div>
      <span className='fixed bottom-4 right-4 text-xs text-white'>Placeholder image</span>
    </main>
  )
}
const NavButton = ({ nav }) => {
  return (<>
    <Link href={nav.link} className='my-2 navButton p-4 bg-gray-800 hover:bg-gray-100 hover:text-black duration-300 text-white font-normal rounded'>{nav.name}</Link>
  </>)
}