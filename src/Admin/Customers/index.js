import { CustomerListResults } from "./CustomerDetail";
import { ThemeProvider } from "@mui/material/styles";
import { CustomerListToolbar } from "./CustomerToolBar";
import { Box, Container } from "@mui/material";
import { theme } from "../theme";
import { DashboardLayout } from "../Dashboards/DashboardLayout";
import { DashboardSidebar } from "../Dashboards/DashboardSidebar";
import { DashboardNavbar } from "../Dashboards/DashboardNavbar";

const Customers = () => (

  <>
    <ThemeProvider theme={theme}>
      <div className="dashBoardNarBar">
        <DashboardNavbar />
      </div>
      <DashboardSidebar />
      <div className="wrapper-AdminHome">
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            py: 8,
            backgroundColor: '#f9fafc'
          }}
        >
          <Container maxWidth={false}>
            <CustomerListToolbar />
            <Box sx={{ mt: 3 }}>
              <CustomerListResults />
            </Box>
          </Container>
        </Box>
      </div>
    </ThemeProvider>
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
