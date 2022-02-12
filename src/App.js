import { useEffect, useState } from "react";
import initFirebase from "./help/firebaseConfig";
import styled from "styled-components";
import Container from "@mui/material/Container";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, Routes, Link } from "react-router-dom";
import kakaoAuth from "help/kakaoAuth";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { setUid, getProfileThunk } from "store/user";
import { getAllDocsThunk } from "store/resorts";
import CircularProgress from "@mui/material/CircularProgress";

import Login from "./page/Login";
import Main from "./page/Main";
import MyPage from "./page/MyPage";
import Review from "./page/Review";
import ResortEditor from "./page/ResortEditor";
import PageHOC from "components/PageHOC";

initFirebase();

const Header = styled.div`
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  padding: 0 10% 0 10%;
  z-index: -1;
  height: 69.187px;
`;

function App() {
  const user = useSelector((state) => state.user);
  const resorts = useSelector((state) => state.resorts);

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  //Logical Indicator
  const fullfilledUser = user.uid && user.profile;

  useEffect(() => {
    const getUser = async (kacode) => {
      if (kacode) {
        return await kakaoAuth(kacode);
      }
    };
    const kakaoAuthCode = window.location.search.split("=")[1];
    if (kakaoAuthCode) {
      setLoading(true);
      getUser(kakaoAuthCode).then(() => setLoading(false));
      window.history.replaceState(null, null, "http://localhost:3000/");
    }
  }, [dispatch]);

  useEffect(() => {
    const authStateListener = () => {
      setLoading(true);
      return firebase.auth().onAuthStateChanged(
        (user) => {
          console.log(user);
          if (user) {
            // signed in
            dispatch(setUid({ uid: user.uid, name: user.name }));
            dispatch(getAllDocsThunk());
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
        <Avatar sx={{ bgcolor: deepOrange[100] }}>🐻</Avatar>
      </Link>
    );
  } else {
    rightButton = (
      <NavLink className="nav-link btn btn-light" activeClassName="active" to="/login">
        LOGIN
      </NavLink>
    );
  }

  return (
    <Container maxWidth="md" sx={{ height: "100vh" }}>
      <Header className="bg-success" />
      <nav className="navbar navbar-light bg-success">
        <NavLink className="nav-link btn btn-light" to="/">
          Snow Live
        </NavLink>
        {rightButton}
      </nav>
      <div className="d-flex justify-content-center w-100 mt-1">
        {loading ? (
          <CircularProgress mt={3} />
        ) : (
          <Routes>
            <Route path="/" element={<PageHOC name="Main" Component={<Main />} />} />
            <Route path="/login" element={<PageHOC name="Login" Component={<Login />} />} />
            <Route path="/my_page" element={<PageHOC name="MyPage" Component={<MyPage />} />} />
            {resorts.collection.map((resortObj, i) => (
              <Route
                key={i}
                path={`/${resortObj.url}`}
                element={<PageHOC name="Review" Component={<Review {...resortObj} />} />}
              />
            ))}
            <Route
              path="/resort_editor"
              element={<PageHOC name="ResortEditor" Component={<ResortEditor />} />}
            />
          </Routes>
        )}
      </div>
    </Container>
  );
}

export default App;
