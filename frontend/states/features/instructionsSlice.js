'use client'
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {
    instructions: JSON.parse(window.localStorage.getItem("instructions")),
    activeInstruction: {
        username: null,
        note: "",
        inventory_id: null
    }

}
export const instruction = createSlice({
    name: "instruction",
    initialState,

    reducers: {
        reset: () => {
            return initialState
        },
        addInstruction: (state, action) => {
            console.log("INSTRUCTION")
            console.log(action.payload)
            let newDict = { ...state.instructions }
            newDict[action.payload.username] = action.payload
            let newState = {
                instructions: { ...newDict }
            }
            console.log("ADDING TO LOCAL")
            console.log(newDict)
            localStorage.setItem("instructions", JSON.stringify(newDict));
            return { ...newState }
        },
        setActiveInstruction: (state, action) => {
            console.log(action.payload)
            return {
                ...state,
                activeInstruction:{ ...state.instructions[action.payload]}
            }
        }

    }
})

export const { addInstruction, setActiveInstruction } = instruction.actions
export default instruction.reducer


