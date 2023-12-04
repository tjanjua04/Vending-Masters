'use client'
import { caculateInventorySummary, filterTransactions, getInventoryAnalytics, setFocusedInventoryAnalytics } from '@/states/actions/analyticsActions'
import { fetchInventory } from '@/states/actions/inventoryActions'
import { setFocusedTransactions } from '@/states/features/analyticsSlice'
import { setFocusedInventory } from '@/states/features/inventorySlice'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, BarChart, CartesianGrid, LabelList, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const mockInventory = {
  id: 1,
  location: "Los Angeles, CA",
  items: [
    {
      name: "Doritos",
      stock: 8,
      price: 3,
      id: 1,
      icon: "/icons/chips-3.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4

      }
    },
    {
      name: "Ruffles",
      stock: 0,
      price: 1.5,
      id: 2,
      icon: "/icons/chips-3.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    },
    {
      name: "Sneakers",
      stock: 3,
      price: 2.29,
      id: 3,
      icon: "/icons/chips-3.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    },
    {
      name: "Pop-Tarts",
      stock: 9,
      price: 1.29,
      id: 4,
      icon: "/icons/chips-3.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    },
    {
      name: "SunChips",
      stock: 5,
      price: 1.29,
      id: 5,
      icon: "/icons/chips-3.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    },
    {
      name: "Granola Bars",
      stock: 2,
      price: 1.29,
      id: 6,
      icon: "/icons/chips-3.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    },
    {
      name: "Cookies",
      stock: 2,
      price: 1.29,
      id: 7,
      icon: "/icons/energy-bar.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    },
    {
      name: "Cheetos",
      stock: 10,
      price: 1.29,
      id: 8,
      icon: "/icons/energy-bar.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    },
    {
      name: "Ruffles",
      stock: 8,
      price: 1.29,
      id: 9,
      icon: "/icons/energy-bar.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    }, {
      name: "Sneakers",
      stock: 5,
      price: 1.29,
      id: 9,
      icon: "/icons/energy-bar.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    }, {
      name: "Cookies",
      stock: 2,
      price: 1.29,
      id: 9,
      icon: "/icons/energy-bar.png",
      expirations: {
        "2023-01-01": 3,
        "2023-02-02": 3,
        "2024-03-03": 4
      }
    },
  ],
  theme: {
    primary_color: "#444",
  },
  properties: {
    location: "1234 Foo st., Anaheim",
    Status: "Operational",
  },
}
const sales = [
  {
    name: 'Doritos',
    total: 140
  },
  {
    name: 'Sneakers',
    total: 80
  },
  {
    name: 'Ruffles',
    total: 40
  },
  {
    name: 'Lays',
    total: 20
  },
  {
    name: 'Doritos',
    total: 50
  },
  {
    name: 'Doritos',
    total: 115
  },
]
const Page = ({ params }) => {
  const { focusedTransactions, focusedInventory } = useSelector(state => state.analytics)
  // const { topItems, lastTransaction, lastRestock, lastRestocker, status } = focusedInventory
  const { focusedInventory: currInventory } = useSelector(state => state.inventory)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getInventoryAnalytics(params.slug))
    dispatch(fetchInventory(Number(params.slug)))
  }, [params.slug])

  if (focusedInventory) return (
    <div className='px-4 relative '>
      <div className='mb-6  top-2'>
        <h1 className='text-3xl font-semibold'>Inventory # {focusedInventory.id}</h1>
        <h1 className='text-gray-500'>{focusedInventory.location}</h1>
      </div>

      <div className='flex gap-6 flex-wrap sticky top-0'>

        {/* DIVIDER ITEM SALES */}
        <div className='p-4 basis-72 shrink grow bg-stone-100 w-full aspect-[16/12] rounded-md flex flex-col'>
          <h1 className='text-lg font-semibold'>Revenue by Item</h1>
          <BarGraph x={focusedInventory.topItems} />
        </div>
        {/* DIVIDER DETAILS */}
        <div className='p-2 basis-1/3 sticky grow-0 top-2  bg-stone-100 text-gray-700 rounded'>
          <h1 className='text-2xl font-semibold p-4 border-b-[1px] pb-2 mb-2'>Details</h1>
          <div className='px-6 flex flex-col gap-2'>
            <div className='flex  items-center'>
              <span className='grow text-gray-400 dark:text-white'>Status:</span>
              <span className=' p-2 rounded-md bg-green-200 text-green-700'>{focusedInventory.operation ? "Operational" : "Down"}</span>
            </div>
            <div className='flex items-center'>
              <span className='grow text-gray-400 dark:text-white'>Last Transaction</span>
              <span className=' p-2 rounded-md '>{focusedInventory.lastTransaction}</span>
            </div>
            <div className='flex items-center'>
              <span className='grow text-gray-400 dark:text-white'>Last Restocked By:</span>
              <span className=' p-2 rounded-md '>{focusedInventory.lastRestocker}</span>
            </div>
            <div className='flex items-center'>
              <span className='grow text-gray-400 dark:text-white text-sm'>Last Restocked At:</span>
              <span className=' p-2 rounded-md '>{focusedInventory.lastRestock}</span>
            </div>
            <div className='flex items-center'>
              <span className='grow pb-2 mb-2 text-left text-gray-400 dark:text-white'>Note from last restocker</span>
              <button className=' prounded-md border border-gray-500 p-1 rounded hover:bg-gray-300 duration-200'>View Note</button>
            </div>
            <div className='flex items-center'>
              <span className='grow pb-2  mb-2 text-left text-gray-400 dark:text-white'>Assign</span>
              <button className=' prounded-md border border-gray-500 p-1 hover:bg-blue-400 duration-200 hover:text-white rounded'>Select Restocker</button>
            </div>
          </div>
        </div>
        {/* DIVIDER ITEMS*/}
        <div className='basis-2/3 pr-4'>
          <h1 className='text-2xl font-semibold p-4 border-b-[1px] pb-2 mb-2'>Items</h1>
          <div className='flex flex-wrap'>
            {currInventory && currInventory.items.map((item, index) => (
              <div className='p-2 basis-1/3 hover:bg-gray-200' key={index}>{item.name} </div>
            ))}
            </div>
          <button className='p-2 border border-gray-400 hover:bg-blue-400'>+ Initiate New Item</button>
        </div>

        <div className='flex flex-col basis-full'>
          <h1 className='text-2xl font-semibold p-4 border-b-[1px] pb-2 mb-2'>Sales Performance By Item</h1>

          {/* {focusedTransactions.map((item, index) => <div className='p-2' key={index}>{item.inventory_id}</div>)} */}
        </div>
        {/* <div className='basis-72 grow shrink-0 aspect-[16/6]  bg-stone-100 flex flex-col'>
          <h1 >Sales</h1>
          <PieGraph x={sales} />
        </div> */}
        {/* <button>View sales in this inventory</button>
      <button>Assign a restocker</button>
      <button>Modify items in this inventory</button>

      <ul>
        <h1 className='font-bold'>TO ADD</h1>
        <li>Map</li>
        <li>Display for items</li>
        <li>Last restock info</li>
        <li>Stats like sales </li>
        <li></li>
      </ul> */}
      </div>
    </div>
  )
}
const BarGraph = ({ x }) => {
  return (
    <ResponsiveContainer width="100%" height="100%" >

      <BarChart layout='vertical' data={x}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis type='number' />
        <YAxis type='category' dataKey='name' width={0} axisLine={false} label={<></>} />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Legend />
        <Bar dataKey="total" fill="#27dd6a" background={{ fill: '#dddddd' }} >
          <LabelList dataKey="total" content={CustomLabel} position="insideRight" style={{ fill: "white", color: 'green' }} />
          <LabelList dataKey="name" content={CustomLabel} position="insideRight" axisLabel={true} style={{ fill: "white", color: 'green' }} />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  )
}
const CustomLabel = ({ x, y, fill, width, height, value, axisLabel }) => {
  if (axisLabel) return (<text x={x} y={y - 2} textAnchor="start">
    {value}
  </text>)
  const offset = value.toString().length * 5
  return (<text x={x + width - offset} y={y + height / 2} textAnchor="end" scale={'2%'} className='fill-green-950'>
    ${value}
  </text>)
}
const PieGraph = ({ x }) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="total"
          startAngle={360}
          endAngle={0}
          data={x}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
        // label
        />
      </PieChart>
    </ResponsiveContainer>
  )
}


export default Page