import axios from "axios";
import { loginError, loginSuccess, logout as removeAuth } from "../features/userSlice";
// import {
//     USER_LOGIN_REQUEST,
//     USER_LOGIN_SUCCESS,
//     USER_LOGIN_FAIL,
//     USER_LOGOUT,
//     USER_REGISTER_REQUEST,
//     USER_REGISTER_SUCCESS,
//     USER_REGISTER_FAIL,
//     USER_DETAILS_REQUEST,
//     USER_DETAILS_SUCCESS,
//     USER_DETAILS_FAIL,
//     USER_UPDATE_PROFILE_SUCCESS,
//     USER_UPDATE_PROFILE_FAIL,
//     USER_UPDATE_PROFILE_REQUEST,
//     USER_DETAILS_RESET,
// } from "../constants/userConstants";

const routeLink = "/api/users/";

export const login = (payload) => async (dispatch) => {
    try {
        let { username, password } = payload
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            'http://127.0.0.1:5003/restocker/login',
            { username, password },
            config
        )
        console.log(data)
        dispatch(loginSuccess({
            username,
            id: "123"
        }))
    } catch (error) {
        dispatch(loginError())
    }
}
export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("UserInfo");
        dispatch(removeAuth());
    } catch (err) {
        console.log(err);
    }
};
