import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CloseIcon from "@mui/icons-material/Close";
import Infor from '../InforHeader/infor-header';
import imgTest from '../../Images/7.jpg'
import "./cart.scss";
import {FaTruck} from "react-icons/fa";
import {MdOutlineGppGood} from "react-icons/md";
import {IoIosSwap} from "react-icons/io";
import CartItem from "./CartItem";
import {ArrowRight} from "@mui/icons-material";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {deleteCustomerOrderDetail, getCustomerOrder, updateCustomerOrder} from "../../api/customer-order";
import {getCart} from "../../redux/cartSlice";
import {thousandsSeparators} from "../../common/fCommon";
import {useNavigate} from "react-router-dom";
import {logoutService} from "../../api/action/auth";
import {logout} from "../../redux/userSlice";
import {toast} from "react-toastify";

const totalPrice = (listOrderDetails) => {
    let total = 0;
    listOrderDetails && listOrderDetails.length && listOrderDetails.forEach(item => {
        total += item.price;
    })
    return total;
}

export default function Cart({currentUser}) {
    const [state, setState] = React.useState({
        right: false,
    });
    const [customerOrder, setCustomerOrder] = useState([]);
    const navigator = useNavigate();

    const toggleDrawer = (anchor, open) => (event) => {
        if(!currentUser?.token) {
            dispatch(logoutService());
            dispatch(logout());
            navigator("/login");
        }
        else {
            if (
                event.type === "keydown" &&
                (event.key === "Tab" || event.key === "Shift")
            ) {
                return;
            }
            setState({...state, [anchor]: open});
        }
        // if (
        //     event.type === "keydown" &&
        //     (event.key === "Tab" || event.key === "Shift")
        // ) {
        //     return;
        // }
        // setState({...state, [anchor]: open});
    };

    const cartStore = useSelector(state => state.cartSlice);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchCustomerOrder();
    }, [currentUser])

    useEffect(() => {
        setCustomerOrder(cartStore);
    }, [cartStore, currentUser])

    const fetchCustomerOrder = () => {
        getCustomerOrder({
            userId: currentUser?.id,
            isPaid: false,
        }).then(
            res => {
                const {data} = res.data;
                if (data && data.length) {
                    dispatch(getCart(data?.[data.length - 1]))

                } else {
                    dispatch(getCart(null))
                }
            }
        ).catch(res => {
            dispatch(getCart(null))
        })
    }

    const onChangeTotal = (item, num) => {
        const tmp = {...customerOrder};
        const indexOrderDetail = customerOrder.customerOrderDetails.findIndex(i => i.id === item.id);
        const cartItem = customerOrder?.customerOrderDetails?.[indexOrderDetail];
        if(num === 1) {
            if (cartItem?.quantity >= item?.total || item.total <= 0) {
                toast.success("Không đủ số lượng sản phẩm");
                return;
            }
        }
        if (indexOrderDetail > -1) {
            tmp.customerOrderDetails = customerOrder.customerOrderDetails.map((item, index) => {
                if (indexOrderDetail === index) {
                    return {
                        ...item,
                        quantity: item.quantity + num,
                    }
                } else {
                    return {
                        ...item,
                    }

                }
            });
            setCustomerOrder(tmp);
            if (tmp.customerOrderDetails[indexOrderDetail].quantity <= 0) {
                onDeleteOrderDetail(item)
            } else {
                updateCustomerOrder({
                    ...tmp,
                    userId: tmp?.user?.id,
                    orderId: tmp.id,
                    isPaid: false,
                }).then(res => {
                    const {data} = res;
                    if (data.errorCode == "200") {
                        fetchCustomerOrder();
                    }
                })
            }
        }
    }

    const onDeleteOrderDetail = (item) => {
        deleteCustomerOrderDetail(
            {
                id: item.id,
            }
        ).then(res => {
            const {data} = res;
            if (data.errorCode == '200') {
                fetchCustomerOrder();
            }
        })
    }

    function onPayNow() {
        navigator(`/payment/${cartStore.id}`)
    }

    const list = (anchor) => (
        <div className="cart">

            <Box
                sx={{width: "400px", height: "100vh", overflowY: "hidden"}}
                role="presentation"
            >
                <div className="wrapperCart">
                    <div className="headerCart">
                        <div className="titleCart">GIỎ HÀNG CỦA BẠN</div>
                        <div>
                            <Button>
                                <CloseIcon onClick={toggleDrawer(anchor, false)} fontSize="medium"
                                           sx={{color: "white"}}/>
                            </Button>
                        </div>
                    </div>
                    <div>
                        <div>
                            <div className='overInfortext'>
                                <div className='allIn'>
                                    <div className='index1'>
                    <span className="navbar-brand info mx-0" id='one' href="#">
                       <div className="marquee">
                           <span className="ml-2" ml={2} pl={2}><i className='icons mr-2'>
                               <FaTruck className="mr-2 pr-2"/></i>MIỄN PHÍ VẬN CHUYỂN ĐƠN HÀNG >700K</span></div>
                    </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex flex-column">
                        <div className="miniCart">
                            {customerOrder && customerOrder.customerOrderDetails && customerOrder.customerOrderDetails.length ?
                                customerOrder.customerOrderDetails.map((item, index) =>
                                    <CartItem item={item} onChangeTotal={onChangeTotal}
                                              onDeleteOrderDetail={onDeleteOrderDetail}/>
                                ) : null}

                        </div>
                        <div className="cart-bottom">
                            <div className="cart-bottom-top">
                                <span>Thành tiền</span> <span style={{
                                color: "red",
                                fontWeight: "bold",
                                fontSize: "1.15rem",
                            }}>{thousandsSeparators(totalPrice(customerOrder.customerOrderDetails))} VNĐ</span>

                            </div>
                            {customerOrder?.customerOrderDetails?.length > 0 && <button
                                className="pay-now"
                                // type="submit"
                                onClick={onPayNow}

                            >
                                ĐẶT HÀNG
                                <FontAwesomeIcon icon="check-square"/>
                            </button>}
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );

    return (
        <>
            <div style={{display: "inline"}}>
                {["right"].map((anchor) => (
                    <React.Fragment key={anchor}>
                        <Button onClick={toggleDrawer(anchor, true)}>
                            <ShoppingCartIcon sx={{color: "black", fontSize: "25px"}}/>
                        </Button>
                        <Drawer
                            anchor={anchor}
                            open={state[anchor]}
                            onClose={toggleDrawer(anchor, false)}
                        >
                            {list(anchor)}
                        </Drawer>
                    </React.Fragment>
                ))}
            </div>
            {customerOrder.customerOrderDetails && customerOrder.customerOrderDetails.length ? <span
                className="total-cart">{customerOrder.customerOrderDetails.length}</span> : null}
        </>
    );
}
