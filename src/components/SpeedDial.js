import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useNavigate } from "react-router-dom";

const BasicSpeedDial = (props) => {
  const navigate = useNavigate();

  const { ...leftOver } = props;

  const BasicActions = [
    { icon: <QuestionMarkIcon />, name: "About", onClick: () => navigate("/about") },
  ];

  if (props.actions) {
    BasicActions.push(...props.actions);
  }

  return (
    <SpeedDial
      {...leftOver}
      ariaLabel="SpeedDial basic example"
      direction="up"
      icon={<SpeedDialIcon />}>
      {BasicActions.map((action, i) => (
        <SpeedDialAction
          icon={action.icon}
          tooltipTitle={action.name}
          onClick={action.onClick}
          key={i}
        />
      ))}
    </SpeedDial>
  );
};

export default BasicSpeedDial;
