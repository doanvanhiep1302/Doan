import HTTP from "../http-common";
import {PRODUCT} from '../endpoints';

export const uploadImage = (payload) => {
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
