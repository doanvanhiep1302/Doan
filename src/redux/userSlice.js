import {createSlice} from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const userSlice = createSlice({
    name: 'user',
    initialState: user
        ? {isLoggedIn: true, user}
        : {isLoggedIn: false, user: null},

    reducers: {
        registerSuccess(state, action) {
            return {
                ...state,
                isLoggedIn: false,
            };
        },
        registerFail(state, action) {
            return {
                ...state,
                isLoggedIn: false,
            }
        },
        loginSuccess(state, action) {
            return {
                ...state,
                isLoggedIn: true,
                user: action.payload.user,
            }
        },
        loginFail(state, action) {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            }
        },
        logout(state, action) {
            return {
                // ...state,
                isLoggedIn: false,
                user: null,
            }
        },
    }
});

const {actions, reducer} = userSlice;
export const {addUser, registerSuccess, registerFail, loginSuccess, loginFail, logout} = actions;
export default reducer;