import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
const initialState = {
    value: {
        isAuth: false,
        id: "",
        username: "",
        error: null
    }
}
export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: () => {

            return initialState
        },
        login: async (state, action) => {
            try {
                const config = {
                    header: {
                        'Content-Type': 'application/json'
                    }
                }
                const {data} = await axios.post('http://127.0.0.1:5000/restocker/login', { username: action.payload.username, password: action.payload.password }, config)
                return {
                    value: {
                       data
                    }
                }
            } catch (error) {
                console.log(error)
                return {
                    value: { ...initialState, error: true }
                }
            }

        }

    }
})

export const { login, logout } = auth.actions
export default auth.reducer