import {useState, useEffect} from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
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
    Tooltip, Stack, Pagination, Modal
} from "@mui/material";
import {deleteUser, getUserPage} from "../../api/user";
import {toast} from "react-toastify";


export const AccountListResults = ({keyword}) => {
    const [data, setData] = useState([]);
    const [limit, setLimit] = useState(10);
    const [pageNo, setPageNo] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [deleteAccountSelected, setDeleteAccountSelected] = useState("");

    useEffect(() => {
        fetUserId();
    }, [pageNo, limit, keyword])

    const fetUserId = () => {
        getUserPage(
            {
                page: pageNo,
                limit: limit,
                keyword: keyword
            }
        ).then(res => {
            const {data} = res.data;
            if (data) {
                setData(data.content);
                setTotalPages(data?.totalPages)
            }
        })
    }

    function handleChange(event, newPage) {
        setPageNo(newPage);
    }

    function onDeleteUser(customer) {
        setDeleteAccountSelected(customer.id);
    }

    const handleCloseDelete = () => {
        setDeleteAccountSelected(null);

    }

    const onDelete = () => {
        deleteUser(
            {
                userId: deleteAccountSelected,
            }
        ).then(
            res => {
                const {data} = res;
                if (data.errorCode == "200") {
                    toast.success("Xóa thành công")
                    fetUserId();
                    handleCloseDelete();
                } else {
                    toast.error("Xóa thất bại")
                }
            }
        )
    }

    function checkIsAdmin(customer) {
        if(customer && customer.roles && customer.roles.length) {

            const index = customer.roles.findIndex(item => item.type === "ROLE_ADMIN")
            if(index > -1) {
                return true;
            }
            else {
                return false;
            }
        }
        return false;
    }

    let handleClose;
    return (
        <>
            <Card>
                <PerfectScrollbar>
                    <Box sx={{minWidth: "100%"}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox"></TableCell>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Tài Khoản</TableCell>
                                    <TableCell>Tên</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Số Điện Thoại</TableCell>
                                    <TableCell>Địa Chỉ</TableCell>
                                    <TableCell>Phân Quyền</TableCell>
                                    <TableCell>Tuỳ Chọn</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data && data.length ? data.map((customer) => (
                                    <TableRow hover key={customer.id}>
                                        <TableCell padding="checkbox"></TableCell>
                                        <TableCell>
                                            <Box
                                                sx={{
                                                    alignItems: "center",
                                                    display: "flex",
                                                }}
                                            >
                                                <Typography color="textPrimary" variant="body1">
                                                    {customer.id}
                                                </Typography>
                                            </Box>
                                        </TableCell>
                                        <TableCell>{customer.username}</TableCell>
                                        <TableCell>{customer.fullName}</TableCell>
                                        <TableCell>{customer.email}</TableCell>
                                        <TableCell>{customer.phoneNumber}</TableCell>
                                        <TableCell>{customer.address}</TableCell>
                                        <TableCell>
                                            <div>
                                                {customer.roles && customer.roles.length ? customer.roles.map(item => (
                                                    <div>{item.type}</div>
                                                )) : null}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div>
                                                <Tooltip title="Xoá">
                                                    <Button variant="contained" color="error" onClick={() => onDeleteUser(customer)} disabled={checkIsAdmin(customer)}>
                                                        <DeleteIcon />
                                                    </Button>
                                                </Tooltip>
                                            </div>
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
            </Card>
            <Modal
                open={!!deleteAccountSelected}
                onClose={handleCloseDelete}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <div className="popover-wrapper">
                    <div className="popover">
                        <div className="popover-header">
                            Xác Nhận Xóa Khách Hàng
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

