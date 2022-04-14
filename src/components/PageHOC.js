import { useEffect, useContext } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { NavActionsContext } from "help/customHooks";

const PageHOC = ({ Component, name }) => {
  const user = useSelector((state) => state.user);
  const { setActions } = useContext(NavActionsContext);
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

  useEffect(() => {
    setActions([]);
  }, [location, isLogin]);

  return Component;
};

export default PageHOC;
