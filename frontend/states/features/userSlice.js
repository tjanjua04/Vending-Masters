import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {

    isAuth: false,
    id: "",
    username: "",
    error: null

}
export const auth = createSlice({
    name: "auth",
    initialState,

    reducers: {
        logout: () => {
            return initialState
        },
        loginSuccess: (state, action) => {
            return {
                ...state,
                isAuth: true,
                username: action.payload.username,
                userId: action.payload.id,
                error: null
            }
        },
        loginError: (state, action) => {
            console.log(action.payload.response)
            return ({
                ...initialState,
                error: action.payload.response.data.msg||"ERROR"
            })
        }

    }
})

export const { loginSuccess, loginError,logout } = auth.actions
export default auth.reducer