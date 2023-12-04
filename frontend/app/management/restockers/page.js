'use client'
import React, { useEffect, useState } from 'react'
import { restockers } from '@/app/mockData'
import { useDispatch, useSelector } from 'react-redux'
import { addInstruction } from '@/states/features/instructionsSlice'
import { fetchInventoryIds } from '@/states/actions/inventoryActions'
const Restocker = () => {
    const [open, setOpen] = useState(false)
    const [selectedRestocker ,setRestocker] = useState({})
    const [selectedInventoryId ,setSelectedInventory] = useState(1)
    const {ids} = useSelector(state=>state.inventory)
    const [note,setNote] = useState("")

    const dispatch = useDispatch()
    const handleAssign = (restocker) => {
        setOpen(true)
        setRestocker(restocker)
    }
    const handleNewInstruction = () =>{
        let instruction={
            username:selectedRestocker.username,
            note:note,
            inventory_id:selectedInventoryId
        }
        dispatch(addInstruction(instruction))
    }
    useEffect(()=>{
        dispatch(fetchInventoryIds())
    },[])
    return (
        <>
            <div className='flex flex-col px-6'>
                {/* <button className='p-4 bg-slate-800 text-white'>
                View all restocker employees</button>
            <button className='p-4 bg-slate-800 text-white'>
                Push instructions to a restockers device
            </button> */}
                <div className='flex p-4 bg-black text-white mb-4 rounded'>
                    <span className='basis-10'>ID</span>
                    <span className='grow'>Name</span>
                    <span className='grow'>Last Assigned</span>
                    {/* <button className='p-2 bg-blue-400'></button> */}
                </div>
                {restockers.map((restocker, index) =>
                    <div key={index} className='flex p-4 even:bg-white odd:bg-gray-100'>
                        <span className='basis-10'>{restocker.id}</span>
                        <span className='grow'>{restocker.name}</span>
                        <span className='grow'>{restocker.lastAssigned}</span>
                        <button className='p-1 bg-blue-400 text-white ' onClick={() => handleAssign(restocker)}>Assign Inventory</button>
                    </div>
                )}
            </div>
            {open && <Overlay note={note} setNote={setNote} setOpen={setOpen} handleNewInstruction={handleNewInstruction} setSelectedInventory={setSelectedInventory} restocker={selectedRestocker} ids={ids} />}
        </>
    )
}
const Overlay = ({ setOpen, restocker,ids, handleNewInstruction,setSelectedInventory,note,setNote }) => {

    return (
        <div className='fixed h-full w-full bg-black bg-opacity-60 top-0 left-0 flex items-center justify-center'>
            <div className='w-[30%] max-w-md p-2  md:p-6  bg-white flex flex-col gap-4'>
            <div className='flex gap-1 items-center'>
                    <span className='grow'>Assign to:</span>
                    <span className='text-gray-400 text-sm'>#{restocker.id}</span>
                    <span className='text-gray-800'>{restocker.name}</span>
                </div>
                <div className='flex gap-1 items-center'>
                    <span className='grow'>Select Inventory:</span>
                    <select onChange={(e)=>setSelectedInventory(e.target.value)}>
                        {ids.map((id,index)=>(
                            <option key={index} value={id}>{id}</option>
                        ))}
                    </select>
                </div>

                <textarea value={note} onChange={(e)=>setNote(e.target.value)} className='aspect-[4/1] text-start border border-gray-300 p-2  flex items-start' type='text' placeholder='Note to restocker' />
                <button className='bg-blue-400 text-white p-2' onClick={() => {
                    handleNewInstruction()
                    setOpen(false)
                    }}>Submit</button>
            </div>

        </div>
    )
}
export default Restocker