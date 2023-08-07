import "./adminHome.scss";
import HomePage from "./HomePage";
import { theme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";
import { DashboardSidebar } from "./Dashboards/DashboardSidebar";
import { DashboardNavbar } from "./Dashboards/DashboardNavbar";
import {useSelector} from "react-redux";

function AdminHome() {

    const { user: currentUser } = useSelector((state) => state.userSlice);


    if(currentUser?.roles?.includes("ROLE_ADMIN")) {
        return (
            <ThemeProvider theme={theme}>
                <div className="dashBoardNarBar">
                    <DashboardNavbar/>
                </div>
                <DashboardSidebar/>
                <div className="wrapper-AdminHome body-container">
                    <HomePage/>
                </div>
            </ThemeProvider>
        );
    }
}
export default AdminHome;
