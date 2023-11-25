'use client'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/states/actions/userActions";
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { RiArrowLeftLine } from "react-icons/ri";
import { BiReceipt } from "react-icons/bi";
import { GrVend } from "react-icons/gr";
import { HiOutlineUsers } from "react-icons/hi2";
import { RiDashboardLine } from "react-icons/ri";
const navs = [{
  name: 'Summary',
  link: '/management',
  icon: <RiDashboardLine />
}, {
  name: 'Inventory',
  link: '/management/inventory',
  icon: <GrVend />
}, {
  name: 'Transactions',
  link: '/management/transactions',
  icon: <BiReceipt />
}, {
  name: 'Restockers',
  link: '/management/restockers',
  icon: <HiOutlineUsers />
},]

const Layout = ({ children }) => {
  const router = useRouter()
  const path = usePathname()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleBack = () => {
    if (path == '/management') {
      dispatch(logout())
      // router.push('/')
    }
    else if (path == '/management/login') router.push('/')
    else router.back()
  }
  useEffect(() => {
    // if (user.isAuth) router.push('/management')

    // if (!user.isAuth) {

    //   router.push('/login/management')
    // }
  }, [user])
  // if (!user.isAuth) return (
  //   <>
  //     <div className="dark:bg-black flex flex-col min-h-[100svh]">
  //       {children}
  //     </div>
  //   </>
  // )
  return (
    <div className=" dark:bg-black flex min-h-[100svh]">
      <div className='basis-1/4 max-w-[350px] bg-[#DADDD7] bg-neutral-200 flex flex-col'>
        <div className='pl-8 font-bold text-3xl aspect-[3/1] flex items-center'>
          LOGO OGOL
        </div>
        <nav className='grow'>
          <ul className='flex flex-col relative h-full px-6 '>
            {navs.map((nav, index) => (
              <NavButton key={index} nav={nav} path ={path}/>

            ))}
            {user.isAuth &&
              <button className=' absolute bottom-0 left-0 my-2 text-black p-4  hover:bg-gray-100 hover:text-black duration-300 font-normal w-full text-left' onClick={() => dispatch(logout())}>Logout</button>
            }
            <button className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 p-4 bg-gray-400 '>
              <RiArrowLeftLine onClick={() => handleBack()} className="text-2xl text-black " />
            </button>

          </ul>
        </nav>
      </div>
      <div className='basis-3/4 p-8 pt-28'>
        {children}
      </div>
    </div>
  )
}
const NavButton = ({ nav, path }) => {
  const [active, setActive] = useState(false)
  useEffect(() => {
    console.log(path);
    console.log(nav.link);
    setActive(path == `${nav.link}`)
  }, [path])
  if (active) return (
    <Link href={nav.link} className='my-2 text-white  bg-gray-950 p-4  duration-200 font-normal flex items-center gap-2'>
      <span className='text-2xl'>{nav.icon}</span>
      <span className='text-lg'>{nav.name}</span>
      {/* <span className='mix-blend-difference'>{nav.name}</span> */}
    </Link>
  )
  return (
    <Link href={nav.link} className='my-2 text-black hover:text-white p-4 hover:bg-gray-950 duration-200 font-normal flex items-center gap-2'>
      <span className='text-2xl'>{nav.icon}</span>
      <span className='text-lg'>{nav.name}</span>
      {/* <span className='mix-blend-difference'>{nav.name}</span> */}
    </Link>
  )
}
export default Layout