import {createSlice} from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: 'category',
    initialState: {
        listCategory: [],
    },
    reducers: {
        addCategory(state, action) {
            return {
                ...state,
                listCategory: action.payload,
            }
        },
    }
});

const { actions, reducer } = categorySlice;
export const { addCategory } = actions;
export default reducer;