import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import { NavActionsContext } from "help/customHooks";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

export default function FullWidthTabs(props) {
  const theme = useTheme();
  const user = useSelector((state) => state.user);
  const fullfilledUser = user.uid && user.profile;
  const [value, setValue] = useState(fullfilledUser ? 0 : 1);
  const { setActions } = useContext(NavActionsContext);

  const handleChange = (event, newValue) => {
    if (fullfilledUser) {
      setValue(newValue);
    } else {
      alert("프로필 등록을 먼저 해주세요.");
    }
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  useEffect(() => {
    setActions([]);
  }, [value]);

  return (
    <Box sx={{ bgcolor: "background.paper,", width: "100%" }}>
      <AppBar position="sticky" sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example">
          {props.pages.map((obj, i) => (
            <Tab key={i} label={obj.name} {...a11yProps(i)} />
          ))}
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={value}
        disabled={!fullfilledUser}
        onChangeIndex={handleChangeIndex}>
        {props.pages.map((obj, i) => {
          const Page = obj.page;
          return (
            <TabPanel key={i} value={value} index={i} dir={theme.direction}>
              <Page />
            </TabPanel>
          );
        })}
      </SwipeableViews>
    </Box>
  );
}
