import {createTheme, ThemeProvider} from "@mui/material/styles";
import Navbar from "../../Components/Navbar/navbar";
import Grid from "@mui/material/Grid";
import CssBaseline from "@mui/material/CssBaseline";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {Copyright} from "@mui/icons-material";
import {useState} from "react";
import {validateOTP} from "../../api/otp";
import {toast} from "react-toastify";
import {CardBackButton} from "../../component-utility/icons-component";

const theme = createTheme();

const ResetPass = () => {

    const [resetPassInfo, setResetPassInfo] = useState({
        email: "",
        otpNo: "",
        password: "",
        rePassword: "",
        isOTPMail: true,
    })

    function handleSubmit(e) {
        e.preventDefault();
        validateOTP({
            ...resetPassInfo
        }).then(res => {
            const {data} = res;
            if (data.errorCode === "200") {
                toast.success("Thay đổi mật khẩu thành công!");

            } else {
                toast.error("OTP không hợp lệ!");
            }
        }).catch(error => {
            toast.error("OTP không hợp lệ!");

        })

    }

    function onChangeEmail(value) {
        setResetPassInfo({...resetPassInfo, email: value});
    }

    function onChangeOTP(value) {
        setResetPassInfo({...resetPassInfo, otpNo: value});
    }

    function onChangePassword(value) {
        setResetPassInfo({...resetPassInfo, password: value});
    }

    function onChangeRePassword(value) {
        setResetPassInfo({...resetPassInfo, rePassword: value});
    }

    return (
        <ThemeProvider theme={theme}>
            <Navbar/>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://www.dangquangwatch.vn/lib/ckfinder/images/rolex_deepsea_d-blue_dial_0004_1680x107014204133535196eDd.jpg)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Thay đổi mật khẩu
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Nhập email"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => onChangeEmail(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="otp"
                                label="Nhập mã OTP"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={(e) => onChangeOTP(e.target.value)}

                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Mật khẩu"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={(e) => onChangePassword(e.target.value)}
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="re-password"
                                label="Nhập Lại  Mật khẩu"
                                type="password"
                                id="re-password"
                                autoComplete="new-password"
                                onChange={(e) => onChangeRePassword(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Thay đổi password
                            </Button>
                            <Grid container>
                                <Grid item xs={6}>
                                    <Link to="/forgot/password">Lấy OTP</Link>
                                </Grid>
                                <Grid item xs={6}>
                                    <Link to="/login">
                                        <span className="float-end">{"Đăng nhập?"}</span>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default ResetPass;