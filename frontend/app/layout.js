'use client'
import { useState } from 'react'
import { Inter,Roboto } from "next/font/google";
import "./globals.css";
const roboto = Roboto({ subsets:['latin'], weight:['100','300','400','500','700','900'] });
import { ReduxProvider } from '../states/provider'

// export const metadata = {
//   title: "Vending Masters",
//   description: "SWE Group Project",
// };

export default function RootLayout({ children }) {
  const [theme,setTheme] = useState('light')
  const changeTheme=()=>{
    if (theme=='dark') setTheme('light')
    else setTheme('dark')
  }
  return (
    <html lang="en" className={theme} >

      <body className={roboto.className}>
          <div className='text-black dark:text-white  dark:bg-black min-h-[100dvh] overflow-scroll '>
            <div className='fixed top-0'>
              <button onClick={() => changeTheme()} className='opacity-5'>__</button>
            </div>
        <ReduxProvider>
            {children}
        </ReduxProvider>
          </div>
      </body>
    </html>
  );
}
