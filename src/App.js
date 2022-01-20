import { useEffect, useState } from "react";
import initFirebase from "./help/firebaseConfig";
import styled from "styled-components";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, Routes, Navigate } from "react-router-dom";
import kakaoAuth from "help/kakaoAuth";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { setUid, getUserDocThunk } from "store/user";

import Login from "./page/login";
import Main from "./page/main";
import Profile from "./page/profile";

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
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => await kakaoAuth(kakaoAuthCode);

    const kakaoAuthCode = window.location.search.split("=")[1];
    if (kakaoAuthCode) {
      dispatch(setUid(getUser()));
    }
  }, []);

  useEffect(() => {
    const authStateListener = () => {
      setLoading(true);
      return firebase.auth().onAuthStateChanged(
        (user) => {
          if (user) {
            // signed in
            dispatch(setUid(user));
            dispatch(getUserDocThunk());
            setLoading(false);
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
    rightButton = <Avatar sx={{ bgcolor: deepOrange[100] }}>🐻</Avatar>;
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
        <NavLink className="nav-link btn btn-light" activeClassName="active" to="/">
          Snow Live
        </NavLink>
        {rightButton}
      </nav>
      <div>
        <Routes>
          <Route
            path="/"
            element={user.uid && user.profile ? <Main /> : <Navigate to="/profile" />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
