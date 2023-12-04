import { useSelector } from "react-redux";
import { setAllTransactions, setDailyRevenue, setFocusedInventoryAnalytics, setFocusedTransactions, setSaleSummary, setTopSellingInventories, setTopSellingItems } from "../features/analyticsSlice"
import { transactions, inventoryDetail } from "@/app/mockData"
import axios from 'axios'

export const filterTransactions = (filters) => async (dispatch,getState) => {
    // TODO FILTE ALL TRANSACTIONS
    const { allTransactions } = getState().analytics
    let filteredList
    filteredList = allTransactions.filter(function (item) {
        for (var key in filters) {
            if (item[key] === undefined || item[key] != filters[key])
                return false;
        }
        return true;
    });
    console.log(filters);
    console.log("FILTERED TRANSACTIONS");
    console.log(filteredList)
    dispatch(setFocusedTransactions(filteredList))

}
export const fetchAllTransactions = () => async (dispatch) => {
    const { data } = await axios.get('http://127.0.0.1:500/transaction')
    console.log("TRANSACTIONS")
    console.log(data)
    dispatch(setAllTransactions(data))
    // dispatch(setAllTransactions(transactions))
}

// DIVIDER CALCULATE ANALYTICS FOR SUMMARY PAGE
export const calculateSummary = (days) => async (dispatch) => {
    const isWithingPastXdays = (item) => {
        const itemTime = new Date(item.time);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - days);

        return itemTime >= sevenDaysAgo;
    };
    //Filteres list DIVIDER
    // Filter transactions that occurred within the past x days
    let filteredTransactions = transactions.filter(isWithingPastXdays);
    // Total Revenue and Units sold DIVIDER
    // console.log("FILTERED TRANSACTIONS")
    // console.log(filteredTransactions)
    let totalRevenue = filteredTransactions.reduce((total, curr) => total + curr.price, 0)
    let totalUnits = filteredTransactions.length
    dispatch(setSaleSummary({ totalRevenue, totalUnits }))

    // Top sellers DIVIDER
    const groupedItem = Object.groupBy(filteredTransactions, ({ item_name }) => item_name)
    const items = Object.values(groupedItem)
    const aggregatedData = {};

    // Iterate through each subarray and aggregate prices for each id
    items.forEach(subarray => {
        subarray.forEach(item => {
            const { item_name, price } = item;
            aggregatedData[item_name] = (aggregatedData[item_name] || 0) + price;
        });
    });

    // Convert the aggregated data object to the desired format
    const topItems = Object.keys(aggregatedData).map(name => ({ name: name, total: aggregatedData[name], units: groupedItem[name].length }));

    topItems.sort((a, b) => b.total - a.total)
    // console.log("TOP SELLING ITEMS")
    // console.log(topItems)
    dispatch(setTopSellingItems(topItems))

    // Top Inventories DIVIDER
    const groupedInventory = Object.groupBy(filteredTransactions, ({ inventory_id }) => inventory_id)
    // 2D array
    const inventories = Object.values(groupedInventory)
    const aggregated = {};

    // Iterate through each subarray and aggregate prices for each id
    inventories.forEach(subarray => {
        subarray.forEach(item => {
            const { inventory_id, price } = item;
            aggregated[inventory_id] = (aggregated[inventory_id] || 0) + price;
        });
    });

    // Convert the aggregated data object to the desired format
    const topInventories = Object.keys(aggregated).map(inventory_id => ({ inventory_id: inventory_id, total: aggregated[inventory_id], units: groupedInventory[inventory_id].length }));

    topInventories.sort((a, b) => b.total - a.total)
    // console.log("TOP INVENTORIES")
    // console.log(topInventories)
    dispatch(setTopSellingInventories(topInventories))

    // Daily Revenue DIVIDER
    let pastDates = getPastDates(null, null, days)
    filteredTransactions.map((item) => {
        let key = item.time.split(' ')[0]
        pastDates[key].revenue += item.price
        pastDates[key].units += 1
        // console.log(item)
    })
    // console.log(pastDates)
    dispatch(setDailyRevenue(Object.values(pastDates)))
}

// DIVIDER GET INVENTORY ANALYTICS
export const getInventoryAnalytics = (id) => async (dispatch, getState) => {
    await dispatch(filterTransactions({ inventory_id: Number(id) }))


    // const data = axios.get()
    const data = inventoryDetail[Number(id)]
    const { lastTransaction, lastRestock, lastRestocker, operation } = data
    const { focusedTransactions } = getState().analytics
    // Top sellers DIVIDER
    const groupedItem = Object.groupBy(focusedTransactions, ({ item_name }) => item_name)
    const items = Object.values(groupedItem)
    const aggregatedData = {};

    // Iterate through each subarray and aggregate prices for each id
    items.forEach(subarray => {
        subarray.forEach(item => {
            const { item_name, price } = item;
            aggregatedData[item_name] = (aggregatedData[item_name] || 0) + price;
        });
    });

    // Convert the aggregated data object to the desired format
    const topItems = Object.keys(aggregatedData).map(name => ({ name: name, total: aggregatedData[name], units: groupedItem[name].length }));

    topItems.sort((a, b) => b.total - a.total)
    // console.log("TOP SELLING ITEMS")
    console.log(topItems)
    dispatch(setFocusedInventoryAnalytics({
        ...data,
        topItems,
        id: Number(id)
    }))

}


function getPastDates(fromDate, toDate, range) {
    const currentDate = new Date();
    const pastDates = {};

    for (let i = range; i > 0; i--) {
        const pastDate = new Date(currentDate);
        pastDate.setDate(currentDate.getDate() - i);

        const formattedDate = pastDate.toISOString().split('T')[0];
        pastDates[formattedDate] = {
            revenue: 0,
            units: 0,
            date: formattedDate
        };
    }

    return pastDates;
}

