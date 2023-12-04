const machine_dict = {
    1: {
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
            },
        ],
        theme: {
            primary_color: "#444",
        },
        location: "Los Angeles",
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
                name: "Egg",
                stock: 7,
                price: 6.50,
                id: 12,
                icon: "/icons/egg.png",
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
        location: "Fullerton, CA",
        theme: {
            primary_color: "#33c",
        },
    },
    3: {
        id: 3,
        items: [
            {
                name: "Chips Ahoy",
                stock: 7,
                price: 2.49,
                id: 13,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Pepsi",
                stock: 15,
                price: 1.99,
                id: 14,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Oatmeal",
                stock: 4,
                price: 3.49,
                id: 15,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Yogurt",
                stock: 10,
                price: 1.79,
                id: 16,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Oranges",
                stock: 20,
                price: 0.79,
                id: 17,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Cereal",
                stock: 6,
                price: 2.99,
                id: 18,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Bottled Water",
                stock: 18,
                price: 0.99,
                id: 19,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Frozen Pizza",
                stock: 3,
                price: 4.99,
                id: 20,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Ice Cream",
                stock: 8,
                price: 3.49,
                id: 21,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Cucumbers",
                stock: 10,
                price: 0.99,
                id: 22,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Soda",
                stock: 12,
                price: 1.49,
                id: 23,
                icon: "/icons/energy-bar.png",
            },
            {
                name: "Eggs",
                stock: 14,
                price: 2.29,
                id: 24,
                icon: "/icons/energy-bar.png",
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
const summary = {
    totalRevenue: 12400,
    totalSold: 9350,
    topItems: [{
        name: "Doritos",
        quantity: 300
    }, {
        name: "Ruffles",
        quantity: 245
    }, {
        name: "Coca Cola",
        quantity: 220
    }, {
        name: "Sneakers",
        quantity: 195
    }, {
        name: "Water",
        quantity: 166
    },],
    topVm: [{
        id: 1,
        revenue: 1604,
        location: "Los Angeles, CA"
    }, {
        id: 2,
        revenue: 1250,
        location: "Tustin, CA"
    }, {
        id: 3,
        revenue: 980,
        location: "Fullerton, CA"
    }, {
        id: 4,
        revenue: 882,
        location: "Riverside, CA"
    }, {
        id: 5,
        revenue: 645,
        location: "San Bernardino, CA"
    },],
    status: [
        {
            id: 10,
            low: 3,
            empty: 0,
            operation: false
        },
        {
            id: 6,
            low: 8,
            empty: 5,
            operation: true
        }, {
            id: 7,
            low: 4,
            empty: 4,
            operation: true
        }, {
            id: 8,
            low: 4,
            empty: 4,
            operation: true
        }, {
            id: 9,
            low: 3,
            empty: 2,
            operation: true
        },
    ]
}
const transactions = [
    {
        id: 1,
        item_name: "Doritos",
        item_id: 1,
        time: "2023-11-27 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 1,
        item_name: "Ruffles",
        item_id: 3,
        time: "2023-11-25 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 2,
        item_name: "Doritos",
        item_id: 2,
        time: "2023-11-27 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'cash'
    },

    {
        id: 3,
        item_name: "Ruffles",
        item_id: 3,
        time: "2023-11-27 15:30:45",
        price: 1.25,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 4,
        item_name: "Ruffles",
        item_id: 4,
        time: "2023-11-01 15:30:45",
        price: 1.25,
        inventory_id: 2,
        method: 'cash'
    },
    {
        id: 5,
        item_name: "Ruffles",
        item_id: 5,
        time: "2023-11-01 15:30:45",
        price: 1.25,
        inventory_id: 2,
        method: 'cash'
    },
    {
        id: 6,
        item_name: "Sneakers",
        item_id: 6,
        time: "2023-11-01 15:30:45",
        price: 2.00,
        inventory_id: 2,
        method: 'cash'
    },
    {
        id: 18,
        item_name: "Sneakers",
        item_id: 6,
        time: "2023-11-03 15:30:45",
        price: 2.00,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 7,
        item_name: "Sneakers",
        item_id: 7,
        time: "2023-11-01 15:30:45",
        price: 2.00,
        inventory_id: 3,
        method: 'cash'
    },
    {
        id: 8,
        item_name: "Water",
        item_id: 2.00,
        time: "2023-11-04 15:30:45",
        price: 2,
        inventory_id: 3,
        method: 'cash'
    },
    {
        id: 17,
        item_name: "Pop-Tarts",
        item_id: 1.50,
        time: "2023-11-06 15:30:45",
        price: 2,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 9,
        item_name: "Water",
        item_id: 9,
        time: "2023-11-03 15:30:45",
        price: 2.00,
        inventory_id: 3,
        method: 'card'
    },
    {
        id: 10,
        item_name: "Gatorade",
        item_id: 10,
        time: "2023-11-03 15:30:45",
        price: 2.50,
        inventory_id: 3,
        method: 'cash'
    },
    {
        id: 11,
        item_name: "Doritos",
        item_id: 2,
        time: "2023-11-25 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'card'
    },
    {
        id: 12,
        item_name: "Doritos",
        item_id: 2,
        time: "2023-11-25 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 13,
        item_name: "Doritos",
        item_id: 2,
        time: "2023-11-26 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 14,
        item_name: "Doritos",
        item_id: 2,
        time: "2023-11-26 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 15,
        item_name: "Doritos",
        item_id: 2,
        time: "2023-11-17 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'cash'
    },
    {
        id: 16,
        item_name: "Doritos",
        item_id: 2,
        time: "2023-11-18 15:30:45",
        price: 1.50,
        inventory_id: 2,
        method: 'card'
    },
    {
        id: 19,
        item_name: "SunChips",
        item_id: 12,
        time: "2023-11-17 15:30:45",
        price: 1.50,
        inventory_id: 1,
        method: 'card'
    },
];
const restockers = [{
    id: 1,
    username: 'admin1',
    password: 'admin',
    name: 'John Doe 1',
    lastAssigned: 1
}, {
    id: 2,
    username: 'admin2',
    password: 'admin',
    name: 'John Doe 2',
    lastAssigned: 3
}, {
    id: 3,
    username: 'admin3',
    password: 'admin',
    name: 'John Doe 3',
    lastAssigned: 2
}, {
    id: 4,
    username: 'admin4',
    password: 'admin',
    name: 'John Doe 4',
    lastAssigned: 2
}]

const inventoryDetail = {
    1: { lastTransaction: '2023-11-29 11:20:11', lastRestock: '2023-11-29 11:20:11', lastRestocker: 'John Doe', operation: true },
    2: { lastTransaction: '2023-11-28 12:20:11', lastRestock: '2023-11-26 11:20:11', lastRestocker: 'John Reeves', operation: true },
    3: { lastTransaction: '2023-11-30 11:20:11', lastRestock: '2023-11-19 11:20:11', lastRestocker: 'John Apple', operation: true },

}

export { summary, transactions, restockers, inventoryDetail }
export default machine_dict
