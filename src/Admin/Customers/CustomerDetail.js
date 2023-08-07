import { useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
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
  Tooltip
} from "@mui/material";

export const CustomerListResults = ({ ...rest }) => {
  const [data, setData] = useState([]);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(0);


  const deletePost = (id) => {
    axios.delete(`http://localhost:3004/products` + `/` + id)
 };

  const handleChangeRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card {...rest}>
      <PerfectScrollbar>
        <Box sx={{ minWidth: "100%" }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Địa Chỉ</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell>Tuỳ Chọn</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * limit, page * limit + limit).map((customer) => (
                <TableRow hover key={customer.id}>
                  <TableCell>
                    <Box
                      sx={{
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <Typography color="textPrimary" variant="body1">
                        {customer.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{customer.brand}</TableCell>
                  <TableCell>Hà Nội</TableCell>
                  <TableCell>{customer.price}</TableCell>
                  <TableCell>
                      <div style={{ display: "flex" }}>
                        <div style={{ paddingRight: "5px" }}>
                          <Tooltip title="Sửa">
                            <Button variant="contained">
                              <ModeEditIcon />
                            </Button>
                          </Tooltip>
                        </div>
                        <div>
                          <Tooltip title="Xoá">
                            <Button onClick={() => deletePost(customer.id)} variant="contained" color="error">
                              <DeleteIcon />
                            </Button>
                          </Tooltip>
                        </div>
                      </div>
                    </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        rowsPerPageOptions={[6, 10]}
        component="div"
        count={data.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleChangeRowsPerPage}
        page={page}
        rowsPerPage={limit}
      />
    </Card>
  );
};

CustomerListResults.propTypes = {
  customers: PropTypes.array.isRequired,
};
