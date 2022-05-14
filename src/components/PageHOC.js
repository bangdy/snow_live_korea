import { useEffect, useContext, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { NavActionsContext } from "help/customHooks";

import { nameToPath } from "help/util";

const PageHOC = ({ Component, name }) => {
  const user = useSelector((state) => state.user);
  const { setActions } = useContext(NavActionsContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [loadingFin, setLoadingFin] = useState(false);

  //Logical Indicator
  const preCheckingFin = user.uid === false || user.uid;
  const isLogin = user.uid;
  const notProfileYet = user.uid && !user.profile;
  const isCurrentPath = window.location.pathname === nameToPath(name);

  useEffect(() => {
    setActions([]);
    setLoadingFin(true);
  }, [location, preCheckingFin]);

  useEffect(() => {
    if (loadingFin && preCheckingFin && isCurrentPath) {
      switch (name) {
        case "Main":
          notProfileYet && navigate("/my_page");
          break;

        case "Login":
          notProfileYet && navigate("/my_page");
          isLogin && navigate("/");
          break;

        case "MyPage":
          !isLogin && navigate("/login");
          break;

        default:
          break;
      }
    }
  }, [location, preCheckingFin]);

  if (loadingFin && preCheckingFin) {
    return Component;
  } else {
    return <></>;
  }
};

export default PageHOC;
