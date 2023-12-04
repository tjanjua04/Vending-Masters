import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    totalRevenue: 0,
    totalUnits: 0,
    allTransactions: [],
    focusedTransactions: [],
    topSellingItems: [],
    topSellingInventories: [],
    dailyRevenue:[],
    allInventoryStatus:[],
    focusedInventory:{
        topItems:[],
        lastTransaction:null,
        lastRestock:null,
        lastRestocker:null,
        operation:null,
        id:null
    }

}
export const analytics = createSlice({
    name: "analytics",
    initialState,

    reducers: {
        reset: () => {
            return initialState
        },
        setAllTransactions: (state, action) => {
            return {
                ...state,
                allTransactions: action.payload
            }
        },
        setFocusedTransactions: (state, action) => {
            return {
                ...state,
                focusedTransactions: action.payload
            }
        },
        setTopSellingItems: (state, action) => {
            return {
                ...state,
                topSellingItems: action.payload
            }
        },
        setTopSellingInventories: (state, action) => {
            return {
                ...state,
                topSellingInventories: action.payload
            }
        },
        setSaleSummary: (state,{payload})=>{
            return{
                ...state,
                totalRevenue:payload.totalRevenue,
                totalUnits:payload.totalUnits
            }
        },
        setDailyRevenue:(state,action)=>{
            return{
                ...state,
                dailyRevenue:action.payload
            }
        },
        setAllInventoryStatus:(state,{payload})=>{
            return {
                ...state,
                allInventoryStatus:payload
            }
        },
        setFocusedInventoryAnalytics:(state,{payload})=>{
            return{
                ...state,
                focusedInventory:payload
            }
        }


    }
})

export const { reset, setAllTransactions, setFocusedTransactions,setTopSellingInventories,setTopSellingItems,setSaleSummary,setDailyRevenue,setAllInventoryStatus, setFocusedInventoryAnalytics } = analytics.actions
export default analytics.reducer


