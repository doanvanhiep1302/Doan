import React, {useEffect, useState} from 'react';
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import Navbar from "../Navbar/navbar";
import {deepOrange} from "@mui/material/colors";
import {useDispatch, useSelector} from "react-redux";
import './styles.scss'
import {faImage, faUser, faEdit} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import PhoneInput from "react-phone-input-2";
import {findCustomerOrderByUser} from "../../api/customer-order";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Pagination, Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow, Tooltip
} from "@mui/material";
import {thousandsSeparators} from "../../common/fCommon";
import {cloneDeep, debounce, flattenDeep} from "lodash";
import moment from "moment";
import ErrorTextField from "../../component-utility/error-text-field";
import {changePassword, findUserLogin, updateUser} from "../../api/auth";
import {toast} from "react-toastify";
import {loginSuccess} from "../../redux/userSlice";
import {SeverityPill} from "../../Admin/severity-pill";
import axios from 'axios';

const OrderList = ({user}) => {
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(5);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [totalPages, setTotalPages] = useState(0);

    const fetchData = () => {
        findCustomerOrderByUser({
            userId: user?.id,
            isPaid: true,
            pageNo: 1,
            pageSize: 4
        }).then(
            res => {
                const {data} = res.data;
                if (data && data.length) {
                    const listOrderFlatten = data && data.length
                        ? flattenDeep(data.map((item) => item.customerOrderDetails.map(detail => ({
                            ...detail,
                            orderId: item
                        })))).map((i) => ({
                            ...i,
                        }))
                        : [];
                    setListOrderDetail(listOrderFlatten);
                    setTotalPages(Math.ceil(listOrderFlatten && listOrderFlatten?.length / limit));
                }
            }
        ).catch()
    }

    useEffect(() => {
        fetchData()

    }, [user])

    function handleChange(e, value) {
        setPageNo(value);
    }

    const handleStatus = status => {
        if(status == 0) return "Chờ xác nhận";
        if(status == 1) return "Đang giao hàng";
        if(status == 2) return "Đã nhận hàng";
        if(status == 3) return "Đơn hàng đã hủy";
    }

    const handleDeleteProduct = async (id) => {
        console.log("ressss: ", id)
        const res = await axios.post("http://localhost:8080/order/update-status", { orderId: id, status:3 })
        if(res.status === 200) {
            fetchData()
        }
    }

    console.log("listOrderDetail: ", listOrderDetail)

    return (<>
            <PerfectScrollbar>
                <Box sx={{minWidth: "100%"}}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Mã đặt hàng</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Mã đơn hàng</span>
                                </TableCell>
                                {/*<TableCell sx={{textAlign: "left"}}>*/}
                                {/*    <span className="header-text">Tên Sản Phẩm</span>*/}
                                {/*</TableCell>*/}
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Sản Phẩm</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Số Lượng</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Thành Tiền</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Thời gian</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text">Trạng thái</span>
                                </TableCell>
                                <TableCell sx={{textAlign: "left"}}>
                                    <span className="header-text"></span>
                                </TableCell>
                                {/*<TableCell sx={{textAlign: "left"}}>*/}
                                {/*    <span className="header-text">Trạng thái</span>*/}
                                {/*</TableCell>*/}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {listOrderDetail && listOrderDetail.length ? listOrderDetail.slice(
                                (pageNo - 1) * limit,
                                (pageNo - 1) * limit + limit
                                ).map((order) => (
                                <TableRow hover key={order.id}>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                alignItems: "center",
                                                display: "flex",
                                            }}
                                        >
                                            <Typography color="textPrimary" variant="body1">
                                                {order?.orderId?.id}
                                            </Typography>
                                        </Box>
                                    </TableCell>
                                    <TableCell>{order?.id}</TableCell>
                                    <TableCell>
                                        <div className="product-infor">
                                            <div className="name">
                                                {order?.product?.name}
                                            </div>

                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        {thousandsSeparators(order?.quantity)}
                                    </TableCell>
                                    <TableCell>
                                        {thousandsSeparators(order?.price)} VNĐ
                                    </TableCell>
                                    <TableCell>
                                        {moment(order?.updateTime).format("DD/MM/YYYY")}
                                    </TableCell>
                                    <TableCell>
                                        {handleStatus(order.orderId.status)}
                                    </TableCell>
                                    <TableCell>
                                        {order.orderId.status == 0 && 
                                            <button className="btn btn-danger" onClick={()=>handleDeleteProduct(order.orderId.id)}>Hủy đơn hàng</button> }
                                    </TableCell>
                                </TableRow>
                                
                            )) : null}
                        </TableBody>
                    </Table>
                </Box>
            </PerfectScrollbar>
            <div className="pagination-footer">
                <Stack spacing={2}>
                    <Pagination count={totalPages} page={pageNo} variant="outlined" color="primary"
                                onChange={handleChange}/>
                </Stack>
            </div>

        </>
    )
}

