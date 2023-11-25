'use client'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const inventory = {
  id: 1,
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
const page = () => {
  return (
    <div className='flex gap-2'>
      <div className='basis-72 grow shrink-0 aspect-[16/6]  bg-amber-50 flex flex-col'>
        <h1 >Sales</h1>
        <PieGraph/>
      </div>
      <div className='p-4 basis-72 shrink-0 grow bg-slate-100 w-full aspect-[16/6] rounded-md flex flex-col'>
        <h1 >ITEM STOCKS</h1>
        <BarGraph />
      </div>

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
  )
}
const BarGraph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%" >

      <BarChart layout='vertical' data={inventory.items}>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis type='number' />
        <YAxis type='category' dataKey='name' width={100} />
        <Tooltip cursor={{ fill: 'transparent' }} />
        <Legend />
        <Bar dataKey="stock" fill="#8884d8" background={{ fill: '#dddddd' }} />
        {/* <Bar dataKey="uv" fill="#82ca9d" /> */}
      </BarChart>
    </ResponsiveContainer>
  )
}
const PieGraph = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="total"
          startAngle={360}
          endAngle={0}
          data={sales}
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


export default page