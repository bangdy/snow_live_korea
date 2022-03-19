import * as React from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";

const BasicSpeedDial = (props) => {
  return (
    <SpeedDial
      ariaLabel="SpeedDial basic example"
      direction="down"
      sx={{ position: "absolute", top: 0, right: -20 }}
      icon={<SpeedDialIcon />}>
      {props.actions.map((action) => (
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