import React from 'react'

const Restocker = () => {
    return (
        <div className='flex flex-col gap-4'>
            <button className='p-4 bg-slate-800 text-white'>
                View all restocker employees</button>
            <button className='p-4 bg-slate-800 text-white'>
                Push instructions to a restockers device
            </button>
        </div>
    )
}

export default Restocker