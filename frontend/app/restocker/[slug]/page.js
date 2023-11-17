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
                    <Image priority alt='icon' src='/icons/vending-machine.png' width={150} height={150} />

                </div>
                <div className='flex flex-col justify-center'>
                    <span>Machine ID: #{params.slug}</span>
                    <span>Stored Cash: $10.00</span>
                    <span>Operational</span>
                </div>
            </div>
            {inventory.items.map((item, index) => (
                <ItemManager key={index} item={item} />
            ))}
        </div>
    )
}

const ItemManager = ({ item }) => {
    const [open, setOpen] = useState(false)
    const handleClick = () => {
        setOpen(state => !state)
    }
    const handleChangePrice = (e) => {
        e.stopPropagation()
    }
    const handleAddStock = (i) =>{
        console.log(i)
    }
    const handleRemove = () => {

    }
    return (
        <div className='rounded-md overflow-hidden flex flex-col bg-gray-400 border border-gray-500'>
            <div onClick={() => { handleClick() }} className=' p-2 sm:p-4 flex items-center gap-2 bg-gray-700 text-white'>
                <div>
                    <Image alt='icon' src={item.icon} width={70} height={70} />
                </div>
                <div className='flex flex-col p-2 grow items-start text-lg leading-4\  font-semibold'>
                    <span>{item.name}</span>
                    <span className='text-gray-300 text-sm leading-3'>#{item.id}</span>
                </div>
                {open ? <>
                    <div className='flex flex-col p-2 items-center'>
                        <span>${item.price}</span>
                        <button className='rounded bg-gray-900 text-gray-100 p-1 px-2' onClick={(e) => handleChangePrice(e)}>Change Price</button>
                    </div>
                </> :
                    <>
                        <div className='flex flex-col p-2 items-center'>
                            <span>${item.price}</span>
                            <span className='text-gray-300'>Price</span>
                        </div>
                        <div className='flex flex-col p-2 items-center'>
                            <span>{item.stock}</span>
                            <span className='text-gray-300'>Stock</span>
                        </div>
                        <div>
                            <RiArrowDownSLine className='text-3xl' />

                        </div>
                    </>}
            </div>
            {open &&
                <div className='flex flex-col p-2 sm:p-4'>
                    <div className=' flex flex-col gap-2 mt-4 pl-0 md:pl-8'>
                        <div className='flex'>
                            <span className='basis-3/5 grow-0'>Expiration</span>
                            <span className='basis-1/4 grow-0'>Count</span>
                        </div>
                        {item.expirations && Object.entries(item.expirations).map((item, index) => (
                            <div key={index} className=' bg-gray-200 p-2 rounded-sm flex text-black'>
                                <span className='basis-3/5 grow-0'><DateSPan dateProp={item[0] || '01-01-2023'} /></span>
                                <span className='basis-1/4 grow-0 pl-3'><Count count={item[1]} /></span>
                                <div className='flex justify-end grow'>
                                    <button className='underline  ' onClick={() => handleRemove()}>remove</button>
                                </div>
                            </div>
                        ))}
                        <div className='flex flex-col mt-4'>
                            <button className='p-2 bg-green-400 place-self-end rounded' onClick={()=>handleAddStock()}>Add stock</button>
                        </div>
                    </div>
                    <div className=''>

                    </div>
                </div>}
        </div>
    )
}
const format = (exp) => {
    const expiration = new Date(exp)
    return expiration.toISOString()

}
const DateSPan = ({ dateProp }) => {
    const today = new Date()
    const expiration = new Date(format(dateProp))
    const expired = expiration < today
    return (
        <>
            <span>{expiration.toDateString()}</span>
            {expired && <span className='text-red-600 ml-2'>EXP</span>}
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