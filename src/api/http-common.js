import axios from "axios";
import { BASE_URL } from "./config";
import EventBus from "../common/EventBus";
import {logout} from "./auth";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

// const user = JSON.parse(localStorage.getItem("user"));
export  function authHeader() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.accessToken };
  } else {
    return {};
  }
}


const HTTP = axios.create({
    baseURL: `${BASE_URL}`,
    // headers: {
    //   "Access-Control-Allow-Origin": "*",
    //   "Content-Type": "application/json",
    //   Accept: "application/json, text/plain",
    //   "Accept-Language": "vi-VN,vi;q=0.9",
    //    Authorization: "Bearer " + user?.token
    //   // "x-access-token": user?.token
    // },
    withCredentials: false,
  });

  const responseHandler = (response) => {
    return response;
  };

  const requestHandler = (request) => {
    // request.headers.Cookies = `VSA:${getCookie("VSA")};`;
    // // request.headers.Cookie = `JSESSIONID:${getCookie('VSA')};`
    // setListAccessPage([
    //   "DASHBOARD",
    //   "EVENT",
    //   "EVENT_CONVERSION",
    //   "INSIGHT_DASHBOARD",
    //   "PREDICTION",
    // ]);
    // const method = request.method.toLowerCase();
    // if (method === "get" || method === "delete") {
    //   const params = request.params || {};
    //   params["projectId"] = "CCAI";
    //   request.params = params;
    // }
    // if (["post", "put", "delete"].includes(method)) {
    //   const data = request.data || {};
    //   data["projectId"] = "CCAI";
    //   request.data = data;
    // }
    return request;
  };
  
  
  const errorHandler = (error) => {
    if (error.response) {
      const {status, data} = error.response;
      if (status === 401 && data.message) {
        logout();

      }
    }
    return Promise.reject(error);
  };
  
  HTTP.interceptors.request.use(
    (request) => requestHandler(request),
    (error) => errorHandler(error)
  );
  
  HTTP.interceptors.response.use(
    (response) => responseHandler(response),
    (error) => errorHandler(error)
  );

  const AxiosInterceptor = ({children}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {

      const resInterceptor = response => {
        return response;
      }

      const errInterceptor = error => {
        // if(error.response.status === 401) {
        //
        //   navigate("/login");
        // }
        return Promise.reject(error);
      }

      const interceptor = HTTP.interceptors.response.use(resInterceptor, errInterceptor);
      return () => HTTP.interceptors.response.eject(interceptor);

    }, [navigate])

    return children;
  }

  export default HTTP;
  export  {AxiosInterceptor}
  