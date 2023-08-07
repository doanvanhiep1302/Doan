import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {Link, useNavigate} from 'react-router-dom';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import Navbar from "../Navbar/navbar";
import {useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../api/action/auth";
import {loginSuccess} from "../../redux/userSlice";
import CustomError from "../../component-utility/custom-error";


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Curnon| '}
            Thương hiệu
            {' dành cho bạn và người thân'}

            {'.'}
        </Typography>
    );
}

const theme = createTheme();

export default function Login() {

    const form = useRef();
    const checkBtn = useRef();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [messageError, setMessageError] = useState("");
    const navigator = useNavigate();

    const {isLoggedIn} = useSelector(state => state.userSlice);
    const {message} = useSelector(state => state.messageSlice);

    const dispatch = useDispatch();


    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);

        if (username && password) {
            dispatch(login(username, password))
                .then((res) => {
                    dispatch(loginSuccess({user: res}));
                    if (res.roles && res.roles.length && res.roles.includes("ROLE_ADMIN")) {
                        navigator("/admin");
                    } else {
                        navigator("/");

                    }
                    return Promise.resolve();
                })
                .catch(() => {
                    setLoading(false);
                    setMessageError("Tài khoản không hợp lệ");
                });
        } else {
            setLoading(false);
            setMessageError("Tài khoản không hợp lệ");

        }
    };

    const onChangeUsername = (e) => {
        const username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    return (
        <ThemeProvider theme={theme}>
            <Navbar/>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    className="login"
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
                            Đăng Nhập
                        </Typography>

                        <Box  noValidate sx={{mt: 1}} style={{width: "100%"}}>
                           <form onSubmit = {handleSubmit}>
                            <div className="row">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Tài khoản"
                                    name="email"
                                    autoComplete="email"
                                    value={username}
                                    autoFocus
                                    onChange={onChangeUsername}


                                />
                            </div>
                            <div className="row">
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Mật khẩu"
                                    type="password"
                                    id="password"
                                    value={password}
                                    autoComplete="current-password"
                                    onChange={onChangePassword}
                                />
                            </div>
                            {/*<div className="row">*/}
                            {/*    <CustomError message={messageError} isSaveClick={true}/>*/}
                            {/*</div>*/}
                            {/*<div className="row">*/}
                            {/*    <CustomError message={messageError} isSaveClick={true}/>*/}
                            {/*</div>*/}
                            <div className="row">
                                <CustomError message={messageError} isSaveClick={true}/>
                            </div>


                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox value="remember" color="primary"/>}*/}
                            {/*    label="Nhớ mật khẩu"*/}
                            {/*/>*/}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                                ref={checkBtn}
                                //onClick={handleSubmit}
                            >
                                Đăng nhập
                            </Button>
                           </form>
                            <Grid container>
                                <Grid item xs>
                                    <Link to="/forgot/password">
                                        Quên mật khẩu?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="/singUp">
                                        {"Đăng ký?"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}