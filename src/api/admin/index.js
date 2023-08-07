import HTTP from "../http-common";
import authHeader from "../auth-header";

export const customerOrderDetailsAll = (payload) => {
    return HTTP({
        url: "/admin/customer-order-details",
        method: "get",
        params: payload,
        headers: authHeader()
    })
}




