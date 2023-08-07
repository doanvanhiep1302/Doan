import HTTP from "../http-common";
import {PRODUCT} from '../endpoints';
import authHeader from "../auth-header";

export const getProduct = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: PRODUCT.GET,
        method: "POST",
        data: payload,
    })
}

export const getAllProduct = () => {
    return HTTP({
        headers: authHeader(),
        url: PRODUCT.GET_ALL,
        method: "get"
    })
}

export const getProductDetail = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: PRODUCT.GET_DETAIl,
        method: "GET",
        params: payload
    })
}

export const saveProduct = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: PRODUCT.ADD,
        method: "post",
        data: payload
    })
}

const urlAddProduct = "/admin/product/update-product-history"

export const addProductNumber = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: urlAddProduct,
        method: "post",
        data: payload
    })
}

export const updateProduct = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: PRODUCT.UPDATE,
        method: "post",
        data: payload
    })
}

export const deleteProduct = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: PRODUCT.UPDATE,
        method: "get",
        params: payload
    })
}