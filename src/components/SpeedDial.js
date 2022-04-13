import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useNavigate } from "react-router-dom";

const BasicSpeedDial = (props) => {
  const navigate = useNavigate();

  const BasicActions = [
    { icon: <QuestionMarkIcon />, name: "Logout", onClick: () => navigate("/about") },
  ];

  if (props.actions) {
    BasicActions.push(...props.actions);
  }

  return (
    <SpeedDial ariaLabel="SpeedDial basic example" direction="up" icon={<SpeedDialIcon />}>
      {BasicActions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
        />
      ))}
    </SpeedDial>
  );
};

export default BasicSpeedDial;
