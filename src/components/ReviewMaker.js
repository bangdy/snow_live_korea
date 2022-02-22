import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { updateDocL3 } from "help/firestore";
import { getDate } from "help/util";
import ProfileAvatar from "components/ProfileAvatar";
import { getResortDocThunk } from "store/resorts";

const ReviewMaker = (props) => {
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(3);

  const dispatch = useDispatch();

  const date = getDate(new Date());
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
          <ProfileAvatar user={user} size={40} />
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
          helperText="이 곳에 다녀온 경험을 공유해주세요."
          sx={{ width: "100%" }}
        />
        <Button
          variant="outlined"
          size="small"
          sx={{ alignSelf: "center" }}
          onClick={async () => {
            let message;
            message = await updateDocL3("resorts", props.url, "reviews", date, user.uid, {
              score: score,
              createdAt: new Date().getTime(),
              comment: comment,
            })
              .then((msg) => {
                message = msg;
                dispatch(getResortDocThunk(props.url));
              })
              .catch((msg) => {
                message = msg;
              })
              .finally(() => {
                alert(message);
              });
          }}>
          리뷰하기
        </Button>
      </Stack>
    </Box>
  );
};

export default ReviewMaker;
