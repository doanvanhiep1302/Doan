export default function authHeader() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.token) {
        return {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json",
            Accept: "application/json, text/plain",
            "Accept-Language": "vi-VN,vi;q=0.9",
            Authorization: "Bearer " + user?.token
            // "x-access-token": user?.token
        };
    } else {
        return {};
    }
}
