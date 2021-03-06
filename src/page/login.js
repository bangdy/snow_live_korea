/*global Kakao*/
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import kImage from "../assets/kakao_login_medium.png";
import { setLoading } from "store/user";
import { useDispatch } from "react-redux";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {"Copyright © "}
      Snow Live / {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Login(props) {
  const dispatch = useDispatch();

  const redirectUri = window.location.protocol + "//" + window.location.host;

  const onClickToAuthorize = () => {
    dispatch(setLoading(true));
    Kakao.Auth.authorize({
      redirectUri: redirectUri,
    }).catch((err) => console.log(err));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}>
            간편로그인 / 간편가입
          </Typography>

          <Button variant="text">
            <img src={kImage} onClick={onClickToAuthorize} alt="KakaoTalk_logo" />
          </Button>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
