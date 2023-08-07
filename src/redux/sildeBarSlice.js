import {createSlice} from "@reduxjs/toolkit";

const slideBarSlice = createSlice({
    name: 'slideBarSlice',
    initialState: {
        key: "",
    },
    reducers: {
        setSlideBarSelected(state, action) {
            return {
                ...state,
                key: action.payload,
            }
        },
    }
});

const { actions, reducer } = slideBarSlice;
export const { setSlideBarSelected } = actions;
export default reducer;
