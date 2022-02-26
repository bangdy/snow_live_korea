import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Chip from "@mui/material/Chip";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function moveDate(date, num) {
  return new Date().setDate(date.getDate() + num);
}

const DateNavigator = (props) => {
  const { date, setDate } = props;

  return (
    <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
      <Chip icon={<ArrowBackIosNewIcon />} />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Basic example"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Chip icon={<ArrowForwardIosIcon />} />
    </Stack>
  );
};

export default DateNavigator;
