'use client'
import machine_dict from '@/app/mockData'
import { fetchInventoryIds } from '@/states/actions/inventoryActions'
import { PORT } from '@/states/env'
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
    const dispatch = useDispatch()
    const { ids } = useSelector(state => state.inventory)
    useEffect(() => {
        dispatch(fetchInventoryIds())
    }, [])

    return (
        <div className='flex flex-col mx-auto px-6'>
            <div className='flex'>
                <h1 className='font-semibold text-2xl grow'>Inventory</h1>

                <div className='flex justify-end mb-4'>
                    <button className='p-4 bg-slate-800 text-white'>
                        Create inventory
                    </button>
                </div>
            </div>
            <div className='flex gap-4 mb-4 items-center'>
                <div className='min-w-[12px] aspect-square bg-gray-300' /> None
                <div className='min-w-[12px] aspect-square bg-blue-500' /> Low In Stock
                <div className='min-w-[12px] aspect-square bg-red-500' /> Empty
                <div className='min-w-[12px] aspect-square bg-green-500' /> Ample Stock
            </div>
            <div className='flex bg-black text-white dark:bg-stone-950 p-4 mb-4 rounded'>
                <span className='basis-1/3'>Inventory</span>
                <span className='basis-1/3'>Slot Status</span>
            </div>
            <div className='flex flex-col '>

                {ids.map((inventoryId, id) => (
                    <InventoryRow key={id} inventoryId={inventoryId} />
                ))}
            </div>
        </div>
    )
}
const InventoryRow = ({ inventoryId }) => {
    const [counts, setCounts] = useState([])
    const fetchItems = async () => {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.get(
            `http://127.0.0.1:${PORT}/inventory/${inventoryId}`,
        )
        // const data = machine_dict[inventoryId]
        let arr = Array(15).fill(null)
        data.items.map((item, index) => {
            arr[index] = item
        })
        setCounts(arr)
    }
    useEffect(() => {
        // FETCH INVENTORY WITH ID
        try {
            fetchItems()
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <div className='p-3 py-5 flex odd:bg-gray-200 even:bg-gray-100 dark:odd:bg-gray-700 dark:even:bg-gray-800 items-center first:rounded-t last:rounded-b '>
            <span className='basis-1/3'>Inventory {inventoryId}</span>
            <div className='flex basis-1/3 grow flex-wrap gap-1'>
                {counts.map((item, id) => {
                    if (!item) return (<div key={id} className='min-w-[12px] aspect-square bg-gray-300' />)
                    if (item.quantity < 3) return (<div key={id} className='min-w-[12px] aspect-square bg-blue-500' />)
                    else if (item.quantity == 3) return (<div key={id} className='min-w-[12px] aspect-square bg-red-500' />)
                    else return (<div key={id} className='min-w-[12px] aspect-square bg-green-500' />)
                })}
            </div>
            <Link href={`/management/inventory/${inventoryId}`} className='underline'>View</Link>
        </div>
    )
}

export default Page