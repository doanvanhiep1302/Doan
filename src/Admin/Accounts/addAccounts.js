import { DashboardLayout } from "../Dashboards/DashboardLayout";
import {
  Button,
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { DashboardSidebar } from "../Dashboards/DashboardSidebar";
import { DashboardNavbar } from "../Dashboards/DashboardNavbar";
import {useSelector} from "react-redux";

function AddAccount(props) {
  AddAccount.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;
  const addCustomer = [
    {
      title: "Tài khoản",
      place: "Nhập tài khoản",
    },
    {
      title: "Mật khẩu",
      place: "Nhập mật khẩu",
    },
    {
      title: "Email",
      place: "Nhập hòm thư email",
    },
  ];
  const { user: currentUser } = useSelector((state) => state.userSlice);

  if(currentUser?.roles?.includes("ROLE_ADMIN")) {
    return (
        <>
          <ThemeProvider theme={theme}>
            <div className="dashBoardNarBar">
              <DashboardNavbar/>
            </div>
            <DashboardSidebar/>
            <div
                className="wrapper-AdminHome"
                style={{backgroundColor: "#f9fafc"}}
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
                <Typography sx={{m: 1}} variant="h4">
                  Thêm tài khoản
                </Typography>
              </Box>
              <Box sx={{mt: 3}}>
                <Card>
                  {addCustomer.map((add) => (
                      <CardContent sx={{display: "flex"}}>
                        <Box sx={{m: 1, width: "10%"}}>
                          <Typography sx={{m: 1}} variant="h6">
                            {add.title}
                          </Typography>
                        </Box>
                        <Box sx={{width: "80%"}}>
                          <TextField
                              fullWidth
                              InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start"></InputAdornment>
                                ),
                              }}
                              placeholder={add.place}
                              variant="outlined"
                          />
                        </Box>
                      </CardContent>
                  ))}
                  <FormControl sx={{ml: 5}}>
                    <Typography variant="h6">
                      Phân Quyền
                    </Typography>
                    <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                          value="user"
                          control={<Radio/>}
                          label="Người dùng"
                      />
                      <FormControlLabel
                          value="admin"
                          control={<Radio/>}
                          label="Quản trị viên"
                      />
                    </RadioGroup>
                  </FormControl>
                  <Box sx={{ml: "45%"}}>
                    <Button color="primary" variant="contained">
                      Xác Nhận
                    </Button>
                  </Box>
                </Card>
              </Box>
            </div>
          </ThemeProvider>
        </>
    );
  }
}
export default AddAccount;
