import HTTP from "../http-common";
import {ORDER_HISTORY} from "../endpoints";
import authHeader from "../auth-header";

export const getOrderHistory = (payload) => {
    return HTTP({
        url: ORDER_HISTORY.GET,
        method: "get",
        data: payload,
        headers: authHeader()
    })
}

export const addOrderHistory = (payload) => {
    return HTTP({
        url: ORDER_HISTORY.ADD,
        method: "post",
        params: payload,
        headers: authHeader()
    })
}

export const updateOrderHistory = (payload) => {
    return HTTP({
        url: ORDER_HISTORY.UPDATE,
        method: "post",
        data: payload,
        headers: authHeader()
    })
}

export const updateStatusOrder = (payload) => {
    return HTTP({
        url: "order-history/change-status",
        method: "post",
        data: payload,
        headers: authHeader()
    })
}


export const deleteOrderHistory = (payload) => {
    return HTTP({
        url: "order-history/delete-order-history",
        method: "post",
        data: payload,
        headers: authHeader()
    })
}

