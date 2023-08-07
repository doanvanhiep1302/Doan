import HomePage from './Components/Homepage/HomePage';
import DetailProduct from './Components/Homepage/DetailProduct/detailProduct';
import {Route, HashRouter, Routes, BrowserRouter, useNavigate} from 'react-router-dom';
import AboutUs from './Components/AboutUs/aboutUs';
import Login from './Components/Login';
import ForgotPass from './Components/ForgotPassWord';
import SignUp from './Components/Register';
import HomePageMan from './Components/Homepage/HomPageMan';
import HomePageWoman from './Components/Homepage/HomePageWoman';
import HomePageBestSeller from './Components/Homepage/HomePageBestSeller';
import Accounts from "./Admin/Accounts";
import Orders from "./Admin/Order";
import AddAccount from "./Admin/Accounts/addAccounts";
import AddCustomer from "./Admin/Customers/addCustomer";
import AddProduct from "./Admin/Products/addProduct";
import Products from "./Admin/Products/products";
import Customers from "./Admin/Customers";
import AdminHome from "./Admin";
import {useCallback, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import { history } from "./history";
import {clearMessage} from "./redux/messsage";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {logout} from "./redux/userSlice";
import EventBus from "./common/EventBus";
import ResetPass from "./Admin/ResetPass";
import AccountInfo from "./Components/AccountInfo";
import {Payment} from "@mui/icons-material";
import PaymentOrder from "./Components/Payment";
import {logoutService} from "./api/action/auth";
import HomePageCollection from "./Components/HomeFilterCollections";
import PaymentSuccess from "./Components/PaymenSuccess";
import VewCustomersDetail from "./Components/VewCustomersDetail";


function App() {
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const dispatch = useDispatch();
    const { user: currentUser } = useSelector((state) => state.userSlice);
    const navigator = useNavigate();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    const logOut = () => {
        dispatch(logoutService());
        dispatch(logout);

    };

    useEffect(() => {
        if (currentUser) {
            setShowAdminBoard(currentUser.roles.includes("ROLE_ADMIN"));
            // if(currentUser.roles.includes("ROLE_ADMIN")) {
            //     // navigator("/admin")
            // }
            // else {
            //     navigator("/")
            // }

        } else {
            setShowAdminBoard(false);
        }

        EventBus.on("logout", () => {
            logOut();
        });

        return () => {
            EventBus.remove("logout");
        };
    }, [currentUser, logOut]);

    return (
        <>
                <Routes>
                    <Route path='/' name="Home" element={<HomePage/>}/>
                    <Route path='/account/:id' element={<AccountInfo/>}/>
                    <Route path='/payment/:id' element={<PaymentOrder/>}/>
                    <Route path="/payment-success" element={<PaymentSuccess/>}/>

                    <Route path='product' exact={true} name="Product" element={<HomePageMan/>}/>
                    <Route path='product/:id' exact={true} name="Product Detail" element={<HomePageMan/>}/>
                    <Route path='collections/:id' exact={true} name="Product Detail" element={<HomePageCollection/>}/>



                    <Route path='product/best-seller/:id' name="Product Detail"
                           element={<HomePageMan isBestSeller={true}/>}/>

                    <Route path="detail/product/:id" element = {<DetailProduct />} />
                    <Route path='aboutUs' element = { <AboutUs />} />
                    <Route path='login' element={<Login/>}/>
                    <Route path='forgot/password' element={<ForgotPass/>}/>
                    <Route path='reset/password' element={<ResetPass/>}/>

                    <Route path='singUp' element={<SignUp/>}/>
                    <Route path='product/men' element = { <HomePageMan />} />
                    <Route path='product/woman' element =  { <HomePageWoman />} />
                    <Route path='bestseller' element={ <HomePageBestSeller /> } />
                    <Route path='admin' element = { <AdminHome />} />
                    <Route path='admin/customer' element= { <Customers />} />
                    <Route path='admin/product' element = { <Products />} />
                    <Route path='admin/product/addProduct' element = { <AddProduct /> } />
                    <Route path='admin/product/addProduct/:id' element = { <AddProduct /> } />
                    <Route path='admin/customer/addCustomer' element = { <AddCustomer /> } />
                    <Route path='admin/account/addAccount' element = { <AddAccount /> } />
                    <Route path='admin/order' element = { <Orders /> } />
                    <Route path="/admin-order-details/:id" element = { <VewCustomersDetail/>}/>
                    <Route path='admin/account' element = { <Accounts /> } />
                </Routes>

        </>
    );
}

export default App;
