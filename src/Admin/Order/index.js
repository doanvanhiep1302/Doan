import {ThemeProvider} from "@mui/material/styles";
import {Box, Button, Container, InputAdornment, Modal, SvgIcon, TextField} from "@mui/material";
import {theme} from "../theme";
import {DashboardLayout} from "../Dashboards/DashboardLayout";
import {DashboardSidebar} from "../Dashboards/DashboardSidebar";
import {DashboardNavbar} from "../Dashboards/DashboardNavbar";
import {OrderListResults} from "./orderDetail";
import DashboardTitle from "../../Components/DashboardTitle";
import {useSelector} from "react-redux";


const Orders = () => {

    const { user: currentUser } = useSelector((state) => state.userSlice);

    if(currentUser?.roles?.includes("ROLE_ADMIN")) {
        return (<>
                <ThemeProvider theme={theme}>
                    <div className="dashBoardNarBar">
                        <DashboardNavbar/>
                    </div>
                    <DashboardSidebar/>
                    <div className="wrapper-AdminHome body-container">
                        <DashboardTitle title="Danh Sách Đơn Hàng"/>
                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            <Container maxWidth={false}>
                                <Box sx={{mt: 3}}>
                                    <OrderListResults/>
                                </Box>
                            </Container>
                        </Box>
                    </div>
                </ThemeProvider>

            </>
        );
    }
}
Orders.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Orders;
