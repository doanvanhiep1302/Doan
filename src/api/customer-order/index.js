import HTTP from "../http-common";
import {CUSTOMER_ORDER} from '../endpoints';
import authHeader from "../auth-header";

export const updateCustomerOrder = (payload) => {
    return HTTP({
        url: CUSTOMER_ORDER.UPDATE,
        method: "POST",
        data: payload,
        headers: authHeader()
    })
}

export const getCustomerOrder = (payload) => {
    return HTTP({
        url: CUSTOMER_ORDER.GET_ORDER_IS_PAID,
        method: "GET",
        params: payload,
        headers: authHeader()
    })
}

export const deleteCustomerOrderDetail = (payload) => {
    return HTTP({
        url: CUSTOMER_ORDER.DELETE_CUSTOMER_ORDER,
        method: "GET",
        params: payload,
        headers: authHeader()
    })
}

export const findCustomerOrderByUser = (payload) => {
    return HTTP({
        url: "order/find-by-user",
        method: "GET",
        params: payload,
        headers: authHeader(),
    })
}

export const deleteProduct = (payload) => {
    return HTTP({
        url: "/admin/product/delete",
        method: "GET",
        params: payload,
        headers: authHeader()
    })
}

export const getOrderDetails = (payload) => {
    return HTTP({
        url: "/order/get-details",
        method: "GET",
        params: payload,
        headers: authHeader()
    })
}

export const paymentOrder = (payload) => {
    return HTTP({
        url: "/order/payment",
        method: "POST",
        data: payload,
        headers: authHeader()
    })
}



