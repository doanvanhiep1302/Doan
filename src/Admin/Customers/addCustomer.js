import { DashboardLayout } from "../Dashboards/DashboardLayout";
import { useState, useEffect} from 'react';
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { DashboardSidebar } from "../Dashboards/DashboardSidebar";
import { DashboardNavbar } from "../Dashboards/DashboardNavbar";
import { LatestCustomer } from "./lastCustomer";
import axios from "axios";


function AddCustomer(props) {
  
  AddCustomer.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');
  const [price, setPrice] = useState();
  const [saleOff, setSaleOff] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3004/products`)
      .then((res) => {
        const persons = res.data;
        setData(persons);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(title, brand, image, price, saleOff);
 };

 // POST with Axios
 const addPosts = async (title, brand, image, price, saleOff) => {
    let response = await axios.post('http://localhost:3004/products', {
       title: title,
       brand: brand,
       image: image,
       price: price,
       saleOff: saleOff
    });
    setData([response.data, ...data ]);
    setTitle('');
    setBrand('');
    setImage('');
    setPrice('');
    setSaleOff('');
 };

 


  return (
    <>
      <ThemeProvider theme={theme}>
        <div className="dashBoardNarBar">
          <DashboardNavbar />
        </div>
        <DashboardSidebar />
        <div
          className="wrapper-AdminHome"
          style={{ backgroundColor: "#f9fafc" }}
        >
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
              mt: 8,
            }}
          >
            <Typography sx={{ m: 1 }} variant="h4">
              Thêm khách hàng
            </Typography>
          </Box>
          <Box sx={{ mt: 3 }}>
            <Card>
            <CardContent sx={{display: "flex"}}>
                <Box sx={{ m: 1, width: '10%' }}>
                  <Typography sx={{ m: 1 }} variant="h6">
                    Title
                  </Typography>
                </Box>
                <Box sx={{ width: "80%" }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
              <CardContent sx={{display: "flex"}}>
                <Box sx={{ m: 1, width: '10%' }}>
                  <Typography sx={{ m: 1 }} variant="h6">
                    Brand
                  </Typography>
                </Box>
                <Box sx={{ width: "80%" }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
              <CardContent sx={{display: "flex"}}>
                <Box sx={{ m: 1, width: '10%' }}>
                  <Typography sx={{ m: 1 }} variant="h6">
                    Image
                  </Typography>
                </Box>
                <Box sx={{ width: "80%" }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
              <CardContent sx={{display: "flex"}}>
                <Box sx={{ m: 1, width: '10%' }}>
                  <Typography sx={{ m: 1 }} variant="h6">
                    Price
                  </Typography>
                </Box>
                <Box sx={{ width: "80%" }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
              <CardContent sx={{display: "flex"}}>
                <Box sx={{ m: 1, width: '10%' }}>
                  <Typography sx={{ m: 1 }} variant="h6">
                    SaleOff
                  </Typography>
                </Box>
                <Box sx={{ width: "80%" }}>
                  <TextField
                    fullWidth
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                        </InputAdornment>
                      ),
                    }}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
                <Box sx={{ ml: '45%' }}>
            <Button
            onClick={handleSubmit}
            color="primary" variant="contained">
              Thêm sản phẩm
            </Button>
          </Box>
            </Card>
          </Box>
          <LatestCustomer />
        </div>
      </ThemeProvider>
    </>
  );
}

export default AddCustomer;
