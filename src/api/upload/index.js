import HTTP from "../http-common";
import {PRODUCT, UPLOAD_FILE} from '../endpoints';
import authHeader from "../auth-header";

export const uploadImage = (payload, onUploadProgress) => {
    return HTTP({
        url: PRODUCT.GET,
        method: "POST",
        data: payload,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        onUploadProgress,
    })
}

export const deleteFile = (payload) => {
    return HTTP({
        url: UPLOAD_FILE.DELETE,
        method: "GET",
        params: payload,
        headers: authHeader(),
    })
}
