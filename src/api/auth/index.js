import HTTP from "../http-common";
import {AUTH, MAIL} from '../endpoints';
import authHeader from "../auth-header";

export const registerApi = (payload) => {
    return HTTP({
        url: AUTH.REGISTER,
        method: "post",
        data: payload,
        // headers: authHeader()
    })
}

export const loginApi = (payload) => {
    return HTTP({
        url: AUTH.LOGIN,
        method: "post",
        data: payload,
        // headers: authHeader()
    })
}

export const logout = () => {
    localStorage.removeItem("user");
};

export const sendMail = (payload) => {
    return HTTP({
        url: MAIL.MAIL,
        method: "post",
        data: payload,
        headers: authHeader()
    })
}

export const changePassword = (payload) => {
    return HTTP({
        url: "/user/change-password",
        method: "post",
        data: payload,
        headers: authHeader()
    })
}

export const findUserLogin = (payload) => {
    return HTTP({
        url: "/api/auth/get-user-login",
        method: "get",
        headers: authHeader()
    })
}

export const updateUser = (payload) => {
    return HTTP({
        url: "/user/update-user",
        method: "post",
        data: payload,
        headers: authHeader()
    })
}
