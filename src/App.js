import { useEffect, useState } from "react";
import initFirebase from "./help/firebaseConfig";
import styled from "styled-components";
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
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Stack from "@mui/material/Stack";

import Login from "./page/Login";
import Main from "./page/Main";
import MyPage from "./page/MyPage";
import About from "./page/About";
import ResortReviews from "./page/ResortReviews";
import ResortEditor from "./page/ResortEditor";
import PageHOC from "components/PageHOC";
import ProfileAvatar from "components/ProfileAvatar";
import { isMobile } from "help/util";
import SpeedDial from "components/SpeedDial";

initFirebase();

const Header = styled.div`
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
  padding: 0 10% 0 10%;
  z-index: 100;
  background-color: #1976d2;
`;

function App() {
  const user = useSelector((state) => state.user);
  const [currentWidth, setCurrentWidth] = useState(window.innerWidth);
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
      navigate("/loading");
      getUser(kakaoAuthCode);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllDocsThunk());
  }, [dispatch]);

  useEffect(() => {
    const authStateListener = () => {
      dispatch(setLoading(true));
      return firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            // signed in
            dispatch(setLoading(true));
            dispatch(setUid({ uid: user.uid, name: user.name }));
            dispatch(getPictureThunk(user.uid));
            dispatch(getProfileThunk(user.uid)).then((r) => navigate("/"));
          } else {
            // not login
            console.log("fail");
            dispatch(setLoading(false));
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
    if (window.innerWidth < 760 || isMobile()) {
      dispatch(setMobile(true));
    } else {
      dispatch(setMobile(false));
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("resize", () => setCurrentWidth(window.innerWidth));
  }, []);

  let rightButton;

  <IconButton
    sx={{
      border: 1,
      backgroundColor: "#f9f9f9",
    }}
    color="primary"
    aria-label="upload picture"
    component="span">
    <QuestionMarkIcon sx={{ width: 20, height: 20 }} />
  </IconButton>;

  const actions = [
    { icon: <QuestionMarkIcon />, name: "Logout", onClick: () => navigate("/about") },
  ];

  const currentPath = window.location.pathname;
  const LoadingItem = (
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
  );

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
    <Stack
      direction="column"
      sx={{
        height: "100vh",
        flexGrow: 1,
        overflow: "visible",
        zIndex: 10,
        paddingX: 0,
        marginX: "auto",
      }}>
      <AppBar
        position={currentPath === "/my_page" ? "relative" : "fixed"}
        sx={{
          height: 70,
          alignItems: "center",
          zIndex: 100,
          marginBottom: currentPath === "/my_page" ? "-70px" : 0,
        }}
        elevation={0}>
        <Header />
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: currentWidth > 768 ? "768px" : "100%",
          }}>
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
          height: loading || currentPath == "/loading" ? "50%" : null,
        }}>
        <>
          {loading ? (
            LoadingItem
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
              <Route
                path="/about"
                element={<PageHOC name="ResortEditor" Component={<About />} />}
              />
              <Route path="/loading" element={LoadingItem} />
            </Routes>
          )}
        </>
      </Box>
      <Box
        pr={2}
        sx={{
          position: user.isMobile ? "sticky" : "fixed",
          right: !user.isMobile && 100,
          bottom: 30,
          alignSelf: "flex-end",
        }}>
        <SpeedDial actions={actions} />
      </Box>
    </Stack>
  );
}

export default App;
