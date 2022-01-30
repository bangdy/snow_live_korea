import React from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";

import { ResortFactory } from "assets/ResortFactory";
import Button from "@mui/material/Button";
import { updateDoc, createDoc } from "help/firestore";

const ResortEditor = (props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const resortObj = location.state;
  const resort = new ResortFactory(resortObj);

  //Logical Indicator
  const forEdit = resort.getObject.url !== undefined;

  const onTextChangeHandler = (e) => {
    resort.update(e.target.id, e.target.value);
    e.target.value = resort[e.target.id];
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <TextField
            name="name"
            required
            fullWidth
            id="name"
            label="리조트 이름"
            autoFocus
            onChange={onTextChangeHandler}
            defaultValue={resort.name}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="name"
            required
            fullWidth
            id="address"
            label="주소"
            onChange={onTextChangeHandler}
            defaultValue={resort.address}
          />
        </Grid>
        <Grid item xs={12} sm={12}>
          <TextField
            name="name"
            required
            fullWidth
            id="url"
            label="url"
            onChange={onTextChangeHandler}
            value={resort.url}
            disabled={forEdit}
          />
        </Grid>
      </Grid>
      <Button
        onClick={() => {
          const dbFunction = forEdit ? updateDoc : createDoc;
          let message;
          dbFunction("resorts", resort.url, resort.getObject)
            .then((msg) => {
              navigate("/");
              message = msg;
            })
            .catch((msg) => {
              message = msg;
            })
            .finally(() => alert(message));
        }}>
        {forEdit ? "수정하기" : "만들기"}
      </Button>
    </Box>
  );
};

export default ResortEditor;
