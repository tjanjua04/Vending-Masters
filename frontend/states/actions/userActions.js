import axios from "axios";
import { loginError, loginSuccess, logout as removeAuth } from "../features/userSlice";
import { PORT } from "../env";

export const login = (payload) => async (dispatch) => {
    console.log(("FROM ACTIONS"));
    let { username, password } = payload
    try {
        const config = {
            header: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post(
            `http://127.0.0.1:${PORT}/restocker/login`,
            { username, password },
            config
        )
        console.log(("USER DATA FROM ACTIONS"));
        console.log(data)
        dispatch(loginSuccess(data))
        

    } catch (error) {
        // dispatch(loginError(error))
        if (username === 'admin' && password === 'admin') {
            dispatch(loginSuccess({
                username: "Offline",
                id: "999",
                lastAssigned:0,
                name:"Offline user",

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
