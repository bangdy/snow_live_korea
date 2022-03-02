import React, { useState } from "react";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import TimePicker from "@mui/lab/TimePicker";
import Chip from "@mui/material/Chip";
import RemoveIcon from "@mui/icons-material/Remove";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { defaultTime } from "assets/ResortFactory";

const TimePickerPack = (props) => {
  const { resortFactory, id } = props;

  const [time, setTime] = useState(resortFactory[id] || null);

  const handleChange = (newValue) => {
    let t;
    if (newValue.toDateString() === new Date().toDateString()) {
      t = defaultTime;
      t.setHours(newValue.getHours());
      t.setMinutes(newValue.getMinutes());
    } else {
      t = newValue;
    }
    resortFactory.update(id, t.getTime());
    setTime(t);
  };

  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-around", alignItems: "center", width: "100%" }}>
      <Typography variant="paragraph">{id}</Typography>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <TimePicker
          label="Time"
          value={time}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Chip
        label={<RemoveIcon sx={{ marginTop: 0.8 }} />}
        onClick={() => {
          resortFactory.update(id, false);
          setTime(null);
        }}
      />
    </Stack>
  );
};

export default TimePickerPack;
