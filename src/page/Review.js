import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ReviewMaker from "components/ReviewMaker";
import ReviewCard from "components/ReviewCard";
import { getDate } from "help/util";
import Typography from "@mui/material/Typography";

const Review = (props) => {
  const navigate = useNavigate();
  const { reviews } = props;

  const date = getDate(new Date());

  const isExist = reviews && Object.keys(reviews[date]).length > 0;

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
      <ReviewMaker url={props.info.url} />
      {isExist > 0 ? (
        Object.keys(reviews[date]).map((uid, i) => (
          <ReviewCard uid={uid} {...reviews[date][uid]} key={i} />
        ))
      ) : (
        <Typography variant="body2" color="text.secondary">
          오늘의 리뷰가 없습니다
        </Typography>
      )}
      <Button onClick={() => navigate("/resort_editor", { state: props.info })}>수정하기</Button>
    </Box>
  );
};

export default Review;
