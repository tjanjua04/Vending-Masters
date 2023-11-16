"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/states/actions/userActions";
const machine_dict = {
    1: {
        id: 1,
        items: [
            {
                name: "Doritos",
                stock: 8,
                price: 3,
                id: 1,
                icon: "/icons/chips-1.png",
            },
            {
                name: "Ruffles",
                stock: 0,
                price: 1.5,
                id: 2,
                icon: "/icons/chips-2.png",
            },
            {
                name: "Sneakers",
                stock: 3,
                price: 2.29,
                id: 3,
                icon: "/icons/chips-3.png",
            },
            {
                name: "Pop-Tarts",
                stock: 9,
                price: 1.29,
                id: 4,
                icon: "/icons/chips-3.png",
            },
            {
                name: "SunChips",
                stock: 5,
                price: 1.29,
                id: 5,
                icon: "/icons/chips-3.png",
            },
            {
                name: "Granola Bars",
                stock: 2,
                price: 1.29,
                id: 6,
                icon: "/icons/chips-3.png",
            },
            {
                name: "Cookies",
                stock: 2,
                price: 1.29,
                id: 7,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Cheetos",
                stock: 10,
                price: 1.29,
                id: 8,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Ruffles",
                stock: 8,
                price: 1.29,
                id: 9,
                icon: "/icons/energy-bar.png",
            },
        ],
        theme: {
            primary_color: "#444",
        },
        properties: {
            location: "1234 Foo st., Anaheim",
            Status: "Operational",
        },
    },
    2: {
        id: 2,
        items: [
            {
                name: "Gatorade",
                stock: 8,
                price: 3,
                id: 10,
                icon: "/icons/energy-drink.png",
            },
            {
                name: "Iced Tea",
                stock: 3,
                price: 2,
                id: 11,
                icon: "/icons/energy-drink.png",
            },
            {
                name: "Monster",
                stock: 7,
                price: 1.29,
                id: 12,
                icon: "/icons/energy-drink.png",
            },
            {
                name: "Water",
                stock: 10,
                price: 1.29,
                id: 13,
                icon: "/icons/soda-1.png",
            },
            {
                name: "Sprite",
                stock: 10,
                price: 1.5,
                id: 14,
                icon: "/icons/soda-1.png",
            },
            {
                name: "Lemonade",
                stock: 10,
                price: 1.29,
                id: 15,
                icon: "/icons/soda-1.png",
            },
            {
                name: "Lemonade",
                stock: 10,
                price: 1.29,
                id: 15,
                icon: "/icons/soda-1.png",
            },
            {
                name: "Lemonade",
                stock: 10,
                price: 1.29,
                id: 15,
                icon: "/icons/soda-1.png",
            },
            {
                name: "Lemonade",
                stock: 10,
                price: 1.29,
                id: 15,
                icon: "/icons/soda-1.png",
            },
        ],
        theme: {
            primary_color: "#33c",
        },
    },
    3: {
        id: 3,
        items: [
            {
                name: "Chips Ahoy",
                stock: 2,
                price: 2.49,
                id: 13,
                icon: "/icons/cookies.png",
            },
            {
                name: "Pepsi",
                stock: 15,
                price: 1.99,
                id: 14,
                icon: "/icons/soda.png",
            },
            {
                name: "Oatmeal",
                stock: 4,
                price: 3.49,
                id: 15,
                icon: "/icons/oatmeal.png",
            },
            {
                name: "Yogurt",
                stock: 10,
                price: 1.79,
                id: 16,
                icon: "/icons/yogurt.png",
            },
            {
                name: "Oranges",
                stock: 0,
                price: 0.79,
                id: 17,
                icon: "/icons/fruit.png",
            },
            {
                name: "Cereal",
                stock: 0,
                price: 2.99,
                id: 18,
                icon: "/icons/cereal.png",
            },
            {
                name: "Bottled Water",
                stock: 18,
                price: 0.99,
                id: 19,
                icon: "/icons/water.png",
            },
            {
                name: "Frozen Pizza",
                stock: 3,
                price: 4.99,
                id: 20,
                icon: "/icons/pizza.png",
            },
            {
                name: "Ice Cream",
                stock: 8,
                price: 3.49,
                id: 21,
                icon: "/icons/ice-cream.png",
            },
            {
                name: "Cucumbers",
                stock: 10,
                price: 0.99,
                id: 22,
                icon: "/icons/vegetables.png",
            },
            {
                name: "Soda",
                stock: 12,
                price: 1.49,
                id: 23,
                icon: "/icons/soda.png",
            },
            {
                name: "Eggs",
                stock: 14,
                price: 2.29,
                id: 24,
                icon: "/icons/eggs.png",
            },
        ],
        theme: {
            primary_color: "#666",
        },
        properties: {
            location: "5678 Bar St., Springfield",
            Status: "Operational",
        },
    },
};
const Page = () => {
    const [machineIds, setMachineIds] = useState([]);
    const [instructionOpen, setInstructionOpen] = useState(false);
    const [Instruction, setInstruction] = useState();
    const user = useSelector(state => state.user)
    const router = useRouter()
    const dispatch = useDispatch()
    const fetchIds = async () => {
        try {
            setMachineIds(Object.keys(machine_dict));
            return;
            const data = await fetch("http://localhost:5001/machine").then((res) =>
                res.json()
            );
            setMachineIds(data);
        } catch (err) {
            console.log(err.message);
        }
    };
    useEffect(() => {
        fetchIds();
    }, []);
    useEffect(() => {
        if (!user.isAuth) router.push('/restocker/login')
    }, [user])
    if (instructionOpen)
        return (
            <div>
                <div className="bg-gray-600 p-6 text-white text-3xl flex">
                    <div className="grow">
                        <h1>Restocker {user.username}</h1>
                    </div>
                    <div className="text-base">
                        <button>Profile</button>
                    </div>
                </div>
                <button
                    className="p-4 border-[1px] border-black"
                    onClick={() => setInstructionOpen(false)}
                >
                    CLOSE
                </button>
                <div>
                    <ul>
                        <li>YOO DO THIS</li>
                        <li>YOO DO THIS</li>
                        <li>YOO DO THIS</li>
                        <li>YOO DO THIS</li>
                    </ul>
                    <img src="/icons/dab.gif" />
                </div>
            </div>
        );
    return (
        <div className=" dark:bg-black  h-screen">
            <div className="bg-gray-600 p-6 text-white text-3xl flex">
                <div className="grow">
                    <h1>Restocker {user.username}</h1>
                </div>
                <div className="text-base">
                    <button onClick={() => dispatch(logout())}>Logout</button>
                </div>
            </div>

            <div className="flex flex-col justify-start mx-auto max-w-7xl p-6">
                <button
                    className="p-4 text-xl border-[1px] border-black w-auto md:w-[30%]"
                    onClick={() => setInstructionOpen(true)}
                >
                    View Instruction
                </button>
                <h1 className="text-2xl my-4">Machines to restock</h1>
                <div className="flex flex-col w-full ">
                    {machineIds.map((value, index) => (
                        <div key={index} className="p-2 ">
                            <Link
                                href={`/restocker/${value}`}
                                className="w-full hover:bg-blue-300 p-2 rounded-sm border-black border-[1px] bg-gray-200 flex flex-col"
                            >
                                <span className="text-xl mb-2 font-semibold">
                                    Machine 0{value}
                                </span>

                                <span className="pl-4 text-red-600 font-semibold">
                                    Empty slots: 3
                                </span>
                                <span className="pl-4 text-orange-400 font-semibold">
                                    Low in stock slots: 3
                                </span>
                                <span className="pl-4 text-blue-500 font-semibold">
                                    Expired Items: {value + 2}
                                </span>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Page;
