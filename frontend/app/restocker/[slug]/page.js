'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { RiArrowDownSLine } from "react-icons/ri";
const Page = ({ params }) => {
    const inventory = useSelector(state => state.inventory.focusedInventory)
    useEffect(() => {
        console.log(inventory)
    }, [inventory])
    return (
        <div className="flex flex-col mx-auto max-w-7xl p-3 sm:p-6 w-full gap-4">
            <div className='bg-gray-100 rounded-md p-4 flex gap-1'>
                <div>
                    <Image src='/icons/vending-machine.png' width={150} height={150} />

                </div>
                <div className='flex flex-col justify-center'>
                    <span>Machine ID: #{params.slug}</span>
                    <span>Stored Cash: $10.00</span>
                    <span>Operational</span>
                </div>
            </div>
            {inventory.items.map((item, index) => (
                <>
                    <ItemManager item={item} />
                </>
            ))}
        </div>
    )
}

const ItemManager = ({ item }) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(state => !state)
    }
    return (
        <div className='p-2 sm:p-4 rounded-md flex flex-col bg-gray-200 border border-gray-400'>
            <button onClick={() => { handleClick() }} className='flex items-center gap-2'>
                <div>
                    {/* <div className='min-w-[30px] sm:min-w-[70px] aspect-square bg-gray-600' /> */}
                    <Image src={item.icon} width={70} height={70}/>
                </div>
                <div className='flex flex-col p-2 grow items-start'>
                    <span>{item.name}</span>
                    <span className='text-gray-400'>#{item.id}</span>
                </div>
                {open ? <>
                    <div className='flex flex-col p-2 items-center'>
                        <span>${item.price}</span>
                        <button className='rounded bg-blue-300 p-1'>Change Price</button>
                    </div>
                </> :
                    <>
                        <div className='flex flex-col p-2 items-center'>
                            <span>${item.price}</span>
                            <span className='text-gray-400'>Price</span>
                        </div>
                        <div className='flex flex-col p-2 items-center'>
                            <span>{item.stock}</span>
                            <span className='text-gray-400'>Stock</span>
                        </div>
                        <div>
                            <RiArrowDownSLine className='text-3xl' />

                        </div>
                    </>}
            </button>
            <div className='flex flex-col'>
                {open &&
                    <>
                        <div className=' flex flex-col gap-2 mt-4 pl-8'>
                            <div className='flex'>
                                <span className='basis-1/2'>Expiration</span>
                                <span className='basis-1/2'>Count</span>
                            </div>
                            {item.expirations && Object.entries(item.expirations).map((item, index) => (
                                <div className=' bg-gray-100 p-2 rounded-sm flex text-black'>
                                    <span className='basis-1/2'><DateSPan dateProp={item[0]||'01-01-2023'} /></span>
                                    <span className='basis-1/2'><Count count={item[1]} /></span>
                                </div>
                            ))}
                        </div>
                        <div className=''>

                        </div>
                    </>}
            </div>
        </div>
    )
}
const DateSPan = ({ dateProp }) => {
    const today =  new Date()
    const expiration =  new Date(dateProp)
    const expired = expiration<today
    return (
        <>
            <span>{expiration.toDateString()}</span>
            {expired&&<span className='text-red-600 ml-2'>EXP</span>}
        </>
    )
}
const Count = ({ count }) => {
    return (
        <div>
            {count}
        </div>
    )
}
export default Page