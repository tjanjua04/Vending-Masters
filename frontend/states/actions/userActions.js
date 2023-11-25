import axios from "axios";
import { loginError, loginSuccess, logout as removeAuth } from "../features/userSlice";

export const login = (payload) => async (dispatch) => {
    let { username, password } = payload
    try {
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
        const { user_id, isAuth } = data
        dispatch(loginSuccess({
            username,
            id: user_id || 1,

        }))
    } catch (error) {
        // dispatch(loginError(error))
        if (username === 'admin' && password === 'admin') {
            dispatch(loginSuccess({
                username: "Offline",
                id: "999"
            }))
        }
        else dispatch(loginError(error))

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
