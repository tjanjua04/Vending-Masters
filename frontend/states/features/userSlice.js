import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState = {

    isAuth: false,
    id: "",
    username: "",
    lastAssigned:0,
    name:"",
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
                id: action.payload.id,
                name:action.payload.name,
                lastAssigned:action.payload.lastAssigned,
                error: null
            }
        },
        loginError: (state, action) => {
            console.log(action.payload.response)
            let errorMsg = ''
            try{
                errorMsg=action.payload.response.data.msg
            }catch(error){
                errorMsg = 'ERROR'
            }
            return ({
                ...initialState,
                error: errorMsg
            })
        }

    }
})

export const { loginSuccess, loginError,logout } = auth.actions
export default auth.reducer