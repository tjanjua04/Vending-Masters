'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import React from 'react'
import Chart from './Chart'
import { summary } from '../mockData'
import { TbCurrencyDollar } from "react-icons/tb";
import { FiBox } from "react-icons/fi";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { calculateSummary } from '@/states/actions/analyticsActions'

const dateRanges = [{
    name: '7D',
    value: 7
}, {
    name: '14D',
    value: 14
}, {
    name: '30D',
    value: 31
}]
const locations = ["Los Angeles, CA", "Fullerton, CA", "Corona, CA", "Riverside, CA", "San Bernardino, CA"]
const Home = () => {
    const [range, setRange] = useState(31)
    const { topSellingItems, topSellingInventories, totalRevenue, totalUnits } = useSelector(state => state.analytics)
    const dispatch = useDispatch()

    const handleDayFilter = (day) => {
        setRange(day)
        dispatch(calculateSummary(day))
    }
    useEffect(() => {
        console.log("HELLO")
        dispatch(calculateSummary(31))
    }, [])
    return (
        <div className='flex flex-col mx-auto gap-6  '>
            {/* DIVIDER HEADER */}
            <div className='flex px-6'>
                <h1 className='font-semibold text-2xl grow'>Summary</h1>
                <div className='border border-black flex gap-1'>

                    {dateRanges.map((item, index) => (
                        <RangeButton item={item} key={index} handleChange={handleDayFilter} range={range} />
                    ))}
                </div>
            </div>
            {/* DIVIDER BODY */}
            <div className=''>
                {/* DIVIDER ROW 1 */}
                <div className='flex w-full flex-wrap md:flex-nowrap'>
                    {/* DIVIDER  */}
                    <div className='p-4 min-w-[300px] basis-1/3 grow shrink'>
                        <div className='p-4 dark:bg-transparent rounded-sm bg-gray-100'>
                            <div className='flex items-center gap-2 text-xl font-light mb-3'>
                                <span className='bg-green-300 text-green-800 rounded-full aspect-square p-1'><TbCurrencyDollar /></span>
                                <span>Total Revenue</span>
                            </div>
                            <div className='flex pl-6'>
                                <span className='text-4xl font-medium'>{totalRevenue.toLocaleString('en-US', {
                                    style: 'currency',
                                    currency: 'USD',
                                    minimumFractionDigits: 0
                                })}</span>
                            </div>
                        </div>
                    </div>
                    {/* DIVIDER  */}
                    <div className='p-4 min-w-[300px] basis-1/3 grow shrink'>
                        <div className='p-4 dark:bg-transparent rounded-sm h-full  bg-gray-100'>
                            <div className='flex items-center gap-2 text-xl font-light mb-3'>
                                <span className='bg-blue-200 text-blue-400 rounded-full aspect-square p-1'><FiBox /></span>
                                <span>Products Sold</span>
                            </div>
                            <div className='flex'>
                                <span className='text-4xl font-medium pl-6'>{totalUnits.toLocaleString('en-US')}</span>
                            </div>
                        </div>
                    </div>
                    {/* DIVIDER  */}
                    <div className='p-4 min-w-[300px] basis-1/3 grow shrink'>
                        <div className='rounded-sm dark:bg-transparent h-full  bg-gray-100'>
                        </div>
                    </div>
                </div>
                {/* DIVIDER  ROW 2*/}
                <div className='flex w-full flex-wrap md:flex-nowrap '>
                    {/* DIVIDER CHART */}
                    <div className='basis-2/3 p-4'>
                        <div className='aspect-[16/5] rounded-sm border-black flex flex-col bg-gray-100 dark:bg-transparent gap-2'>
                            <span className='text-2xl font-light p-4 pb-0'>Daily Revenue</span>
                            <Chart range={range} />
                        </div>
                    </div>
                    {/* DIVIDER TOP SELLERS */}
                    <div className='basis-1/3 p-4'>
                        <div className='h-full p-4 rounded-sm border-black flex flex-col bg-gray-100 dark:bg-stone-800 '>
                            <div className='flex gap-2 items-end mb-4'>
                                <h1 className='text-xl font-normal grow'>Top Sellers</h1>
                                <Link href='/management/transactions' className='underline text-blue-600 text-xs'>View All</Link>
                            </div>
                            <TopSellers items={topSellingItems} />
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex gap-8'>
                {/* DIVIDER TOP VENDING MACHINES */}
                <div className='p-4 rounded-sm border-black basis-72 grow shrink-0 flex flex-col bg-gray-100 dark:bg-stone-800 '>
                    <div className='flex items-end mb-4'>
                        <h1 className='text-xl font-semibold grow'>Top Vending Machines</h1>
                        <Link href='/management/transactions' className='underline text-blue-600 text-xs'>View All</Link>
                    </div>

                    <TopInventory items={topSellingInventories} />
                </div>
                {/* DIVIDER MACHINE STATUS */}
                <div className='p-4 rounded-sm border-black basis-72 grow shrink-0 flex flex-col bg-gray-100 dark:bg-stone-800 '>
                    <div className='flex items-end mb-4'>
                        <h1 className='text-xl font-semibold grow'>Status</h1>
                        <Link href='/management/transactions' className='underline text-blue-600 text-xs'>View All</Link>
                    </div>
                    <StatusTable items={summary.status} />
                </div>
            </div>

            {/* <h1>TODO</h1> */}
            {/* <ul>
                <li className='text'>
                    Desktop-like interface for corporate users.<br />
                    Real-time access to purchase history and inventory data.<br />
                    Analytics and reporting features for sales trends, popular items, etc.<br />
                    Ability to push instructions to restockers' devices.<br />
                    Drill-down capability to view specific machine inventory changes over time.<br />
                    Geographic data (address, GPS, nearby businesses) displayed for each machine.<br />
                    Heartbeat monitoring to check vending machine status and report errors.<br />
                    Aggregation of data across various levels (zip codes, states, country).<br />
                    Notified of restocking completion with notes from restockers.</li>
            </ul> */}
            {/* <button className='border w-full p-4 border-gray-700'>View All Transactions</button>
            <button className='border w-full p-4 border-gray-700'>Send Instruction to a restocker</button>
            <button className='border w-full p-4 border-gray-700'>View Statistics</button> */}
        </div>
    )
}
const TopSellers = ({ items }) => {
    return (
            <div className='flex flex-col w-full'>
                {items.map((row, index) => (
                    <div
                        key={index}
                        className='flex p-2 dark:bg-stone-950 even:bg-white odd:bg-gray-50'
                    >
                        <span className='basis-1/2 grow'>
                            {row.name}
                        </span>
                        <span className='basis-1/4'>{row.units} sold</span>
                        <span className='basis-1/4'>${row.total&&row.total.toFixed(2)}</span>
                        {/* <TableCell align="right">{row.fat}</TableCell>
                            <TableCell align="right">{row.carbs}</TableCell>
                            <TableCell align="right">{row.protein}</TableCell> */}
                    </div>
                ))}
            </div>
    )
}
const TopInventory = ({ items }) => {
    return (
        <div className='flex flex-col'>
            {/* HEADER */}
            <div className='flex p-4 bg-black text-white'>
                <div className='basis-10'>ID</div>
                <div className='px-2 grow'>Location</div>
                <div className='px-2 basis-16'>Revenue</div>
            </div>
            {/* BODY */}
            {items.map((item, index) => (
                <div key={index} className='flex p-4 bg-white  dark:bg-stone-950'>
                    <div className='basis-10 text-gray-400 text-left'># {item.inventory_id}</div>
                    <div className='px-2 grow'>{item.location || locations[index]}</div>
                    <div className='px-2 basis-16 text-right'>{item.total.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 })}</div>

                </div>
            ))}
        </div>
    )
}
const StatusTable = ({ items }) => {
    return (
        <div className='flex flex-col'>
            {/* HEADER */}
            <div className='flex p-4 bg-black text-white'>
                <div className='basis-10 '>ID</div>
                <div className='basis-10 grow text-center '>Operation</div>
                <div className='px-2 basis-1/3 '>Low In Stock</div>
                <div className='px-2 basis-1/3'>Empty</div>
            </div>
            {/* BODY */}
            {items.map((item, index) => (
                <div key={index} className='flex p-4 bg-white border-b dark:border-b-0  dark:bg-stone-950 '>
                    <div className='basis-10 text-gray-400 text-left  '>#{item.id}</div>
                    <div className='basis-10 grow text-center' style={{ color: item.operation ? 'green' : 'red' }}>{item.operation ? 'OK' : 'DOWN'}</div>
                    <div className='px-2 basis-1/3 flex gap-[3px] items-center pl-2'>
                        <span className='mr-2'>{item.low}</span>
                        {new Array(item.low).fill(1).map((i, index) => (<div key={index} className='rounded min-w-[5px] aspect-[1/3] bg-blue-400'>
                        </div>))}
                    </div>
                    <div className='px-2 basis-1/3 flex gap-[3px] items-center pl-2'>
                        <span className='mr-2'>{item.empty}</span>
                        {new Array(item.empty).fill(1).map((i, index) => (<div key={index} className='rounded min-w-[5px] aspect-[1/3] bg-red-400'>
                        </div>))}
                        <div className='px-2 basis-1/4 shrink flex justify-end grow'>
                            <Link href={`/management/inventory/${item.id}`} className='underline'>View</Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
const RangeButton = ({ item, handleChange, range }) => {
    if (range == item.value) return (
        <button onClick={() => handleChange(item.value)} className='p-2 bg-black text-white'>
            {item.name}
        </button>
    )
    return (
        <button onClick={() => handleChange(item.value)} className='p-2 '>
            {item.name}
        </button>
    )
}
export default Home