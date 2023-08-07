import {useState, useEffect, useRef} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import {SeverityPill} from '../severity-pill';
import {
    Button,
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    Tooltip, Stack, Pagination, TextField, InputAdornment, SvgIcon, Modal, RadioGroup, FormControlLabel, Radio
} from "@mui/material";
import {customerOrderDetailsAll} from "../../api/admin";
import {flattenDeep} from "lodash";
import {findText, thousandsSeparators} from "../../common/fCommon";
import moment from "moment";
import {deleteOrderHistory, getOrderHistory, updateStatusOrder} from "../../api/order-hitory";
import {Search as SearchIcon} from "../icons/search";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {UploadFile} from "@mui/icons-material";
import {deleteProduct} from "../../api/customer-order";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import InfoIcon from '@mui/icons-material/Info';
const STATUS_FILTER = {
    ALL: "ALL",
    TRUE: true,
    FALSE: false,
}
export const OrderListResults = () => {
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(5);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [status, setStatus] = useState(STATUS_FILTER.ALL);
    const refStatus = useRef();
    const navigator = useNavigate();


    useEffect(() => {
        fetchCustomerOrder();
    }, [keyword, pageNo]);

    const fetchCustomerOrder = () => {
        getOrderHistory().then(res => {
            const {data} = res.data;
            if (data && data.length) {
                const reMapData = data.map(i => ({...i, status: i.status ? true : false}))
                setListOrderDetail(reMapData );
                const dataByKeyword = reMapData.filter(item => keyword ? (findText(item?.customerOrder?.user?.fullName, keyword)) : item);
                setTotalPages(Math.ceil(dataByKeyword && dataByKeyword.length / limit));
            }
        })
    }

    useEffect(() => {
        if(keyword) {
            setPageNo(1);
        }
    }, [keyword]);

    function handleChange(e, value) {
        setPageNo(value);
    }

    function onChangeStatus(order) {
        updateStatusOrder({
            id: order.id,
            status: !order.status
        }).then(res => {
            const {data} = res;
            if (data.errorCode == "200") {
                fetchCustomerOrder()
            }
        })
    }

    function onChangeSearch(value) {
        setKeyword(value)
    }


    const [orderDeleteSelected, setOrderDeleteSelected] = useState("")

    function onDeleteProduct(customer) {
        setOrderDeleteSelected(customer.id);
    }

    const handleCloseDelete = () => {
        setOrderDeleteSelected(null);

    }

    function onDelete() {
        deleteOrderHistory(
            {
                id: orderDeleteSelected,
            }
        ).then(
            res => {
                const {data} = res;
                if(data.errorCode == "200") {
                    toast.success("Xóa thành công")
                    handleCloseDelete();
                    fetchCustomerOrder();

                }
                else {
                    toast.error("Xóa thất bại")
                }
            }
        )
    }

    function onViewCustomerOrder(e, order) {
        if(order?.customerOrder?.id) {
            navigator(`/admin-order-details/${order?.customerOrder?.id}`)
        }
    }

    const handleChangeStatus = (value) => {
        setStatus(value);
    }

    const onConfirm = async (id, status) => {
        console.log("ressss: ", id)
        const res = await axios.post("http://localhost:8080/order/update-status", { orderId: id, status })
        if(res.status === 200) {
            fetchCustomerOrder()
        }
    }

    const handleStatus = status => {
        if(status == 0) return "Chờ xác nhận";
        if(status == 1) return "Đang giao hàng";
        if(status == 2) return "Đã nhận hàng";
        if(status == 3) return "Đơn hàng đã hủy";
    }

    console.log("listOrderDetail: ", listOrderDetail)

    return (
        <>
            <div style={{paddingBottom: "16px", display: "flex", justifyContent: "space-between"}}>
            <TextField
                label={"Tìm kiếm đơn hàng"}
                size="small"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SvgIcon
                                fontSize="small"
                                color="action"
                            >
                                <SearchIcon />
                            </SvgIcon>
                        </InputAdornment>
                    )
                }}
                placeholder="Tìm kiếm đơn hàng"
                value={keyword}
                onChange={(e) => onChangeSearch(e.target.value)}
                // variant="outlined"
            />
                <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue={status}
                    value={status}
                    name="radio-buttons-group"
                >
                    <div className="ratio-list">
                        <FormControlLabel value={STATUS_FILTER.ALL} control={<Radio/>}
                                          label={<div>Tất cả</div>}
                                          onChange={(e) => handleChangeStatus(e.target.value)}/>
                        <FormControlLabel value={STATUS_FILTER.FALSE} control={<Radio/>}
                                          label={<div>Đang giao</div>}
                                          onChange={(e) => handleChangeStatus(e.target.value)}/>
                        <FormControlLabel value={STATUS_FILTER.TRUE} control={<Radio/>}
                                          label={<div>Đã giao</div>}
                                          onChange={(e) => handleChangeStatus(e.target.value)}/>
                    </div>
                </RadioGroup>
            </div>
            <Card>

                <PerfectScrollbar>

                    <Box sx={{minWidth: "100%"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        Mã đơn hàng
                                    </TableCell>
                                    <TableCell>
                                        Tên khách hàng
                                    </TableCell>
                                    <TableCell>
                                        Trạng thái
                                    </TableCell>
                                    <TableCell sortDirection="desc">
                                        {/*<Tooltip*/}
                                        {/*    enterDelay={300}*/}
                                        {/*    title="Sort"*/}
                                        {/*>*/}
                                        {/*    <TableSortLabel*/}
                                        {/*        active*/}
                                        {/*        direction="desc"*/}
                                        {/*    >*/}
                                        Giá trị
                                        {/*</TableSortLabel>*/}
                                        {/*</Tooltip>*/}
                                    </TableCell>
                                    <TableCell>
                                        Hình thức
                                    </TableCell>
                                    <TableCell>
                                        Ngày ghi nhận
                                    </TableCell>
                                    <TableCell>
                                        Cập nhật cuối
                                    </TableCell>
                                    <TableCell>
                                        TUỲ CHỌN
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {listOrderDetail && listOrderDetail.length ? listOrderDetail.filter(item =>  (status !== STATUS_FILTER.ALL ? (item?.status?.toString() == status) ? true : false : true) ? (keyword ? (findText(item?.customerOrder?.user?.fullName, keyword)) : item) : false).slice(
                                    (pageNo - 1) * limit,
                                    (pageNo - 1) * limit + limit
                                ).map((order) => (
                                    <TableRow
                                        hover
                                        key={order?.id}

                                    >
                                        <TableCell onClick={(e) => onViewCustomerOrder(e, order)}>
                                            {order?.id}
                                        </TableCell>
                                        <TableCell onClick={(e) => onViewCustomerOrder(e, order)}>
                                            {order?.customerOrder?.user?.fullName}
                                        </TableCell>
                                        <TableCell >
                                            <div ref={refStatus}>
                                           {handleStatus(order.customerOrder.status)}
                                            </div>
                                        </TableCell>
                                        <TableCell onClick={(e) => onViewCustomerOrder(e, order)}>
                                            {thousandsSeparators(order?.price)} VNĐ
                                        </TableCell>
                                        <TableCell>
                                            {order?.paymentType || "COD"}
                                        </TableCell>
                                        <TableCell onClick={(e) => onViewCustomerOrder(e, order)}>
                                            {moment(order?.createTime).format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell onClick={(e) => onViewCustomerOrder(e, order)}>
                                            {moment(order?.updateTime).format("DD/MM/YYYY")}
                                        </TableCell>
                                        <TableCell>
                                            <div className="product-action">
                                                {/*<div>*/}
                                                {/*    <Tooltip title="Xem chi tiết">*/}
                                                {/*        <Button variant="contained" color="success" >*/}
                                                {/*            <InfoIcon/>*/}
                                                {/*        </Button>*/}
                                                {/*    </Tooltip>*/}
                                                {/*</div>*/}
                                                <div>
                                                    {order.customerOrder.status === 0 && <Tooltip title="Xác nhận">
                                                        <Button variant="contained" color="primary" onClick={() => onConfirm(order.customerOrder.id, 1)}>
                                                        Xác nhận
                                                        </Button>
                                                    </Tooltip>}
                                                    {order.customerOrder.status === 1 && <Tooltip title="Đã nhận hàng">
                                                        <Button variant="contained" color="primary" onClick={() => onConfirm(order.customerOrder.id, 2)}>
                                                        Đã nhận hàng
                                                        </Button>
                                                    </Tooltip>}
                                                    {(order.customerOrder.status === 0 || order.customerOrder.status === 3) && <Tooltip title="Xoá">
                                                        <Button variant="contained" color="error" onClick={() => onDeleteProduct(order)}>
                                                        Xóa
                                                        </Button>
                                                    </Tooltip>}
                                                </div>

                                            </div>
                                        </TableCell>
                                    </TableRow>
                                )) : null}
                            </TableBody>
                        </Table>
                    </Box>
                </PerfectScrollbar>
                {!listOrderDetail || !listOrderDetail.length || !listOrderDetail.filter(item => keyword ? (findText(item?.customerOrder?.user?.fullName, keyword)) : item).slice(
                    (pageNo - 1) * limit,
                    (pageNo - 1) * limit + limit
                ).length ? <div className="empty-content">
                        Không tìm thấy đơn hàng
                </div> : null}
                <div className="pagination-footer">
                    <Stack spacing={2}>
                        <Pagination count={totalPages} page={pageNo} variant="outlined" color="primary"
                                    onChange={handleChange}/>
                    </Stack>
                </div>
            </Card>
            <Modal
                open={!!orderDeleteSelected}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <div className="popover-wrapper">
                        <div className="popover">
                            <div className="popover-header">
                                Xác Nhận Xóa Đơn Hàng
                            </div>
                            <div className="popover-body">
                                <Button color="primary" variant="contained" onClick={onDelete}>
                                    Xác Nhận
                                </Button>
                                <Button color="secondary" variant="contained" onClick={handleCloseDelete}>
                                    Hủy
                                </Button>
                            </div>
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};

OrderListResults.propTypes = {
    customers: PropTypes.array.isRequired,
};
