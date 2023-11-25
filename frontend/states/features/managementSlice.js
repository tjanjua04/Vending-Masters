import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import machine_dict from "@/app/mockData";
const initialState = {
    topVm:[],
    topItem:[],
    error: null

}
export const management = createSlice({
    name: "management",
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

export const { setIds, setInventory, setError, reset } = management.actions
export default management.reducer


