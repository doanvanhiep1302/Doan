import {Box, Container, Grid, InputAdornment, SvgIcon, TextField} from '@mui/material';
import {ProductListToolbar} from './product-list-toolbar';
import {ProductCard} from './product-card';
import {DashboardLayout} from '../Dashboards/DashboardLayout';
import {ThemeProvider} from "@mui/material/styles";
import {theme} from "../theme";
import {DashboardSidebar} from "../Dashboards/DashboardSidebar";
import {DashboardNavbar} from "../Dashboards/DashboardNavbar";
import {getProduct} from "../../api/product";
import {useState, useEffect} from "react";
import Button from "@mui/material/Button";
import {Search as SearchIcon} from "../icons/search";
import { Link } from "react-router-dom";
import DashboardTitle from "../../Components/DashboardTitle";
import {useSelector} from "react-redux";

const Products = () => {

    const [keyword, setKeyword] = useState("");

    Products.getLayout = (page) => (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    );

    function onChangeSearch(value) {
        setKeyword(value);
    }

    const { user: currentUser } = useSelector((state) => state.userSlice);

    if(currentUser?.roles?.includes("ROLE_ADMIN")) {
        return (
            <>
                <ThemeProvider theme={theme}>
                    <div className="dashBoardNarBar">
                        <DashboardNavbar/>
                    </div>
                    <DashboardSidebar/>
                    <div className="wrapper-AdminHome body-container">
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                                py: 8,
                                backgroundColor: '#f9fafc'
                            }}
                        >

                            <Container maxWidth={false}>
                                <DashboardTitle title="Sản phẩm"/>
                                <div className="d-flex justify-content-between">
                                    <div>
                                        {/*<Input*/}
                                        <TextField
                                            label={"Tìm kiếm sản phẩm"}
                                            size="small"
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <SvgIcon
                                                            fontSize="small"
                                                            color="action"
                                                        >
                                                            <SearchIcon/>
                                                        </SvgIcon>
                                                    </InputAdornment>
                                                )
                                            }}
                                            placeholder="Search product"
                                            value={keyword}
                                            onChange={(e) => onChangeSearch(e.target.value)}
                                            // variant="outlined"
                                        />
                                    </div>
                                    <Link to="/admin/product/addProduct"><Button variant={"contained"}>Thêm sản
                                        phẩm</Button></Link></div>
                                <Box sx={{mt: 3}}>
                                    <ProductCard keyword={keyword}/>
                                </Box>
                            </Container>
                        </Box>
                    </div>
                </ThemeProvider>
            </>
        );
    }
}


export default Products;
