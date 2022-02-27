import { useEffect, useState } from "react";
import initFirebase from "./help/firebaseConfig";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes, Link } from "react-router-dom";
import kakaoAuth from "help/kakaoAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { setUid, getProfileThunk, getPictureThunk } from "store/user";
import { getAllDocsThunk } from "store/resorts";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import Login from "./page/Login";
import Main from "./page/Main";
import MyPage from "./page/MyPage";
import Review from "./page/Review";
import ResortEditor from "./page/ResortEditor";
import PageHOC from "components/PageHOC";
import ProfileAvatar from "components/ProfileAvatar";

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
  const resorts = useSelector((state) => state.resorts);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const redirectUri = window.location.protocol + "//" + window.location.host;
    const getUser = async (kacode) => {
      if (kacode) {
        return await kakaoAuth(kacode, redirectUri);
      }
    };
    const kakaoAuthCode = window.location.search.split("=")[1];
    if (kakaoAuthCode) {
      setLoading(true);
      getUser(kakaoAuthCode).then(() => setLoading(false));
      window.history.replaceState(null, null, redirectUri);
    }
  }, [dispatch]);

  useEffect(() => {
    const authStateListener = () => {
      setLoading(true);
      return firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            // signed in
            dispatch(setUid({ uid: user.uid, name: user.name }));
            dispatch(getAllDocsThunk());
            dispatch(getPictureThunk(user.uid));
            dispatch(getProfileThunk(user.uid)).then(() => setLoading(false));
          } else {
            // signed out
            console.log("fail");
            setLoading(false);
          }
        },
        (error) => {
          // error
          console.log(error);
          setLoading(false);
        }
      );
    };
    const unsubscribe = authStateListener();

    return () => unsubscribe();
  }, [dispatch]);

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
      <AppBar
        position="static"
        sx={{ display: "block", height: 70 }}
        position="sticky"
        elevation={0}>
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
          marginTop: 1,
          maxWidth: "500px",
          width: "100%",
        }}>
        <>
          {loading ? (
            <CircularProgress mt={3} />
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
                    <PageHOC name="Review" Component={<Review {...resorts.collection[key]} />} />
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
