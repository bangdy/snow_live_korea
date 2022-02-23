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
      {props.tabs.map((i) => (
        <ToggleButton value={i[0]} onClick={() => i[1]()}>
          {i[0]}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
