'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RiArrowDownSLine } from "react-icons/ri";
import { fetchInventory } from '@/states/actions/inventoryActions';
import { modifyQty } from '@/states/actions/restockerActions';
import Link from 'next/link';

const Page = ({ params }) => {
    const dispatch = useDispatch()
    const inventory = useSelector(state => state.inventory.focusedInventory)
    useEffect(() => {
        dispatch(fetchInventory(params.slug))
    }, [, params.slug])
    return (
        <div className="flex flex-col mx-auto max-w-7xl p-3 sm:p-6 w-full gap-4">
            <div className='bg-gray-100 rounded-md p-4 flex gap-1'>
                <div>
                    <Image priority alt='icon' src='/icons/vending-machine.png' width={150} height={150} />

                </div>
                <div className='flex flex-col justify-center grow'>
                    <span className='text-xl'>Machine ID: #{params.slug}</span>
                    <span>Stored Cash: $10.00</span>
                    <span className='p-1 bg-green-400 w-min px-2 rounded'>{inventory && inventory.operation ? 'Operational' : 'Down'}</span>
                </div>
                <div className='flex items-center'>
                    <Link href='/restocker' className='p-3 px-5 text-lg rounded bg-black text-white'>Done</Link>
                </div>
            </div>
            {inventory && inventory.items.map((item, index) => (
                <ItemManager key={index} item={item} inventory_id={inventory.id} />
            ))}
        </div>
    )
}

const ItemManager = ({ item,inventory_id }) => {
    const [open, setOpen] = useState(false)
    const [newQty, setNewQty] = useState(item.quantity)
    const [newExp, setNewExp] = useState("")
    const [qtyInputOpen, setQtyOpen] = useState(false)
    const [remOpen, setRemoOpen] = useState(false)
    const [curQty, setCurQty] = useState(item.quantity)
    const dispatch = useDispatch()
    const handleClick = () => {
        setOpen(state => !state)
    }
    const handleChangePrice = (e) => {
        e.stopPropagation()

    }
    const handleAddStock = (itemId) => {
        dispatch(modifyQty(
            {
                inventory_id:inventory_id,
                item_id: itemId,
                quantity: Number(newQty),
                expiration: newExp
            }
        ))
        setCurQty(newQty)
        setQtyOpen(false)

    }
    const handleRemove = () => {
        setCurQty(newQty)
        setRemoOpen(false)

    }
    return (
        <div className='rounded-md overflow-hidden flex flex-col even:bg-gray-200 odd:bg-gray-300  '>
            <div onClick={() => { handleClick() }} className=' p-2 sm:p-4 flex items-center gap-2 '>
                <div>
                    <Image alt='icon'
                        src='/icons/chips-1.png'
                        // src={item.icon} 
                        // src={item.icon} 
                        width={70} height={70} />
                </div>
                <div className='flex flex-col p-2 grow items-start text-lg leading-4\  font-semibold'>
                    <span>{item.name}</span>
                    <span className='text-gray-500 text-sm leading-3'>#{item.id}</span>
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
                            <span className='text-gray-400'>Price</span>
                        </div>
                        <div className='flex flex-col p-2 items-center'>
                            <span>{item.quantity}</span>
                            <span className='text-gray-400'>Stock</span>
                        </div>
                        <div>
                            <RiArrowDownSLine className='text-3xl' />

                        </div>
                    </>}
            </div>
            {open &&
                <div className='flex flex-col p-2 sm:p-4'>
                    <div className=' flex flex-col mt-4 pl-0 md:pl-8'>
                        <div className='flex font-semibold'>
                            <span className='basis-3/5 grow-0'>Expiration</span>
                            <span className='basis-1/4 grow-0'>Count</span>
                        </div>
                        {/* {item.expirations && Object.entries(item.expirations).map((item, index) => (
                            <div key={index} className=' bg-gray-100 p-2 rounded-sm flex text-black'>
                                <span className='basis-3/5 grow-0'><DateSPan dateProp={item[0] || '01-01-2023'} /></span>
                                <span className='basis-1/4 grow-0 pl-3'><Count count={item[1]} /></span>
                                <div className='flex justify-end grow'>
                                    <button className='underline  ' onClick={() => handleRemove()}>remove</button>
                                </div>
                            </div>
                        ))} */}
                        <div className='flex flex-nowrap bg-white p-2'>
                            <span className='basis-3/5 grow-0'>{item.exp_date}</span>
                            <span className='basis-1/4 grow-0'>{curQty}</span>
                        </div>
                        <div className='flex flex-col mt-4'>
                            {qtyInputOpen ?
                                <div className='flex items-center gap-1 justify-end'>
                                    <span>New QTY:</span>
                                    <input value={newQty} onChange={(e) => setNewQty(e.target.value)} className='p-1' placeholder='New QTY'></input>
                                    <input value={newExp} onChange={(e) => setNewExp(e.target.value)} className='p-1' placeholder='expiration'></input>
                                    <button onClick={() => handleAddStock(item.id)} className='p-2 bg-green-400 rounded'>Submit</button>
                                </div>
                                :
                                <button className='p-2 bg-green-400 place-self-end rounded' onClick={() => setQtyOpen(true)}>Add stock</button>
                            }
                        </div>
                        <div className='flex flex-col mt-4'>
                            {remOpen ?
                                <div className='flex items-center gap-1 justify-end'>
                                    <span>New QTY:</span>
                                    <input value={newQty} onChange={(e) => setNewQty(e.target.value)} className='p-1' placeholder='New QTY'></input>
                                    <button onClick={() => handleRemove()} className='p-2 bg-red-400 rounded'>Submit</button>
                                </div>
                                :
                                <button className='p-2 bg-red-400 place-self-end rounded' onClick={() => setRemoOpen(true)}>Remove an Item</button>
                            }
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