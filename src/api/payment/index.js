import HTTP from "../http-common";
import authHeader from "../auth-header";
import {PAYMENT} from "../endpoints";

export const createPayment = (payload) => {
    return HTTP({
        url: PAYMENT.CREATE_PAYMENT,
        method: "post",
        data: payload,
        headers: authHeader()
    })
}



