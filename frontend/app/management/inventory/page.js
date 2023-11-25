'use client'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Page = () => {
    const dispatch = useDispatch()
    const { ids } = useSelector(state => state.inventory)
    useEffect(() => {
        console.log(ids)
    }, [ids])

    return (
        <div>
            <div className='flex justify-end mb-4'>
                <button className='p-4 bg-slate-800 text-white'>
                    Create inventory
                </button>
            </div>
            <div className='flex flex-col gap-4'>
                {ids.map((inventoryId, id) => (
                    <div key={id} className='p-3 flex bg-gray-200 text-black items-center'>
                        <span className='grow'>Inventory {inventoryId}</span>
                        <div className='flex basis-1/3 grow flex-wrap gap-1'>
                            {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((box, id) => (
                                <div key={id} className='min-w-[12px] aspect-square bg-green-400'>
                                </div>
                            ))}
                        </div>
                        <Link href={`/management/inventory/${inventoryId}`} className='underline'>View</Link>
                    </div>
                ))}


            </div>
        </div>

    )
}

export default Page