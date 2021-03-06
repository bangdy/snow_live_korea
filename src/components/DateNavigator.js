import React, { useState, useEffect } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Chip from "@mui/material/Chip";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import koLocale from "date-fns/locale/ko";

function moveDate(date, num) {
  return new Date(new Date().setTime(date.getTime() + num * 24 * 60 * 60 * 1000));
}

const DateNavigator = (props) => {
  const { date, setDate, setBeforeObj } = props;

  return (
    <Stack direction="row" spacing={3} sx={{ alignItems: "center" }} mt={2}>
      <Chip
        label={<ArrowBackIosNewIcon sx={{ marginTop: 0.8 }} />}
        onClick={() => {
          setDate(moveDate(date, -1));
          setBeforeObj(null);
        }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={koLocale}>
        <DatePicker
          disableMaskedInput={true}
          label="Date"
          value={date}
          onChange={(newValue) => {
            setDate(newValue);
            setBeforeObj(null);
          }}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Chip
        label={<ArrowForwardIosIcon sx={{ marginTop: 0.8 }} />}
        onClick={() => {
          setDate(moveDate(date, 1));
          setBeforeObj(null);
        }}
      />
    </Stack>
  );
};

export default DateNavigator;
