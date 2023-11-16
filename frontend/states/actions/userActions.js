import axios from "axios";
import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGOUT,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPDATE_PROFILE_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_DETAILS_RESET,
} from "../constants/userConstants";

const routeLink = "/api/users/";

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST,
        });
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };

        const { data } = await axios.post(
            routeLink + "login",
            { email, password },
            config
        );

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data,
        });
        localStorage.setItem("UserInfo", JSON.stringify(data));
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        });
    }
};

export const login2 = (email, password) => async (dispatch) => {
    try {
        const { data } = await axios.post(
            'http://127.0.0.1:5003/restocker/login',
            { username, password },
            config
        )
        // dispatch(logi)
    } catch (error) {
        console.log(error)
    }
}
export const logout = () => async (dispatch) => {
    try {
        localStorage.removeItem("UserInfo");
        dispatch({
            type: USER_LOGOUT,
        });
        dispatch({
            type: USER_DETAILS_RESET,
        });
    } catch (err) {
        console.log(err);
    }
};
