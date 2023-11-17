import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import machine_dict from "@/app/mockData";
const initialState = {
    ids: [],
    focusedInventory: machine_dict[1],
    error: null

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
                setIds: action.payload
            }
        },
        setInventory: (state, action) => {
            console.log(action.payload.response)
            return ({
                ...initialState,
                focusedInventory: action.payload
            })
        },
        setError: (state, action) => {
            return ({
                ...initialState,
                error: action.payload.response.data.msg || "ERROR"
            })
        }

    }
})

export const { setIds, setInventory, setError, reset } = inventory.actions
export default inventory.reducer


