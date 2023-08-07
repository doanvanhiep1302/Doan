import {createSlice} from "@reduxjs/toolkit";

const user = JSON.parse(localStorage.getItem("user"));

const messageSlice = createSlice({
    name: 'user',
    initialState : {},

    reducers: {
        setMessage(state, action) {
            return { message: action.payload };

        },
        clearMessage(state, action) {
            return { message: "" };
        },
    }
});

const {actions, reducer} = messageSlice;
export const {setMessage, clearMessage} = actions;
export default reducer;