const ChangePassword = ({user}) => {
    const [password, setPassword] = useState({
        email: "",
        password: "",
        newPassword: "",
        reNewPassword: "",
        isOTPMail: false,
    })

    const validatePassword = () => {
        const error = {};
        if (!password?.password?.trim()) {
            error.password = "Trường bắt buộc";
        }
        if (!password?.newPassword?.trim()) {
            error.newPassword = "Trường bắt buộc";
        }
        if (!password.reNewPassword?.trim()) {
            error.reNewPassword = "Trường bắt buộc";
        } else {
            if (password?.newPassword !== password.reNewPassword) {
                error.reNewPassword = "Mật Khẩu Xác Nhận Không Trùng Khớp";
            }
        }
        return error;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const saveRes = await changePassword({
            email: user?.email,
            password: password?.password,
            newPassword: password?.newPassword,
            reNewPassword: password?.reNewPassword,
            isOTPMail: password?.isOTPMail,
        })
        const {data} = saveRes;
        if (data?.errorCode === "200") {
            toast.success("Thay Đổi password Thành Công!")
        } else {
            toast.error(`${data?.errorDesc || "Thất Bại"}`)
        }


    }

    function onChangeRenewPassword(value) {
        setPassword({...password, reNewPassword: value});
    }

    function onChangePassword(value) {
        setPassword({...password, password: value})
    }

    function onChangeNewPassword(value) {
        setPassword({...password, newPassword: value})
    }

    return (
        <>
            <div className="account-info-header">
                <div>Thay đổi mật khẩu</div>
            </div>
            <div className="account-form">
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                    <div className="row">
                        <div className="col-3">
                            Mật Khẩu Hiện Tại
                        </div>
                        <div className="col-9">
                            <TextField
                                margin="normal"
                                type="password"
                                required
                                fullWidth
                                id="Mật Khẩu Hiện Tại"
                                label="Mật Khẩu Hiện Tại"
                                name="Mật Khẩu Hiện Tại"
                                autoComplete="Mật Khẩu Hiện Tại"
                                autoFocus
                                helperText={<ErrorTextField message={validatePassword()?.password}/>}
                                onChange={(e) => onChangePassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Mật Khẩu Mới
                        </div>
                        <div className="col-9">
                            {/*{currentUser?.email}*/}
                            <TextField
                                margin="normal"
                                type="password"
                                required
                                fullWidth
                                id="Mật Khẩu Mới"
                                label="Mật Khẩu Mới"
                                name="Mật Khẩu Mới"
                                autoComplete="Mật Khẩu Mới"
                                autoFocus
                                value={password.newPassword}
                                helperText={<ErrorTextField message={validatePassword()?.newPassword}/>}
                                onChange={(e) => onChangeNewPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Xác Nhận Mật Khẩu
                        </div>
                        <div className="col-9">
                            {/*{currentUser?.email}*/}
                            <TextField
                                margin="normal"
                                type="password"
                                required
                                fullWidth
                                id="Xác Nhận Mật Khẩu"
                                label="Xác Nhận Mật Khẩu"
                                name="Xác Nhận Mật Khẩu"
                                autoComplete="Xác Nhận Mật Khẩu"
                                autoFocus
                                helperText={<ErrorTextField message={validatePassword()?.reNewPassword}/>}
                                onChange={(e) => onChangeRenewPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col-9">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Lưu
                            </Button>
                        </div>

                    </div>

                </Box>
            </div>
        </>
    )
}

const AccountInfo = () => {


    const {user: currentUser} = useSelector((state) => state.userSlice);
    const dispatch = useDispatch();


    const [navSelected, setNavSelected] = useState(
        {
            key: "ACCOUNT",
            name: "Hồ Sơ"
        },
    );

    const listNav = [
        {
            key: "MY_ACCOUNT",
            name: "Tài khoản của tôi",
            icon: <FontAwesomeIcon icon={faUser} fontSize={"1.125rem"}/>,
            isSelect: false,
        },
        {
            key: "ACCOUNT",
            name: "Hồ Sơ",
            isSelect: true,
        },
        {
            key: "CHANGE-PASSWORD",
            name: "Đổi Mật Khẩu",
            isSelect: true,
        },
        {
            key: "ORDER",
            name: "Đơn Mua",
            isSelect: true,
        }
    ]

    

    function handleSubmit() {

    }

    function onSelectMenu(item) {
        if (item?.isSelect) {
            setNavSelected(item);
        }
    }

    const RenderInfo = ({currentUser}) => {

        
        const [isEdit, setIsEdit] = useState(false);
        const [user, setUser] = useState({
            username: "",
            email: "",
            password: "",
            phoneNumber: "",
            fullName: "",
            address: "",
            role: ["user"]
        })
        
        
        useEffect(() => {
            findUserLogin().then(
                res => {
                    const {data} = res.data;
                    if (data) {
                        setUser({
                            ...user,
                            address: data.address,
                            email: data.email,
                            fullName: data.fullName,
                            id: data.id,
                            phoneNumber: data.phoneNumber,
                            // updateTime: "2022-07-27 23:32:38",
                            username: data?.username
                        })
                    }
                }
            ).catch()
        }, [currentUser?.token])

        const onSaveUser = async () => {
            const saveRes = await updateUser({
                email: user.email,
                phoneNumber: user.phoneNumber,
                fullName: user.fullName,
                address: user.address,
            })
            const {data} = saveRes;
            if (data?.errorCode === "200") {
                toast.success("Thay Đổi Thông tin Thành Công!")
                localStorage.setItem("user", JSON.stringify({
                    ...currentUser,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    fullName: user.fullName,
                    address: user.address
                }));
                // dispatch(loginSuccess({
                //     ...currentUser,
                //     email: user.email,
                //     phoneNumber: user.phoneNumber,
                //     fullName: user.fullName,
                //     address: user.address
                // }));
            } else {
                toast.error(`${data?.errorDesc || "Thất Bại"}`)
            }

        }

        function onEditOpen() {
            setIsEdit(!isEdit);
        }

        function onChangeAddress(value) {
            setUser({...user, address: value});
        }

        function onChangeEmail(value) {
            setUser({...user, address: value});
        }

        function onChangeName(value) {
            setUser({...user, fullName: value});
        }

        function onChangePhoneNumber(value) {
            setUser({...user, phoneNumber: value});
        }

        return <>
            <div className="account-info-header">
                <div><span style={{marginRight: "8px"}}>Hồ Sơ Của Tôi</span>
                    <FontAwesomeIcon icon={faEdit}
                                                                                             style={{cursor: "pointer"}}
                                                                                             onClick={onEditOpen}/>
                </div>
                <div>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
            </div>
            <div className="account-form">
                <Box noValidate sx={{mt: 1}}>
                    <div className="row">
                        <div className="col-3">
                            Tên Đăng Nhập
                        </div>
                        <div className="col-9">
                            {user?.username}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Tên
                        </div>
                        <div className="col-9">
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Nhập Tên"
                                name="name"
                                autoComplete="name"
                                value={user.fullName}
                                autoFocus
                                onChange={(e) => onChangeName(e.target.value)}
                                InputProps={{
                                    readOnly: !isEdit,
                                }}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Email
                        </div>
                        <div className="col-9">
                            {/*{currentUser?.email}*/}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Nhập Email"
                                name="email"
                                autoComplete="email"
                                value={user.email}
                                autoFocus
                                InputProps={{
                                    readOnly: !isEdit,
                                }}
                                onChange={(e) => onChangeEmail(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Số Điện Thoại
                        </div>
                        <div className="col-9">
                            <PhoneInput
                                specialLabel={''}
                                country={'vn'}
                                style={{width: "100%"}}
                                width={"100%"}
                                value={user.phoneNumber}
                                InputProps={{
                                    readOnly: !isEdit,
                                }}
                                onChange={(value) => onChangePhoneNumber(value)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-3">
                            Địa Chỉ
                        </div>
                        <div className="col-9">
                            {/*{currentUser?.address}*/}
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Nhập Địa Chỉ"
                                name="email"
                                autoComplete="email"
                                value={user.address}
                                autoFocus
                                InputProps={{
                                    readOnly: !isEdit,
                                }}
                                onChange={(e) => onChangeAddress(e.target.value)}
                            />
                        </div>
                    </div>
                    {isEdit ? <div className="row">
                        <div className="col-3">
                        </div>
                        <div className="col-9">
                            <Button
                                type="submit"
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                onClick={onSaveUser}
                            >
                                Lưu
                            </Button>
                        </div>
                    </div> : null}
                </Box>
            </div>
        </>

    }

    const renderAccountContent = () => {
        switch (navSelected.key) {
            case "ACCOUNT":
                return <RenderInfo currentUser={currentUser}/>
            case "CHANGE-PASSWORD":
                return <ChangePassword user={currentUser}/>
            case "ORDER":
                return (<>
                        <div className="account-info-header">
                            <div>Đơn Mua</div>
                        </div>
                        <OrderList user={currentUser}/>
                    </>
                )
        }
    }

  
    return <>
        <Navbar/>
        <div className="body-container">
            <div className="account-wrapper container">
                <div className="account-menu">
                    <div className="account-info-header">
                        <div className="avatar">
                            <Avatar sx={{
                                color: deepOrange[Math.floor(Math.random() * 10)],
                                width: 20,
                                height: 20,
                                marginRight: 1,
                                p: 2
                            }}/>
                            <b className="ml-2">{currentUser?.username}</b>
                        </div>
                    </div>
                    <div className="account-info-header-list">
                        <ul>{ currentUser?.username !== "admin" ? 
                            listNav.map(item =>
                                <li key={item.key} onClick={() => onSelectMenu(item)}
                                    className={`${navSelected?.key === item.key ? "active" : ""}`}>
                                    <span style={{marginRight: "8px"}}>{item.icon}</span><span
                                    className="">{item?.name}</span>
                                </li>) : listNav.filter(item=>item.key !== "ORDER").map(item =>
                                    <li key={item.key} onClick={() => onSelectMenu(item)}
                                        className={`${navSelected?.key === item.key ? "active" : ""}`}>
                                        <span style={{marginRight: "8px"}}>{item.icon}</span><span
                                        className="">{item?.name}</span>
                                    </li>)

                        }

                        </ul>
                    </div>
                </div>
                <div className="account-content">
                    {renderAccountContent()}
                </div>
            </div>
        </div>
    </>

}

export default AccountInfo;

{/*<div className="image-order-details">*/}
{/*    {order?.product?.productImages?.[0]?.photosImagePath ? <img src={order?.product?.productImages?.[0]?.photosImagePath} alt="Lỗi hiển thị"/> :  <div className="product-img">*/}
{/*        <span>Sản phẩm chưa có hình ảnh</span>*/}
{/*        <FontAwesomeIcon icon={faImage} fontSize={"30"}/></div>}*/}
{/*</div>*/}