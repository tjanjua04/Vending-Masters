'use client'
import React from 'react'
import { RiArrowLeftLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/states/actions/userActions";
import { usePathname, useRouter } from 'next/navigation';
const Layout = ({ children }) => {
  const router = useRouter()
  const path = usePathname()
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const handleBack = () => {
    if(path == '/management'){
      dispatch(logout())
      // router.push('/')
    }
    else if(path == '/management/login')router.push('/')
    else router.back()
  }
  return (
    <div className=" dark:bg-black flex flex-col min-h-[100svh]">
      <div className="bg-gray-600 p-4 sm:p-6 text-white text-3xl flex items-center">
        <div className="grow flex">
          <button onClick={() => handleBack()}>
            <RiArrowLeftLine className="text-2xl mx-3" />
          </button>
          <h1>Management {user.username}</h1>
        </div>
        {user.isAuth && <div className="text-base">
          <button onClick={() => dispatch(logout())}>Logout</button>
        </div>}
      </div>
      {children}
    </div>
  )
}

export default Layout