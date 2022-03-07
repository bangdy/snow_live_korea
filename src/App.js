import { useEffect, useState } from "react";
import initFirebase from "./help/firebaseConfig";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import kakaoAuth from "help/kakaoAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { setUid, getProfileThunk, getPictureThunk, setMobile, setLoading } from "store/user";
import { getAllDocsThunk } from "store/resorts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Login from "./page/Login";
import Main from "./page/Main";
import MyPage from "./page/MyPage";
import ResortReviews from "./page/ResortReviews";
import ResortEditor from "./page/ResortEditor";
import PageHOC from "components/PageHOC";
import ProfileAvatar from "components/ProfileAvatar";
import Stack from "@mui/material/Stack";

initFirebase();

const Header = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding: 0 10% 0 10%;
  z-index: -1;
  height: 70px;
  background-color: #1976d2;
`;

function App() {
  const user = useSelector((state) => state.user);
  const loading = user.loading;
  const resorts = useSelector((state) => state.resorts);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    const redirectUri = window.location.protocol + "//" + window.location.host;
    const getUser = async (kacode) => {
      if (kacode) {
        return kakaoAuth(kacode, redirectUri);
      }
    };
    const kakaoAuthCode = window.location.search.split("=")[1];
    if (kakaoAuthCode) {
      dispatch(setLoading(true));
      getUser(kakaoAuthCode).then((r) => navigate("/"));
    }
  }, [dispatch]);

  useEffect(() => {
    const authStateListener = () => {
      dispatch(setLoading(true));
      return firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            // signed in
            dispatch(setUid({ uid: user.uid, name: user.name }));
            dispatch(getPictureThunk(user.uid)).then(() =>
              dispatch(getAllDocsThunk()).then(() => dispatch(setLoading(false)))
            );
            dispatch(getProfileThunk(user.uid));
          } else {
            // signed out
            console.log("fail");
          }
        },
        (error) => {
          // error
          console.log(error);
          dispatch(setLoading(false));
        }
      );
    };
    const unsubscribe = authStateListener();

    return () => unsubscribe();
  }, [dispatch]);

  const handleResize = () => {
    if (window.innerWidth < 500) {
      dispatch(setMobile(true));
    } else {
      dispatch(setMobile(false));
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  }, [window.addEventListener]);

  let rightButton;

  if (loading) {
    rightButton = "";
  } else if (user.uid) {
    rightButton = (
      <Link to="/my_page" style={{ textDecoration: "none" }}>
        <ProfileAvatar user={user} size={40} />
      </Link>
    );
  } else {
    rightButton = (
      <Link to="/login" style={{ textDecoration: "none" }}>
        <Typography
          variant="h6"
          component="div"
          sx={{
            border: 1,
            borderRadius: 1,
            backgroundColor: "white",
            padding: 0.5,
          }}>
          LOGIN
        </Typography>
      </Link>
    );
  }

  return (
    <Container maxWidth="md" sx={{ height: "100vh", flexGrow: 1 }}>
      <Header />
      <AppBar position="fixed" sx={{ height: 70 }} elevation={0}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography variant="h6" component="div" sx={{ color: "white" }}>
              Snow Live
            </Typography>
          </Link>
          {rightButton}
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginX: "auto",
          maxWidth: "500px",
          width: "100%",
          paddingTop: "70px",
          height: loading ? "50%" : null,
        }}>
        <>
          {loading ? (
            <Stack
              mt={2}
              direction="column"
              sx={{
                flexBasis: 1,
                alignSelf: "stretch",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <CircularProgress color="success" size={100} />
            </Stack>
          ) : (
            <Routes>
              <Route path="/" element={<PageHOC name="Main" Component={<Main />} />} />
              <Route path="/login" element={<PageHOC name="Login" Component={<Login />} />} />
              <Route path="/my_page" element={<PageHOC name="MyPage" Component={<MyPage />} />} />
              {Object.keys(resorts.collection).map((key, i) => (
                <Route
                  key={i}
                  path={`/${resorts.collection[key].info.url}`}
                  element={
                    <PageHOC
                      name="Review"
                      Component={<ResortReviews {...resorts.collection[key]} />}
                    />
                  }
                />
              ))}
              <Route
                path="/resort_editor"
                element={<PageHOC name="ResortEditor" Component={<ResortEditor />} />}
              />
            </Routes>
          )}
        </>
      </Box>
    </Container>
  );
}

export default App;
