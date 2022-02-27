import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function SortToggle(props) {
  const [alignment, setAlignment] = React.useState(props.tabs[0][0]);

  const handleChange = (event, newAlignment) => {
    setAlignment(event.target.value);
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      sx={props.sx}>
      {props.tabs.map((tab, j) => (
        <ToggleButton value={tab[0]} onClick={() => tab[1]()} key={j}>
          {tab[0]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
