import React from 'react'

const Page = () => {
    return (
        <div className='flex flex-col max-w-lg mx-auto gap-4 p-4'>
            <button className='border w-full p-4 border-gray-700'>View All Transactions</button>
            <button className='border w-full p-4 border-gray-700'>Send Instruction to a restocker</button>
            <button className='border w-full p-4 border-gray-700'>View Statistics</button>
        </div>
    )
}
export default Page