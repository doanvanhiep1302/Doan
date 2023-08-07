import { format } from "date-fns";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PerfectScrollbar from "react-perfect-scrollbar";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from "@mui/material";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

export const LatestCustomer = () => {
  const [data, setData] = useState([]);


  const loadData = () => {
    axios
      .get(`http://localhost:3004/products?_limit=5`)
      .then((res) => {
        const persons = res.data;
        setData(persons);
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    loadData();
  }, [data]);

  const deletePost = (id) => {
    axios.delete(`http://localhost:3004/products` + `/` + id)
    loadData();
 };


  return (
    <Card>
      <CardHeader title="Latest Customer" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: "100%", m: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Họ và Tên</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Địa Chỉ</TableCell>
                <TableCell>Số Điện Thoại</TableCell>
                <TableCell sortDirection="desc">
                  <Tooltip enterDelay={300} title="Sort">
                    <TableSortLabel active direction="desc">
                      Date
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((customer) => (
                <TableRow hover>
                  <TableCell>{customer.title}</TableCell>
                  <TableCell>{customer.brand}</TableCell>
                  <TableCell>Hà Nội</TableCell>
                  <TableCell sx={{ display: 'flex'}}>
                  {customer.price}
                    <div>
                      <Tooltip title="Xoá">
                        <Button onClick={() => deletePost(customer.id)} sx={{ml: 2}} variant="contained" color="error">
                          <DeleteIcon />
                        </Button>
                      </Tooltip>
                    </div>
                  </TableCell>
                  <TableCell>06/07/2022</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          p: 2,
        }}
      >
        <Link to="/admin/customer">
          <Button
            color="primary"
            endIcon={<ArrowRightIcon fontSize="small" />}
            size="small"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </Box>
    </Card>
  );
};
