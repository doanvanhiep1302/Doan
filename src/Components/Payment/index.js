import React, {useEffect, useState} from "react";
import './styles.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate, useParams} from "react-router-dom";
import {getOrderDetails, paymentOrder} from "../../api/customer-order";
import CartItem from "../StateMenu/CartItem";
import {thousandsSeparators} from "../../common/fCommon";
import {Box, Button, Modal} from "@mui/material";
import {getUserDetails} from "../../api/user";
import {useSelector} from "react-redux";
import {toast} from "react-toastify";
import images from "./../../Components/Footer/dataImg";
import {createPayment} from "../../api/payment";
import {useOutsideAlerter} from "../../component-utility/hook";

const sumPrice = (listOrderDetails) => {
    let total = 0;
    listOrderDetails && listOrderDetails.length && listOrderDetails.forEach(item => {
        total += item.price;
    })
    return total;
}

const PAYMENT = [
    {
        key: "VNPAY",
        name: "Thanh toán VNPAY",
        image: images.vnPayIcon
    },
]
const PaymentOrder = () => {

    const {id} = useParams();
    const [customerOrder, setCustomerOrder] = useState({
        customerOrderDetails: [],
        price: 0,
    });


    const user = JSON.parse(localStorage.getItem("user"));



    const [pricesOrder, setPricesOrder] = useState({
        price: 0,
        feeShip: 0,
        totalPrice: 0,
    })
    const [showPayment, setShowPayment] = useState(false);
    const [payment, setPayment] = useState(null);
    const [paymentType, setPaymentType] = useState("");
    const [payCOD, setPayCOD] = useState(false);
    const navigator = useNavigate();




    // const {user: user} = useSelector((state) => state.userSlice);


    const onShowPayment = () => {
        setShowPayment(true)
        console.log(showPayment);
    }

    const choiceCOD = () => {
        setPayCOD(!payCOD);
        console.log(payCOD)
    }

    useEffect(() => {
        getOrderDetails(
            {
                order_id: id
            }
        ).then(
            res => {
                const {data} = res.data;
                if (data) {
                    setCustomerOrder(data)
                    const price = sumPrice(data.customerOrderDetails);
                    const feeShip = price < 700000 ? 30000 : 0
                    const tmp = {...pricesOrder};
                    tmp.price = price;
                    tmp.feeShip = feeShip;
                    tmp.totalPrice = price + feeShip;
                    setPricesOrder(tmp);
                }
            }
        )
    }, [id])


    function onClosePayment() {
        setShowPayment(false)

    }

    function onPayment() {
        switch (paymentType?.key) {
            case "VNPAY":
                createPayment({
                    idOrder: id,
                    amountLong: pricesOrder.totalPrice,
                    description: "pay",
                    bankCode: "NCB"
                }).then(res => {
                    const {data} = res;
                    if (data) {
                        window.location.href = data.url;
                    }
                }).catch(err => {
                    setShowPayment(false);
                })
                break;
            default:
                paymentOrder({
                    idOrder: id,
                    amount: pricesOrder.totalPrice,
                    paymentType: "COD",
                    description: "",
                    bankCode: "",
                }).then(res => {
                    const {data} = res;
                    if (data.errorCode == "200") {
                        toast.success("Đặt Hàng Thành Công")
                        navigator("/");
                    } else {
                        toast.error("Thất Bại")
                    }
                })
                break;

        }

        // paymentOrder({
        //     idOrder: id,
        //     "amount": pricesOrder.totalPrice,
        //     description: "",
        //     bankCode: "",
        // }).then(res => {
        //     const {data} = res;
        //     if (data.errorCode == "200") {
        //         toast.success("Đặt Hàng Thành Công")
        //         navigator("/")
        //     } else {
        //         toast.error("Thất Bại")
        //     }
        // })
    }

    function paymentVNPay(item) {
        if(!paymentType.id) {
            setPaymentType(item.key)
        }
        else {
            setPaymentType("")

        }

    }

    function onPay() {
    }

    const onChoosePay = (item) => {
        if(!paymentType) {
            setPaymentType(item);
        }
        else  {
            setPaymentType("");
        }
    }

    const onRenderPay = () => {
        if(!paymentType) {
            return "THANH TOÁN";
        }
        else {
            return paymentType?.name || "THANH TOÁN";
        }

    }

    return <>
        <div className="payment">
            <div className="row">
                <div className="col-6">
                    <div className="user-info">
                        <div className="user-info-title">THÔNG TIN KHÁCH HÀNG</div>
                        <div className="user-info-body">
                            <div className="row">
                                <div className="col-6">
                                    Tên Đăng Nhập
                                </div>
                                <div className="col-6">
                                    {user?.username}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Tên
                                </div>
                                <div className="col-6">
                                    {user?.fullName}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Email
                                </div>
                                <div className="col-6">
                                    {user?.email}
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-6">
                                    Số Điện Thoại
                                </div>
                                <div className="col-6">
                                    {user?.phoneNumber}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6">
                                    Địa Chỉ
                                </div>
                                <div className="col-6">
                                    {user?.address}
                                </div>
                            </div>
                        </div>
                        <div className="user-info-footer" onClick={()=>setPayment("vnp")}>
                            {PAYMENT.map((item) =>
                                <div className={`payment-item ${payment === "vnp" ? "active" : ""}`}
                                     onClick={() => onChoosePay(item)}>
                                    Thanh Toán VNPAY <img src={item.image}/>
                                </div>)}
                        </div>
                        <div className="user-info-footer"  onClick={()=>setPayment("cod")}>
                                <div className={payment === "cod" ? "active" : ""} onClick={choiceCOD}>
                                    Thanh Toán COD <img style={{width: '40px', height: '40px'}} src="https://curnonwatch.com/_next/static/media/cod.10bcbd91.png"/>
                                </div>
                        </div>
                        <button
                            className={!payment ? "pay-now pay-disable" : "pay-now"}
                            onClick={onShowPayment}
                            disabled={!payment}
                        >
                            {onRenderPay()}
                            <FontAwesomeIcon icon="check-square" onClick={() => onPay()}/>
                        </button>

                    </div>

                </div>
                <div className="col-6">
                    <div className="user-info-title">ĐƠN HÀNG</div>
                    <div className="miniCart">
                        {customerOrder && customerOrder.customerOrderDetails && customerOrder.customerOrderDetails.length ?
                            customerOrder.customerOrderDetails.map((item, index) =>
                                <CartItem item={item}
                                />
                            ) : null}

                    </div>
                    <div className="user-info-footer">
                        <div className="row">
                            <div className="col-6">
                                Thành tiền
                            </div>
                            <div className="col-6">
                                {thousandsSeparators(pricesOrder?.price)} VNĐ

                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                Phí ship

                            </div>
                            <div className="col-6">
                                {thousandsSeparators(pricesOrder?.feeShip)} VNĐ
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-6">
                                TỔNG
                            </div>
                            <div className="col-6">
                                {thousandsSeparators(pricesOrder?.totalPrice)} VNĐ
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
        <Modal
            open={showPayment}
            onClose={onClosePayment}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="payment-wrapper"
        >
            <Box>
                <div>
                    <div className="payment-popup">
                        <div className="payment-header">
                            Xác Nhận Thanh Toán
                        </div>
                        <div className="payment-body">
                            <Button color="primary" variant="contained" onClick={onPayment}>
                                Xác Nhận
                            </Button>
                            <Button color="secondary" variant="contained" onClick={onClosePayment}>
                                Hủy
                            </Button>
                        </div>
                    </div>
                </div>
            </Box>
        </Modal>
    </>
}

export default PaymentOrder;