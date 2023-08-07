import {createSlice} from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        id: "",
        user: null,
        total: 0,
        subTotal:0,
        shipCost: null,
        quantity: null,
        status: 0,
        customerOrderDetails: [],
    },
    reducers: {
        getCart(state, action) {
                return {
                    ...state,
                    id: action?.payload?.id || null,
                    user: action?.payload?.user || null,
                    total: action?.payload?.total || null,
                    subTotal: action?.payload?.subTotal || null,
                    shipCost: action?.payload?.shipCost || null,
                    quantity: action?.payload?.quantity || null,
                    status: action?.payload?.status || null,
                    customerOrderDetails: action?.payload?.customerOrderDetails || [],
                }

        },
    }
});

const { actions, reducer } = userSlice;
export const { addToCart, getCart } = actions;
export default reducer;