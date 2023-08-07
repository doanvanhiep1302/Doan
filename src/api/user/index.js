import HTTP from "../http-common";
import authHeader from "../auth-header";

export const getUserPage = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: "/admin/user",
        method: "get",
        params: payload,
    })
}

export const deleteUser = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: "/admin/delete-user",
        method: "get",
        params: payload,
    })
}

export const getUserDetails = (payload) => {
    return HTTP({
        headers: getUserDetails(),
        url: "/user/get-user-details",
        method: "get",
        params: payload,
    })
}

