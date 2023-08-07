import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useState} from "react";
import Navbar from "../Navbar/navbar";
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css';
import './styles.scss';
import {registerApi} from "../../api/auth";
import {toast} from "react-toastify";
import CustomError from "../../component-utility/custom-error";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Curno| '}

            Thương hiệu
            {' dành cho bạn và người thân'}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();



export default function SignUp() {

    const [user, setUser] = useState({
        fullName: "",
        username: "",
        password: "",
        rePassword: "",
        address: "",
        email: "",
        phoneNumber: "",
        role: ["user"]
    });
    const [isSaveClick, setIsSaveClick] = useState(false);
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsSaveClick(true);
        if(Object.keys(validate()) && Object.keys(validate()).length) return;
        registerApi({
            ...user,
            fullName: user.fullName,
            username: user.username,
            password: user.password,
            rePassword: user.rePassword,
            address: user.address,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role
        }).then(res => {
            const {data} = res;
            if (data) {
                if (res.status === 200) {
                    toast.success("Đăng ký thành công!");
                    setIsSaveClick(false);
                    clearForm();
                    navigate("/login")
                } else {
                    toast.error("Thất bại!")
                }
            }
        }).catch(err => {
            const {data} = err?.response;
            toast.error(data.message)
        })
    };

    const clearForm = () => {
        setUser({
            fullName: "",
            username: "",
            password: "",
            rePassword: "",
            address: "",
            email: "",
            phoneNumber: "",
            role: ["user"]
        })
    }

    const validate = () => {
        const errors = {};
        if (!user?.fullName) {
            errors.fullName = "Tên Không Được Để Trông";
        }
        if (!user?.username) {
            errors.username = "Username Không Được Để Trống";
        }
        if (!user?.password) {
            errors.password = "Password Không Được Để Trống";
        }
        if (!user?.rePassword?.trim()) {
            errors.rePassword = "Mật Khẩu Xác Nhận Không Được Để Trống";

        }
        else {
            if(user?.password != user?.rePassword) {
                errors.rePassword = "Password Và Mật Khẩu Xác Nhận Phải Trùng Khớp";
            }
        }
        if (!user?.address) {
            errors.address = "Địa Chỉ Không Được Để Trống";
        }
        if (!user?.email) {
            errors.email = "Email Không Được Để Trống";
        }
        if (!user?.phoneNumber) {
            errors.phoneNumber = "Số Điện Thoại Không Được Để Trống";
        }
        return errors;
    }


    function onChangeFullName(value) {
        const tmp = {...user};
        tmp.fullName = value;
        setUser(tmp);
    }

    function onChangeUsername(value) {
        const tmp = {...user};
        tmp.username = value;
        setUser(tmp);
    }

    function onChangePassword(value) {
        const tmp = {...user};
        tmp.password = value;
        setUser(tmp);
    }

    function onChangeEmail(value) {
        const tmp = {...user};
        tmp.email = value;
        setUser(tmp);
    }

    function onChangeAddress(value) {
        const tmp = {...user};
        tmp.address = value;
        setUser(tmp);
    }

    function onChangePhoneNumber(value) {
        const tmp = {...user};
        tmp.phoneNumber = value;
        setUser(tmp);
    }

    function onChangeRePassword(value) {
        const tmp = {...user};
        tmp.rePassword = value;
        setUser(tmp);
    }

    return (
        <>
            <Navbar/>
            <ThemeProvider theme={theme}>
                <Container component="main" maxWidth="xs">
                    <CssBaseline/>
                    <Box
                        className="register"
                        sx={{
                            marginTop: 8,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Đăng Ký
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 3}}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <TextField
                                        autoComplete="given-name"
                                        name="firstName"
                                        required
                                        fullWidth
                                        id="firstName"
                                        label="Họ và tên"
                                        value={user.fullName}
                                        autoFocus
                                        onChange={(e) => onChangeFullName(e.target.value)}
                                    />
                                    <CustomError message={validate(user)?.fullName} isSaveClick={isSaveClick}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="lastName"
                                        label="Tài khoản"
                                        name="lastName"
                                        autoComplete="family-name"
                                        value={user.username}
                                        onChange={(e) => onChangeUsername(e.target.value)}

                                    />
                                    <CustomError message={validate(user)?.username} isSaveClick={isSaveClick}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="email"
                                        label="Email"
                                        name="email"
                                        autoComplete="email"
                                        value={user.email}
                                        onChange={(e) => onChangeEmail(e.target.value)}

                                    />
                                    <CustomError message={validate(user)?.email} isSaveClick={isSaveClick}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        id="address"
                                        label="Address"
                                        name="address"
                                        autoComplete="address"
                                        value={user.address}
                                        onChange={(e) => onChangeAddress(e.target.value)}
                                    />
                                    <CustomError message={validate(user)?.address} isSaveClick={isSaveClick}/>

                                </Grid>
                                <Grid item xs={12}>
                                    <PhoneInput
                                        specialLabel={''}
                                        country={'vn'}
                                        width={"100%"}
                                        value={user.phoneNumber}
                                        onChange={(value) => onChangePhoneNumber(value)}
                                        // inputStyle={{
                                        //     borderColor: (props.touched && props.error) && "red"
                                        // }}
                                    />
                                    <CustomError message={validate(user)?.phoneNumber} isSaveClick={isSaveClick}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Mật khẩu"
                                        type="password"
                                        id="password"
                                        value={user.password}
                                        autoComplete="new-password"
                                        onChange={(e) => onChangePassword(e.target.value)}

                                    />
                                    <CustomError message={validate(user)?.password} isSaveClick={isSaveClick}/>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        required
                                        fullWidth
                                        name="password"
                                        label="Nhập lại mật khẩu"
                                        type="password"
                                        id="password"
                                        value={user.rePassword}
                                        onChange={(e) => onChangeRePassword(e.target.value)}
                                        autoComplete="confirm-password"
                                    />
                                    <CustomError message={validate(user)?.rePassword} isSaveClick={isSaveClick}/>
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                ĐĂNG KÝ
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link to="/login">
                                        <span>Bạn đã có tài khoản?</span> <span>Đăng nhập</span>
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                    <Copyright sx={{mt: 5}}/>
                </Container>
            </ThemeProvider>
        </>
    );
}
