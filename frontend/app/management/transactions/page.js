'use client'
import React, { useEffect, useState } from 'react'
import { transactions } from '@/app/mockData'
import { useDispatch, useSelector } from 'react-redux'
import { fetchInventoryIds } from '@/states/actions/inventoryActions'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { fetchAllTransactions, filterTransactions } from '@/states/actions/analyticsActions'
const Page = () => {
  const [inventoryId, setInventoryId] = useState('All')
  const [itemId, setItemId] = useState('All')
  const [method, setMethod] = useState('All')
  const { ids } = useSelector(state => state.inventory)
  const { focusedTransactions } = useSelector(state => state.analytics)
  const dispatch = useDispatch()

  const handleFilterChange = () => {
    let filters = {}
    if (inventoryId !== 'All') filters.inventory_id = inventoryId
    if (itemId !== 'All') filters.item_id = itemId
    if (method !== 'All') filters.method = method
    dispatch(filterTransactions(filters))
  }
  const handleDownloadCsv = () => {
    var csv = 'Transaction ID, Item Name, Item ID, Date, Inventory ID, Price Method\n';
    focusedTransactions.forEach(function (row) {
      csv += Object.values(row).join(',');
      csv += "\n";
    })
    var hiddenElement = document.createElement('a');
    hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    hiddenElement.target = '_blank';
    hiddenElement.download = 'FilteredTransactions.csv';
    hiddenElement.click();
  }
  useEffect(() => {
    dispatch(fetchAllTransactions())
    dispatch(fetchInventoryIds())
  }, [])

  return (
    <div className=' '>
      {/* DIVIDER FILTER SECTION */}
      <div className='flex items-center'>
        <div className='basis-28 grow p-4 border-0'>
          <MyMenu value={inventoryId} onChange={(e) => setInventoryId(e)} label="Inventory ID">
            <MenuItem
              value="All">
              <em>All</em>
            </MenuItem>
            {ids && ids.map((id, index) => <MenuItem key={index} value={id}>{id}</MenuItem>)}
          </MyMenu>
        </div>
        <div className='basis-1/5 p-4 border-0'>
          <MyMenu value={itemId} onChange={(e) => setItemId(e)} label="Item">
            <MenuItem
              value="All">
              <em>All</em>
            </MenuItem>
            {/* {ids && ids.map((id, index) => <MenuItem key={index} value={id}>{id}</MenuItem>)} */}
          </MyMenu>
        </div>
        <div className='basis-32 p-4 border-0'>
          <MyMenu value={method} onChange={(e) => setMethod(e)} label="Method">
            <MenuItem
              value="All">
              <em>All </em>
            </MenuItem>
            <MenuItem
              value="cash">
              <em>Cash</em>
            </MenuItem>
            <MenuItem
              value="card">
              <em>Card</em>
            </MenuItem>
          </MyMenu>
        </div>
        <div className='basis-1/5 p-4 border-0'>
          From: *date*
        </div>
        <div className='basis-1/5 p-4 border-0'>
          To: *date*
        </div>
        <button className='p-2 bg-blue-400 rounded-sm text-white mr-2' onClick={() => handleFilterChange()}>Filter</button>
        <button className='p-2 bg-green-500 rounded-sm text-white basis-32 whitespace-nowrap ' onClick={() => handleDownloadCsv()}>Download .csv</button>
      </div>
   
      {/* DIVIDER RECORDS SECTION */}
      <Table>
        <h1 className='text-2xl font-semibold my-3 '>{`${focusedTransactions.length}`} Records</h1>
        <TableHeader />
        {focusedTransactions && focusedTransactions.map((item, index) => <Row item={item} key={index} />)}
      </Table>
    </div>
  )
}

const MyMenu = ({ children, onChange, value, label }) => {
  return (
    <FormControl className=' w-full text-white dark:bg-slate-500' variant="standard" sx={{}}>
      <InputLabel id="demo-simple-select-filled-label" className='text-lg'>{label}</InputLabel>
      <Select
        labelId="demo-simple-select-filled-label"
        id="demo-simple-select-filled"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >


        {children}
      </Select>
    </FormControl>
  )
}

const Table = ({ children }) => {
  return (
    <div className='flex flex-col'>
      {children}
    </div>
  )
}
const TableHeader = () => {
  return (
    <div className='p-3 flex bg-black text-white rounded '>
      <div className='basis-1/5'>Date</div>
      <div className='basis-1/6 text-center'>ID</div>
      <div className='basis-1/5'>Item Name</div>
      <div className='basis-1/5'>Item ID</div>
      <div className='basis-1/5'>Inventory ID</div>
      <div className='basis-1/5'>Price</div>
      <div className='basis-1/5'>Method</div>
    </div>
  )
}
const Row = ({ item }) => {
  return (
    <div className='p-2 flex odd:bg-neutral-50 even:bg-neutral-100 dark:odd:bg-gray-900 dark:even:bg-gray-800 text-gray-500 dark:text-white'>
      <div className='basis-1/5'>{item.time}</div>
      <div className='basis-1/6 text-center'>{item.id}</div>
      <div className='basis-1/5'>{item.item_name}</div>
      <div className='basis-1/5'>{item.item_id}</div>
      <div className='basis-1/5'>{item.inventory_id}</div>
      <div className='basis-1/5'>${Number(item.price.toFixed(2))}</div>
      <div className='basis-1/5'>{item.method}</div>
    </div>
  )
}
export default Page