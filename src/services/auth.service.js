import axios from "axios";
import {loginApi, registerApi} from "../api/auth";

const API_URL = "http://localhost:8080/api/auth/";

const register = (username, email, password, phoneNumber, fullName, address, role) => {
  return registerApi(
      {
        username: username,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        fullName: fullName,
        address: address,
        role: role
      }
  );
};

const login = (username, password) => {
  return loginApi({
    username: username,
    password: password
  })
      .then((response) => {
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
};
const logout = () => {
  localStorage.removeItem("user");
};

export default {
  register,
  login,
  logout,
};
