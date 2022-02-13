import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ReviewMaker from "components/ReviewMaker";

const Review = (props) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
      }}>
      <span>리뷰 : {props.info.name}</span>
      <ReviewMaker />
      <Button onClick={() => navigate("/resort_editor", { state: props.info })}>수정하기</Button>
    </Box>
  );
};

export default Review;
