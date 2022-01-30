import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";

const Review = (props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <span>리뷰 : {props.name}</span>
      <Button onClick={() => navigate("/resort_editor", { state: props })}>수정하기</Button>
    </Box>
  );
};

export default Review;
