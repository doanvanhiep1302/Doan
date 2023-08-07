import AuthService from "../../services/auth.service";
import {loginFail, loginSuccess, logout, registerFail, registerSuccess} from "../../redux/userSlice";
import {setMessage} from "../../redux/messsage";

export const register = (username, email, password) => (dispatch) => {
    return AuthService.register(username, email, password).then(
        (response) => {
            dispatch(registerSuccess());
            dispatch(setMessage(response.data.message));
            return Promise.resolve();
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(registerFail());

            dispatch(setMessage(message));

            return Promise.reject();
        }
    );
};

export const login = (username, password) => (dispatch) => {
    return AuthService.login(username, password).then(
        (data) => {
            return data;
        },
        (error) => {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();

            dispatch(loginFail());

            dispatch(setMessage(message));

            return Promise.reject();
        }
    );
};

export const logoutService = () => (dispatch) => {
    AuthService.logout();
    dispatch(logout);
    dispatch(logout());
};
