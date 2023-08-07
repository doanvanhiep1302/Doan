import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ForwardToInboxIcon from '@mui/icons-material/ForwardToInbox';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useState} from "react";
import {sendMail} from "../../api/auth";
import {generateOTP} from "../../api/otp";
import {useNavigate} from "react-router-dom";

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

export default function ForgotPass() {

  const [email, setEmail] = useState("");
  const navigator = useNavigate();

  const onChangeEmail = (value) => {
    setEmail(value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    generateOTP({email: email}).then(
        res => {
          const {data} = res;
          if(data.errorCode == "200") {
            navigator("/reset/password")
          }
        }
    )
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <ForwardToInboxIcon />
          </Avatar>
          
          <Box component="form" noValidate  sx={{ mt: 3 }}>
            <Grid container spacing={1}>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => onChangeEmail(e.target.value)}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={handleSubmit}
            >
              ĐẶT LẠI MẬT KHẨU
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}