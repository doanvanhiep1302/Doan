import "./navbar.scss";
import {Link, useNavigate} from "react-router-dom";
import StateMenu from "../StateMenu";
import LoginIcon from "@mui/icons-material/Login";
import {useTranslation} from "react-i18next";
import {useState, useEffect} from "react";
import DropDownMen from "./DropdownMen";
import Tooltip from '@mui/material/Tooltip';
import Cart from "../StateMenu/Cart";
import {getAllCategory} from "../../api/category";
import {useDispatch, useSelector} from "react-redux";
import {addCategory} from "../../redux/categorySlice";
import {useCallback} from "react";
import {logout} from "../../redux/userSlice";
import EventBus from "../../common/EventBus";
import {Avatar} from "@mui/material";
import {deepOrange} from "@mui/material/colors";
import {Logout} from "@mui/icons-material";
import {logoutService} from "../../api/action/auth";
import {getUserDetails} from "../../api/user";
import {checkIsAdmin} from "../../common/fCommon";

const nest = (items, id = 0, link = 'parentId') =>
    items
        .filter(item => item[link] === id)
        .map(item => ({
            ...item,
            children: nest(items, item.id)
        }));

function Navbar() {
    const {t} = useTranslation();

    const [showChildren, setShowChildren] = useState(false);
    const [children, setChildren] = useState([]);
    const [listCategory, setListCategory] = useState([]);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const navigator = useNavigate();
    const {user: user} = useSelector((state) => state.userSlice);
    const [currentUser, setCurrentUser] = useState({
        username: "",
        fullName: "",
        address: "",
        token: ""
    })
    const [showAccountInfor, setShowAccountInfor] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) {
            setCurrentUser({
                ...currentUser,
                username: user?.username,
                token: user?.token,
                address: user?.address,
                fullName: user?.fullName,
                phoneNumber: user?.phoneNumber,
                role: user?.roles
            })
        }
    }, [dispatch])
    const categoryStore = useSelector(state => state);

    const logOut = () => {
        dispatch(logoutService());
        dispatch(logout());
        setCurrentUser(null)
        navigator("/login");
    };


    useEffect(() => {
        if (currentUser) {
            setShowAdminBoard(currentUser?.roles?.includes("ROLE_ADMIN"));
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

    useEffect(() => {
        getAllCategory().then((res) => {
            if (res && res.data) {
                const {data} = res.data;
                const list = nest(data);
                setListCategory(list)
                dispatch(addCategory(list))
            }
        });
    }, []);


    const leaveHover = () => {
        setChildren([]);
        setShowChildren(false);
    }

    const onShowChildren = (children) => {
        setChildren(children);
        setShowChildren(true);
    }


    function onLogin() {
        navigator("/login");
    }
    return (
        <>
            <div className={showChildren ? "showMenu" : "hideMenu"} onMouseLeave={leaveHover}>
                <DropDownMen children={children}/>
            </div>
            <div className=" container-fluid overNav">
                <div className="row">
                    <div className="col-4 nav justify-content-left left">
                        <StateMenu currentUser={currentUser}/>
                        {listCategory && listCategory.length ? listCategory.map(item => <li
                            className="nav-item menu  dropdown men" onMouseEnter={() => onShowChildren(item.children)}
                        >
                            <Link
                                to="/"
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                <span className="nav-text">{item.name}</span>
                            </Link>
                        </li>) : null}
                        <li className="nav-item menu dropdown" onMouseEnter={leaveHover}>
                            <Link
                                to="/aboutUs"
                                className="nav-link active"
                                aria-current="page"
                                href="#"
                            >
                                {t("we")}
                            </Link>
                        </li>
                    </div>
                    <div className="col-4 text-center logo">
                        <Link to={"/"}><img
                            src="https://curnonwatch.com/_next/static/media/logo.cc5d661a.svg"
                            alt=""
                        ></img></Link>
                    </div>
                    <div className="col-4 text-end nav justify-content-end right align-items-center">
                        <li className="nav-item">
                <span className="nav-icon cart-icon">
                  <Cart currentUser={currentUser}/>
                </span>
                        </li>
                        <div className="avatar">
                            {currentUser?.username ?
                                <div className="account"
                                ><Avatar sx={{
                                    color: deepOrange[Math.floor(Math.random() * 10)],
                                    width: 20,
                                    height: 20,
                                    p: 2
                                }} onClick={() => setShowAccountInfor(!showAccountInfor)}
                                >{currentUser?.username?.slice(0, 2)}</Avatar>
                                    {showAccountInfor ? <div className="popup-account">
                                        <ul>
                                            <li onClick={() => navigator(`/account/${currentUser.fullName}`)}>
                                                Thông tin tài khoản
                                            </li>
                                            {checkIsAdmin(currentUser) ? <li onClick={() => navigator("/admin")}>
                                                Trang admin
                                            </li> : null}
                                            <li onClick={logOut}>
                                                Đăng xuất <Logout sx={{size: "12px"}}/>
                                            </li>
                                        </ul>

                                    </div> : null}
                                </div>
                                :
                                <span onClick={onLogin}>Đăng nhập<LoginIcon/></span>
                            }
                        </div>
                        <li className="nav-item">
                            <div className="nav-link active">
                                {/* <AccountSetting /> */}
                            </div>
                        </li>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Navbar;
