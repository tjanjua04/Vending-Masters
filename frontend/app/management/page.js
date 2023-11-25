'use client'
import { useState } from 'react'
import Link from 'next/link'
import React from 'react'
import Chart from './Chart'
import { summary } from '../mockData'
import { TbCurrencyDollar } from "react-icons/tb";
import { FiBox } from "react-icons/fi";

const Page = () => {
    const [range, setRange] = useState(30)
    return (
        <div className='flex flex-col mx-auto gap-6 p-4 '>
            {/* DIVIDER HEADER */}
            <div className='flex'>
                <h1 className='font-semibold text-2xl grow'>Summary</h1>
                <div className='p-2 border border-black'>
                    <select value={range} onChange={(e) => setRange(e.target.value)} className='text-left'>
                        <option value={30}>30 D</option>
                        <option value={14}>14 D</option>
                        <option value={7}>7 D</option>
                        <option value={1}>1 D</option>
                    </select>
                </div>
            </div>
            {/* DIVIDER BODY */}
            <div className='flex gap-6 flex-wrap'>
                {/* DIVIDER  */}
                <div className='p-4 rounded-sm basis-1/3  bg-gray-100'>
                    <div className='flex items-center gap-2 text-xl font-light mb-3'>
                        <span className='bg-green-300 text-green-800 rounded-full aspect-square p-1'><TbCurrencyDollar /></span>
                        <span>Total Revenue</span>
                    </div>
                    <div className='flex pl-6'>
                        <span className='text-4xl font-medium'>{summary.totalRevenue.toLocaleString('en-US', {
                            style: 'currency',
                            currency: 'USD',
                            minimumFractionDigits: 0
                        })}</span>
                    </div>
                </div>
                {/* DIVIDER  */}
                <div className='p-4 rounded-sm basis-1/3  bg-gray-100'>
                    <div className='flex items-center gap-2 text-xl font-light mb-3'>
                        <span className='bg-blue-200 text-blue-400 rounded-full aspect-square p-1'><FiBox /></span>
                        <span>Products Sold</span>
                    </div>
                    <div className='flex'>
                        <span className='text-4xl font-medium pl-6'>{summary.totalSold.toLocaleString('en-US')}</span>
                    </div>
                </div>
                {/* DIVIDER  */}
                <div className='aspect-[16/5] rounded-sm border-black basis-2/3 shrink-0 flex flex-col bg-gray-100 gap-2'>
                    <span className='text-xl p-4'>Revenue Growth</span>
                    <Chart range={range} />
                </div>
                {/* DIVIDER TOP SELLERS */}
                <div className='p-4 rounded-sm border-black basis-1/4 grow shrink-0 flex flex-col bg-gray-100 '>
                    <h1 className='text-lg font-semibold'>Top Sellers</h1>
                    <ul>
                        {summary.topItems.map((item, index) => <TopItem key={index} item={item} />)}
                    </ul>
                </div>
            </div>
            <div className='flex flex-wrap gap-4'>

                {/* DIVIDER TOP VENDING MACHINES */}
                <div className='p-4 rounded-sm border-black basis-72 grow shrink-0 flex flex-col bg-gray-100 '>
                    <h1 className='text-lg font-semibold'>Top Vending Machines</h1>
                    <ul>
                        {summary.topVm.map((vm, index) => <TopVm key={index} vm={vm} />)}
                    </ul>
                </div>
                {/* DIVIDER MACHINE STATUS */}
                <div className='p-4 rounded-sm border-black basis-72 grow shrink-0 flex flex-col bg-gray-100 '>
                    <h1 className='text-lg font-semibold'>Status</h1>
                    <ul>
                        <StatusItem>Doritos</StatusItem>
                        <StatusItem>Ruffles</StatusItem>
                        <StatusItem>Coca Cola</StatusItem>
                        <StatusItem>Sneakers</StatusItem>
                        <StatusItem>Water</StatusItem>
                    </ul>
                </div>
            </div>

            <h1>TODO</h1>
            <ul>
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
            </ul>
            {/* <button className='border w-full p-4 border-gray-700'>View All Transactions</button>
            <button className='border w-full p-4 border-gray-700'>Send Instruction to a restocker</button>
            <button className='border w-full p-4 border-gray-700'>View Statistics</button> */}
        </div>
    )
}
const TopItem = ({ item }) => {
    return (
        <li className='flex'><span className='grow'>{item.name}</span><span>{item.quantity} units</span></li>
    )
}
const TopVm = ({ vm }) => {
    return (
        <li className='flex'><span>{vm.location}</span><span className='grow text-gray-400 ml-2 text-sm'>#{vm.id}</span><span>${vm.revenue}</span></li>
    )
}
const StatusItem = ({ children }) => {
    return (
        <li className='flex'><span className='grow'>{children}</span><span>Operational</span><Link href='/management/inventory/1' className='px-1 ml-2 underline'>View</Link></li>
    )
}
export default Page