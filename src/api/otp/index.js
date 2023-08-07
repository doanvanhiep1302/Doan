import HTTP from "../http-common";
import { OTP} from "../endpoints";
import authHeader from "../auth-header";

export const generateOTP = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: OTP.MAIL,
        method: "post",
        data: payload,
    })
}

export const validateOTP = (payload) => {
    return HTTP({
        headers: authHeader(),
        url: OTP.VALIDATE_OTP,
        method: "post",
        data: payload
    })
}
