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
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4

                }
            },
            {
                name: "Ruffles",
                stock: 0,
                price: 1.5,
                id: 2,
                icon: "/icons/chips-3.png",
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4
                }
            },
            {
                name: "Sneakers",
                stock: 3,
                price: 2.29,
                id: 3,
                icon: "/icons/chips-3.png",
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4
                }
            },
            {
                name: "Pop-Tarts",
                stock: 9,
                price: 1.29,
                id: 4,
                icon: "/icons/chips-3.png",
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4
                }
            },
            {
                name: "SunChips",
                stock: 5,
                price: 1.29,
                id: 5,
                icon: "/icons/chips-3.png",
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4
                }
            },
            {
                name: "Granola Bars",
                stock: 2,
                price: 1.29,
                id: 6,
                icon: "/icons/chips-3.png",
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4
                }
            },
            {
                name: "Cookies",
                stock: 2,
                price: 1.29,
                id: 7,
                icon: "/icons/energy-bar.png",
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4
                }
            },
            {
                name: "Cheetos",
                stock: 10,
                price: 1.29,
                id: 8,
                icon: "/icons/energy-bar.png",
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4
                }
            },
            {
                name: "Ruffles",
                stock: 8,
                price: 1.29,
                id: 9,
                icon: "/icons/energy-bar.png",
                expirations:{
                    "2023-01-01":3,
                    "2023-02-02":3,
                    "2024-03-03":4
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
export default machine_dict
