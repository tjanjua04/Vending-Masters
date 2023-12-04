import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
    ids: [],
    focusedInventory: null,
    focusedItem: null,
    error: null,
    transaction: {
        status: null,
        complete: false,
        inventoryId: null,
        itemId: null,
        itemName: null,
        price: null,
        method: null
    }

}
export const inventory = createSlice({
    name: "inventory",
    initialState,

    reducers: {
        reset: () => {
            return initialState
        },
        setIds: (state, action) => {
            return {
                ...state,
                ids: action.payload
            }
        },
        setFocusedInventory: (state, action) => {
            return ({
                ...state,
                focusedInventory: action.payload
            })
        },
        setError: (state, action) => {
            return ({
                ...initialState,
                error: action.payload.response.data.msg || "ERROR"
            })
        },
        setFocusedItem: (state, action) => {
            return ({
                ...state,
                focusedItem: action.payload
            })
        },
        setTransaction: (state, action) => {
            console.log(action.payload)
            return ({
                ...state,
                transaction: action.payload
            })
        },
        resetTransactionState: (state, action) => {
            console.log("Reseting")
            return (
                {
                    ...state,
                    transaction: { ...initialState.transaction }
                }
            )
        }

    }
})

export const { setIds,resetTransactionState, setFocusedInventory, setFocusedItem, setError, reset, setTransaction } = inventory.actions
export default inventory.reducer


