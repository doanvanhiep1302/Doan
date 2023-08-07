import React, {useState, useEffect} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector} from "react-redux";
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../../Admin/theme";
import {DashboardNavbar} from "../../Admin/Dashboards/DashboardNavbar";
import {DashboardSidebar} from "../../Admin/Dashboards/DashboardSidebar";
import DashboardTitle from "../DashboardTitle";
import {
    Box, Button,
    Card,
    Container,
    InputAdornment, Modal, Pagination, Stack,
    SvgIcon,
    Table, TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField, Tooltip
} from "@mui/material";
import {OrderListResults} from "../../Admin/Order/orderDetail";
import {Search as SearchIcon} from "../../Admin/icons/search";
import PerfectScrollbar from "react-perfect-scrollbar";
import {findText, thousandsSeparators} from "../../common/fCommon";
import {SeverityPill} from "../../Admin/severity-pill";
import moment from "moment";
import DeleteIcon from "@mui/icons-material/Delete";
import {getOrderHistory} from "../../api/order-hitory";
import {getOrderDetails} from "../../api/customer-order";
import './styles.scss'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faImage} from "@fortawesome/free-solid-svg-icons";
import {CardBackButton} from "../../component-utility/icons-component";

const VewCustomersDetail = () => {

    const {id} = useParams();
    const { user: currentUser } = useSelector((state) => state.userSlice);
    const [pageNo, setPageNo] = useState(1);
    const [limit, setLimit] = useState(5);
    const [listOrderDetail, setListOrderDetail] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [keyword, setKeyword] = useState("");
    const navigator = useNavigate();

    useEffect(() => {
        getOrderDetails(
            {
                order_id: id
            }
        ).then(
            res => {
                const {data} = res.data;
                if (data) {
                    setListOrderDetail(data)
                    const dataByKeyword = data.customerOrderDetails.filter(item => keyword ? (findText(item?.product?.name, keyword)) : item);
                    setTotalPages(Math.ceil(dataByKeyword && dataByKeyword.length / limit));
                }
            }
        )
    }, [id, keyword])

    function onChangeSearch(value) {
        setKeyword(value)
    }

    useEffect(() => {
        if(keyword) {
            setPageNo(1);
        }
    }, [keyword]);

    function handleChange(e, value) {
        setPageNo(value);
    }

    if(currentUser?.roles?.includes("ROLE_ADMIN")) {
        return (<>
                <ThemeProvider theme={theme}>
                    <div className="dashBoardNarBar">
                        <DashboardNavbar/>

                    </div>
                    <DashboardSidebar/>
                    <div className="wrapper-AdminHome body-container">
                        <DashboardTitle title="Chi tiết đơn hàng"/>

                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                            }}
                        >

                            <Container maxWidth={false}>
                                <Box>
                                    <div style={{paddingBottom: "8px"}}>
                                        <Link to="/admin/order" style={{paddingBottom: "8px"}}><CardBackButton/></Link>

                                        <div style={{paddingTop: "16px"}}>
                                        <TextField
                                            label={"Tên Sản Phẩm"}
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
                                            placeholder="Tên Sản Phẩm"
                                            value={keyword}
                                            onChange={(e) => onChangeSearch(e.target.value)}
                                            // variant="outlined"
                                        />
                                        </div>
                                    </div>
                                    <Card>

                                        <PerfectScrollbar>

                                            <Box sx={{minWidth: "100%"}}>
                                                <Table>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                Sản phẩm
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
                                                                Ngày ghi nhận
                                                            </TableCell>
                                                            <TableCell>
                                                                Cập nhật cuối
                                                            </TableCell>
                                                            {/*<TableCell>*/}
                                                            {/*    TUỲ CHỌN*/}
                                                            {/*</TableCell>*/}
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {listOrderDetail && listOrderDetail.customerOrderDetails && listOrderDetail.customerOrderDetails.length ? listOrderDetail.customerOrderDetails.filter(item => keyword ? (findText(item?.product?.name, keyword)) : item).slice(
                                                            (pageNo - 1) * limit,
                                                            (pageNo - 1) * limit + limit
                                                        ).map((order) => (
                                                            <TableRow
                                                                hover
                                                                key={order?.id}
                                                            >
                                                                <TableCell>
                                                                    <div className="product-infor">
                                                                        <div className="name">
                                                                            {order?.product?.name}
                                                                        </div>
                                                                            <div className="image-order-details">
                                                                                {order?.product?.productImages?.[0]?.photosImagePath ? <img src={order?.product?.productImages?.[0]?.photosImagePath} alt="Lỗi hiển thị"/> :  <div className="product-img">
                                                                                <span>Sản phẩm chưa có hình ảnh</span>
                                                                                <FontAwesomeIcon icon={faImage} fontSize={"30"}/></div>}
                                                                        </div>
                                                                    </div>
                                                                </TableCell>

                                                                <TableCell>
                                                                    {listOrderDetail?.user?.fullName}
                                                                </TableCell>
                                                                <TableCell>
                                                                    <SeverityPill
                                                                        style={{cursor: "pointer"}}
                                                                        color={order?.status ? "success" : "error"}
                                                                    >
                                                                        {order?.status ? "Đã giao" : "Đang giao"}
                                                                    </SeverityPill>
                                                                </TableCell>
                                                                <TableCell>
                                                                    {thousandsSeparators(order?.price)} VNĐ
                                                                </TableCell>
                                                                <TableCell>
                                                                    {moment(order?.createTime).format("DD/MM/YYYY")}
                                                                </TableCell>
                                                                <TableCell>
                                                                    {moment(order?.updateTime).format("DD/MM/YYYY")}
                                                                </TableCell>
                                                                {/*<TableCell>*/}
                                                                {/*    <div className="product-action">*/}
                                                                {/*        <div>*/}
                                                                {/*            <Tooltip title="Xoá">*/}
                                                                {/*                <Button variant="contained" color="error">*/}
                                                                {/*                    <DeleteIcon/>*/}
                                                                {/*                </Button>*/}
                                                                {/*            </Tooltip>*/}
                                                                {/*        </div>*/}
                                                                {/*    </div>*/}
                                                                {/*</TableCell>*/}
                                                            </TableRow>
                                                        )) : null}
                                                    </TableBody>
                                                </Table>
                                            </Box>
                                        </PerfectScrollbar>
                                        <div className="pagination-footer">
                                            <Stack spacing={2}>
                                                <Pagination count={totalPages} page={pageNo} variant="outlined" color="primary" onChange={handleChange}/>
                                            </Stack>
                                        </div>
                                    </Card>

                                </Box>
                            </Container>
                        </Box>
                    </div>
                </ThemeProvider>

            </>
        );
    }

}
export default VewCustomersDetail;