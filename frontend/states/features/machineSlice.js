import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    value: {
        machineIds:[],
        activeMachine:{},
        error: null
    }
}
export const machine = createSlice({
    name: "machine",
    initialState,
    reducers: {

        getIds: async (state, action) => {
            
            try {
                const config = {
                    header: {
                        'Content-Type': 'application/json'
                    }
                }
                const { data } = await axios.get('http://localhost:5000/', { }, config)
                console.log(data)
                return {
                    ...state,
                    machineIds:[1,2,3]
                }
            }catch(error){
                console.log(error)
                return{
                    value: {...initialState,error:true}
                }
            }
            
        },
        getMachine:  async (state, action) => {
            try {
                const config = {
                    header: {
                        'Content-Type': 'application/json'
                    }
                }
                const { data } = await axios.post('http://localhost:5000/restocker/login', action.payload , config)
                return {
                    value: {
                        ...state,
                        machine:{}
                    }
                }
            }catch(error){
                return{
                    value: {...initialState,error:true}
                }
            }
            
        }

    }
})

export const { getIds, getMachine } = machine.actions
export default machine.reducer