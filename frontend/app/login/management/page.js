'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { login } from '@/states/actions/userActions'
import Image from 'next/image'
import Link from 'next/link'

const Page = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    const router = useRouter()

    const handleSubmit = () => {
        dispatch(login({ username, password }))
        return
    }


    useEffect(() => {
        if (user.isAuth) router.push('/management')
        if (user.error) setError(user.error);
    }, [user])

    return (
        <div className="bg-gray-200 dark:bg-black flex flex-col items-center justify-center mx-auto grow w-full h-[100svh] ">
            <div className='fixed top-0 bottom-0 right-0 left-0 z-0 opacity-60'>
                <Image src='/splash.png' layout='fill' objectFit='cover' className='blur-sm' />
            </div>
            <div className='flex flex-col w-full sm:w-1/2 lg:w-1/3 max-w-5xl  absolute z-10'>

                {error && <div className='my-2 flex bg-red-200 text-red-900 p-2 sm:p-3 rounded-sm md:rounded-md'>
                    <span className='grow'>{error}</span>
                    <button onClick={() => setError("")}>X</button>
                </div>}

                <div className="w-full bg-white rounded-sm md:rounded-md  dark:bg-gray-950 dark:border-gray-700">
                    <h1 className="text-center mt-4 mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
                        {/* <img className="w-8 h-8 mr-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo"/> */}
                        Management
                    </h1>
                    <div className="px-6  sm:px-8 flex flex-col gap-2">
                        <div>
                            <label htmlFor="username" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Your username</label>
                            <input type="username" name="username" id="username" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white " placeholder="username" required="" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div>
                            <label htmlFor="password" className="mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-200 dark:text-white " required="" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <div className="flex items-center justify-between">
                        </div>
                        {/* <button
                            className='bg-blue-200 p-2 rounded-sm'
                            onClick={() => handleSubmit()}
                        >
                            Sign in
                        </button> */}
                        <Link 
                            className='bg-blue-200 p-2 rounded-sm'
                            href='/management'>
                            Sign in
                        </Link>
                        <button
                            className='underline rounded-sm w-min p-2 place-self-end text-sm'
                            onClick={() => {
                                setUsername('admin')
                                setPassword('admin')
                            }}
                        >
                            Admin
                        </button>


                    </div>
                </div>
            </div>

        </div>
    )
}

export default Page