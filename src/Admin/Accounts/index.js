import {ThemeProvider} from "@mui/material/styles";
import {Box, Container, InputAdornment, SvgIcon, TextField} from "@mui/material";
import {theme} from "../theme";
import {DashboardLayout} from "../Dashboards/DashboardLayout";
import {DashboardSidebar} from "../Dashboards/DashboardSidebar";
import {DashboardNavbar} from "../Dashboards/DashboardNavbar";
import {AccountListResults} from "./AccountDetail";
import DashboardTitle from "../../Components/DashboardTitle";
import {Search as SearchIcon} from "../icons/search";
import {useState} from "react";
import {useSelector} from "react-redux";

const Accounts = () => {
    const [keyword, setKeyword] = useState("");

    function onChangeSearch(value) {
        setKeyword(value);
    }

    const { user: currentUser } = useSelector((state) => state.userSlice);



    if(currentUser?.roles?.includes("ROLE_ADMIN")) {
        return (<>
                <ThemeProvider theme={theme}>
                    <div className="dashBoardNarBar">
                        <DashboardNavbar/>
                    </div>
                    <DashboardSidebar/>
                    <div className="wrapper-AdminHome body-container">
                        <DashboardTitle title="Khách Hàng"/>

                        <Box
                            component="main"
                            sx={{
                                flexGrow: 1,
                            }}
                        >
                            <Container maxWidth={false}>
                                <TextField
                                    label={"Tìm Kiếm Khách Hàng"}
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
                                    placeholder="Tìm Kiếm Khách Hàng"
                                    value={keyword}
                                    onChange={(e) => onChangeSearch(e.target.value)}
                                    // variant="outlined"
                                />
                                <Box sx={{mt: 3}}>
                                    <AccountListResults keyword={keyword}/>
                                </Box>
                            </Container>
                        </Box>
                    </div>
                </ThemeProvider>
            </>
        )
            ;
    }
}
Accounts.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Accounts;
