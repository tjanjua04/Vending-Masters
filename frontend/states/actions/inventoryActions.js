import axios from "axios";
import { setIds, setFocusedInventory, setFocusedItem as setItem, setTransaction,resetTransactionState } from "../features/inventorySlice";
import { PORT } from "../env";

export const fetchInventory = (payload) => async (dispatch) => {
    try {
        const config = {
             header: {
                 "Content-Type": "application/json",
             },
        };
        const { data } = await axios.get(
             `http://127.0.0.1:${PORT}/inventory/${payload}`,
        )
        console.log(`FETCHED INVENTORY #${payload}:`);
        // const x = machine_dict[payload]
        // console.log(x)
        console.log(data)
        dispatch(setFocusedInventory(data))
    } catch (error) {
        console.log(error)
    }
}
export const fetchInventoryIds = () => async (dispatch) => {
    try {
        console.log("FETCHED INVENTORY IDS:");
        const { data } = await axios.get(
             `http://127.0.0.1:${PORT}/inventory/`,
        )
        console.log(data)
        dispatch(setIds(data))
    } catch (err) {
        console.log(err);
    }
};
export const setFocusedItem = (payload) => (dispatch)=>{
    dispatch(setItem(payload))
}

export const initiateTransaction = (payload) =>async (dispatch) =>{
    // TODO: SAVE TRANSACTION DATA
    console.log(payload);
    // axios.post(
    //     `http://127.0.0.1:5003/transaction/`,
    //     payload
    //     )
    // setTransaction(payload)
    dispatch(setTransaction({
        ...payload,
        complete:true,
        status:'Complete'
    }))
}

export const resetTransaction = () =>(dispatch)=>dispatch(resetTransactionState())