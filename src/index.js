import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import {BrowserRouter, BrowserRouter as Routes, HashRouter, Route} from "react-router-dom";
import App from "./App";
import ScrollToTop from "./Components/ScrollToTop";
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {store} from "./store";
import { AxiosInterceptor } from './api/http-common';
import {Suspense} from "react";
import './i18n';
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faUser } from '@fortawesome/free-solid-svg-icons';


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            {/*<PersistGate persistor={customPersistStore}>*/}

            <BrowserRouter>
                    <ScrollToTop/>
                    <Suspense fallback="Loading...">
                        <AxiosInterceptor>
                        <App/>
                        </AxiosInterceptor>
                    </Suspense>
                </BrowserRouter>
            <ToastContainer />
            {/*</PersistGate>*/}
        </Provider>,
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
