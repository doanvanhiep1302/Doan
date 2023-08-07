import HTTP from "../http-common";
import {CATEGORY} from '../endpoints';
import authHeader from "../auth-header";

export const getAllCategory = () => {
    return HTTP({
        url: CATEGORY.GET_ALL,
        method: "GET",
        headers: authHeader()
    })
}

export const getCategoryDetail = (payload) => {
    return HTTP({
        url: CATEGORY.GET_DETAIl,
        method: "GET",
        params: payload,
        headers: authHeader()
    })
}