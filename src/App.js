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
import Stack from "@mui/material/Stack";

import Login from "./page/Login";
import Main from "./page/Main";
import MyPage from "./page/MyPage";
import About from "./page/About";
import Admin from "./page/Admin";
import ResortReviews from "./page/ResortReviews";
import ResortEditor from "./page/ResortEditor";
import PageHOC from "components/PageHOC";
import ProfileAvatar from "components/ProfileAvatar";
import { isMobile, nameToPath } from "help/util";
import SpeedDial from "components/SpeedDial";
import { NavActionsContext } from "help/customHooks";
import * as Sentry from "@sentry/react";

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
  const [actions, setActions] = useState([]);
  const [hasError, setHasError] = useState(false);
  const actionsProvider = { actions, setActions };
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
      navigate("/");
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
            dispatch(getProfileThunk(user.uid)).then((r) => dispatch(setLoading(false)));
          } else {
            // not login
            console.log("fail");
            dispatch(setLoading(false));
            dispatch(setUid({ uid: false, name: null }));
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

  const dialButtonMargin = currentWidth > 760 ? (currentWidth - 760) / 2 + 24 : 16;

  let rightButton;

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
    <Sentry.ErrorBoundary fallback={<p>An error has occurred</p>} showDialog>
      <NavActionsContext.Provider value={actionsProvider}>
        <Stack
          direction="column"
          sx={{
            height: "100vh",
            flexGrow: 1,
            overflow: "visible",
            paddingX: 0,
            marginX: "auto",
          }}>
          <AppBar
            position={currentPath === "/my_page" ? "relative" : "fixed"}
            sx={{
              height: 72,
              alignItems: "center",
              zIndex: 100,
              marginBottom: currentPath === "/my_page" ? -9 : 0,
            }}
            elevation={0}>
            <Header />
            <Toolbar
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: currentWidth > 768 ? 768 : "100%",
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
              maxWidth: 500,
              width: "100%",
              paddingTop: 9,
              height: loading || currentPath == "/loading" ? "50%" : null,
            }}>
            <>
              {loading ? (
                LoadingItem
              ) : (
                <Routes>
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

                  <Route path="/" element={<PageHOC name="Main" Component={<Main />} />} />
                  <Route path="/login" element={<PageHOC name="Login" Component={<Login />} />} />
                  <Route
                    path="/my_page"
                    element={<PageHOC name="MyPage" Component={<MyPage />} />}
                  />
                  <Route path="/about" element={<PageHOC name="About" Component={<About />} />} />
                  {user.profile?.isAdmin && (
                    <Route
                      path="/admin"
                      element={<PageHOC name="ResortEditor" Component={<Admin />} />}
                    />
                  )}
                </Routes>
              )}
            </>
          </Box>

          <Stack
            alignSelf="flex-end"
            direction="row"
            justifyContent="flex-end"
            sx={{ position: "fixed", bottom: 0, overFlow: "hidden" }}>
            <SpeedDial
              sx={{ marginBottom: 3, marginRight: dialButtonMargin.toString() + "px" }}
              actions={actions}
            />
          </Stack>
        </Stack>
      </NavActionsContext.Provider>
    </Sentry.ErrorBoundary>
  );
}

export default App;
