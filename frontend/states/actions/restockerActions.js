import { PORT } from "../env"
import axios from "axios"
export const modifyQty = (payload) => async (dispatch) => {
    
    
        const config = {
             header: {
                 "Content-Type": "application/json",
             },
        };
    console.log("MODIFYING QTY")
    console.log(payload)
    const {item_id,action,quantity,expiration}  = payload
    const param = {}
    param.item_id=item_id
    param.action=action
    param.quantity=quantity
    param.expiration=expiration
    console.log(param);
    const {data} = await axios.put(
        `http://127.0.0.1:${PORT}/inventory/${payload.inventory_id}`,
        param,config
        )
    console.log('NEW QTY:')
    console.log(data)
}