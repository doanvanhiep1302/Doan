export const CATEGORY = {
    GET_ALL: "/category/get-all",
    ADD: "/category/add",
    UPDATE: "/category/update",
    GET_DETAIl: "/category/get-detail"
}

export const PRODUCT = {
    GET: "/product/get",
    GET_ALL: "product/get-all",
    ADD: "/admin/product/add",
    UPDATE: "/admin/product/update",
    GET_DETAIl: "/product/get-details"
}

export const FILTER = {
    GET_ALL_COLLECTION: "/filter/get-all-collection",
    GET_ALL_COLOR: "/filter/get-all-color",
    GET_ALL_SIZE: "/filter/get-all-size",
    GET_BY_CATEGORY: "/filter/get-by-category",
    ADD_COLLECTION: "/admin/filter/add-collection"
}

export const CUSTOMER_ORDER = {
    UPDATE: "/order/update",
    GET_ORDER_IS_PAID: "/order/find-order-active-by-user",
    DELETE_CUSTOMER_ORDER: "/order/delete-detail"
}

export const ORDER_HISTORY = {
    GET: "/order-history/get",
    UPDATE: "/order-history/update",
    ADD: "/order-history/add",
}

export const AUTH = {
    LOGIN: "/api/auth/signin",
    REGISTER: "/api/auth/signup"
}

export const MAIL = {
    MAIL: "/api/auth/send-email",
    RESET: "/api/auth/reset-password"
}

export const OTP = {
    MAIL: "/otp/generate-otp",
    VALIDATE_OTP: "/otp/validate-otp"
}

export const UPLOAD_FILE= {
    DELETE: "/admin/upload/delete",
}

export const PAYMENT = {
    CREATE_PAYMENT: "/payment/create_payment"
}

