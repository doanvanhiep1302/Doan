import React, {useEffect, useState} from "react";
import './styles.scss'
import {faCheck, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
import {paymentOrder} from "../../api/customer-order";
import {toast} from "react-toastify";
import {thousandsSeparators} from "../../common/fCommon";

const PaymentSuccess = ({location}) => {

    const [infoPayment, setInfoPayment] = useState({
        amount: "",
        orderInfo: "",
        username: "",
        orderCode: "",
        paymentType: ""
    });

    const navigator = useNavigate();

    useEffect(() => {
        const search = window.location.search;
        if (search) {
            const query = new URLSearchParams(search);
            const amount = query.get('amount');
            const orderInfo = query.get('orderInfo');
            const orderCode = query.get('orderCode');
            const paymentType = query.get("paymentType");
            if(amount) {
                paymentOrder({
                    idOrder: orderInfo,
                    amount: amount,
                    description: "",
                    bankCode: "",
                    paymentType: paymentType
                }).then(res => {
                    const {data} = res;
                    if (data.errorCode == "200") {
                        return;
                    } else {
                        toast.error("Thất Bại")
                    }
                })
            }
            const username = query.get('username');
            setInfoPayment({amount: amount, orderInfo: orderInfo, username: username, orderCode: orderCode});
        }
    }, [window.location])

    function onRedirectHomePage() {
        navigator("/")
    }

    return <div className="payment-success">
        <div className="payment-success-body">
            <FontAwesomeIcon icon={faCheck}  color={"green"} fontSize={"5rem"}/>
            <div>Mã Đơn Hàng: {infoPayment.orderCode}</div>
            <div><strong>Số Tiền: {thousandsSeparators(infoPayment.amount)} VNĐ</strong></div>
            <Button variant="contained" color="success" className="btn-success" onClick={onRedirectHomePage}>Tiếp tục mua hàng</Button>
        </div>
    </div>
}
export default PaymentSuccess;
