import { useEffect } from "react";
import initFirebase from "./help/firebaseConfig";
import styled from "styled-components";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { Route, NavLink, Routes } from "react-router-dom";
import Login from "./page/login";
import kakaoAuth from "help/kakaoAuth";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

//process.env.REACT_APP_REST_API_KEY ??

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

  useEffect(() => {
    const kakaoAuthCode = window.location.search.split("=")[1];
    kakaoAuthCode && kakaoAuth(kakaoAuthCode, dispatch);
  }, []);

  return (
    <Container maxWidth="md" sx={{ height: "100vh" }}>
      <Header className="bg-success" />
      <nav className="navbar navbar-light bg-success">
        <NavLink className="nav-link btn btn-light" activeClassName="active" to="/">
          Snow Live
        </NavLink>
        {user.uid ? (
          <Avatar sx={{ bgcolor: deepOrange[500] }}>{user.name}</Avatar>
        ) : (
          <NavLink className="nav-link btn btn-light" activeClassName="active" to="/login">
            LOGIN
          </NavLink>
        )}
      </nav>
      <div>
        <Routes>
          <Route path="/" element={<Box />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Container>
  );
}

export default App;
