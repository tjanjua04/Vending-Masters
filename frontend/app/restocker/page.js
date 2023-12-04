"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchInventoryIds } from "@/states/actions/inventoryActions";
import { setActiveInstruction } from "@/states/features/instructionsSlice";

const Page = () => {
    const [machineIds, setMachineIds] = useState([]);
    const [instructionOpen, setInstructionOpen] = useState(false);
    const [Instruction, setInstruction] = useState();
    const user = useSelector(state => state.user)
    const { ids } = useSelector(state => state.inventory)
    const { activeInstruction } = useSelector(state => state.instructions)
    const dispatch = useDispatch()
    const router = useRouter()

    const fetches = () => {
        dispatch(fetchInventoryIds());
        console.log("FETCHING INSTRUCTION FOR")
        console.log(user.username)
        if (user.username) dispatch(setActiveInstruction(user.username))

    }
    useEffect(() => {
        fetches()
    }, []);
    useEffect(() => {
        console.log(activeInstruction)
    }, [activeInstruction])
    if (instructionOpen) {
        return (
            <>
                <InstructionPage setInstructionOpen={setInstructionOpen} />
            </>)
    }
    return (


        <div className="flex flex-col justify-start mx-auto max-w-7xl p-6 w-full">
            <div className="p-2 flex flex-col gap-2">
                <h1 className="text-3xl font-semibold">Instruction</h1>
                <span className="p-2 border-b border-gray-400 my-4 text-lg">Note from management</span>
                <p className="px-4 py-2">{activeInstruction.note}</p>
                <span className="p-2 border-b border-gray-400 my-4 text-lg">Items that need restocking</span>
                
            </div>
            
            <Link
                href={`/restocker/${activeInstruction.inventory_id}`}
                className="p-4 text-xl border-[1px] border-black w-auto md:w-[30%] mb-28"
                // onClick={() => setInstructionOpen(true)}
            >
                VIEW ASSIGNED INVENTORY <span className="opacity-80">(#{activeInstruction.inventory_id})</span>
            </Link>

            <h1 className="text-2xl my-4">All Inventory (DEMO)</h1>
            <div className="flex flex-col w-full ">
                {ids.map((value, index) => (
                    <div key={index} className="p-2 w-full ">
                        <Link
                            href={`/restocker/${value}`}
                            className="block hover:bg-blue-300 p-3 rounded-sm border-black border-[1px] bg-gray-200 "
                        >
                            <span className="text-xl font-semibold">
                                Machine {value}
                            </span>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Page;

// TODO
const InstructionPage = ({ setInstructionOpen }) => {
    return (
        <div className="flex flex-col justify-start mx-auto max-w-7xl p-6 w-full">

            <button
                className="p-4 border-[1px] border-black place-self-end"
                onClick={() => setInstructionOpen(false)}
            >
                CLOSE
            </button>
            <div>
                <h1 className="text-xl mb-2">Assigned Inventory To Restock</h1>
                <div className="p-2 w-full bg-blue-300">
                    <Link
                        href={`/restocker/1}`}
                        className="block hover:bg-blue-300 p-3 rounded-sm border-black border-[1px] bg-gray-200 "
                    >
                        <span className="text-xl font-semibold">
                            Machine 0{1}
                        </span>
                        {/* 
                                <span className="pl-4 text-red-600 font-semibold">
                                    Empty slots: 3
                                </span>
                                <span className="pl-4 text-orange-400 font-semibold">
                                    Low in stock slots: 3
                                </span>
                                <span className="pl-4 text-blue-500 font-semibold">
                                    Expired Items: {value + 2}
                                </span> */}
                    </Link>
                </div>
            </div>
        </div>
    )
}
