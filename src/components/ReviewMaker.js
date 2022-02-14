import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
import { updateDocL2 } from "help/firestore";
import { getDate } from "help/util";

const ReviewMaker = (props) => {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(3);

  const date = getDate(new Date());

  console.log(date);

  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        border: 1,
        borderRadius: 1,
        marginY: 3,
        marginLeft: 0,
        borderColor: "gray",
      }}>
      <Stack
        direction="column"
        mt={2}
        spacing={2}
        sx={{ alignItems: "flex-start", justifyContent: "center", padding: 2, flexGrow: 1 }}>
        <Stack direction="row">
          <Avatar sx={{ bgcolor: deepOrange[100] }}>🐻</Avatar>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{
              backgroundColor: "white",
              padding: 0.5,
            }}>
            {user.profile.nickName}
          </Typography>
        </Stack>
        <Rating
          name="simple-controlled"
          value={score}
          onChange={(event, newValue) => setScore(newValue)}
          size="large"
        />
        <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          defaultValue="이 곳에 다녀온 경험을 공유해주세요."
          sx={{ width: "100%" }}
        />
        <Button
          variant="outlined"
          size="small"
          sx={{ alignSelf: "center" }}
          onClick={() => {
            let message;
            updateDocL2("resorts", props.url, "review", date, {
              [user.uid]: { score: score, createdAt: new Date(), comment: comment },
            })
              .then((msg) => {
                message = msg;
              })
              .catch((msg) => {
                message = msg;
              })
              .finally(() => alert(message));
          }}>
          리뷰하기
        </Button>
      </Stack>
    </Box>
  );
};

export default ReviewMaker;
