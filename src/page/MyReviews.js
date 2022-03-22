import React from "react";
import { useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ReviewCard from "components/ReviewCard";

const MyReviews = (props) => {
  const resorts = useSelector((state) => state.resorts.collection);
  const user = useSelector((state) => state.user);

  const reviews = [];
  Object.keys(resorts).forEach((rst) =>
    Object.keys(resorts[rst]["reviews"]).forEach((d) => {
      if (resorts[rst]["reviews"][d]?.[user.uid])
        reviews.push({ ...resorts[rst]["reviews"][d][user.uid], resortInfo: resorts[rst].info });
    })
  );

  const isExist = reviews.length > 0;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flex: 1,
      }}>
      {isExist > 0 ? (
        <>
          <Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ alignSelf: "flex-start", marginBottom: 2 }}>
              나의 리뷰
            </Typography>
          </Box>
          {reviews.map((rev, i) => (
            <ReviewCard {...rev} key={i} user={user} uid={user.uid} resortInfo={rev.resortInfo} />
          ))}
        </>
      ) : (
        <Typography sx={{ marginY: 2 }} variant="body2" color="text.secondary">
          오늘의 리뷰가 없습니다
        </Typography>
      )}
    </Box>
  );
};
export default MyReviews;
