'use client'
import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/states/actions/userActions";

const Layout = ({ children }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  return (
    <div className=" dark:bg-black flex flex-col min-h-[100svh]">
      <div className="bg-gray-600 p-4 sm:p-6 text-white text-3xl flex items-center">
        <div className="grow">
          <h1>Restocker {user.username}</h1>
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