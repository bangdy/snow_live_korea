import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";

const PageHOC = ({ Component, name }) => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  //Logical Indicator
  const isLogin = user.uid;
  const notProfileYet = isLogin && !(user.uid && user.profile);

  useEffect(() => {
    switch (name) {
      case "Main":
        notProfileYet && navigate("/my_page");
        break;

      case "Login":
        notProfileYet && navigate("/my_page");
        !notProfileYet && isLogin && navigate("/");
        break;

      case "MyPage":
        !isLogin && navigate("/login");
        break;

      default:
        break;
    }
  }, [location, isLogin]);

  return Component;
};

export default PageHOC;
