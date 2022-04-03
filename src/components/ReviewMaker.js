import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Rating from "@mui/material/Rating";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { updateDocL3 } from "help/firestore";
import ProfileAvatar from "components/ProfileAvatar";
import { getResortDocThunk } from "store/resorts";
import { useFocus } from "help/customHooks";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";

const ReviewMaker = (props) => {
  const { beforeObj, dateString, setBeforeObj } = props;
  const [inputRef, setInputFocus] = useFocus();

  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [score, setScore] = useState(null);
  const [focused, setFocused] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setComment("");
    setScore(null);
    setFocused(false);
  }, [dateString]);

  useEffect(() => {
    setScore(beforeObj?.score ?? null);
    setComment(beforeObj?.comment ?? "");
  }, [beforeObj]);

  //Logical Indicator
  const noShowForReview = comment.length === 0 && !score;

  return (
    <Paper
      elevation={2}
      sx={{
        display: "flex",
        flex: 1,
        width: "100%",
        marginY: 3,
        marginLeft: 0,
        borderColor: "gray",
      }}>
      <Stack
        direction="column"
        spacing={2}
        sx={{ alignItems: "flex-start", justifyContent: "center", padding: 2, flexGrow: 1 }}>
        <>
          <Stack direction="row" sx={{ width: "100%" }} justifyContent="space-between">
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
            {beforeObj?.score && (
              <IconButton onClick={() => setBeforeObj(null)}>
                <HighlightOffOutlinedIcon size="small" color="secondary" />
              </IconButton>
            )}
          </Stack>

          <Rating
            name="simple-controlled"
            value={score}
            onChange={(event, newValue) => {
              setScore(newValue);
              setInputFocus();
            }}
            size="large"
          />
        </>

        <TextField
          id="outlined-multiline-static"
          label="내용"
          multiline
          rows={focused ? 5 : 2}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          helperText="이 곳에 다녀온 경험을 공유해주세요."
          sx={{ width: "100%" }}
          onFocus={() => setFocused(true)}
          onBlur={() => noShowForReview && setFocused(false)}
          inputRef={inputRef}
        />
        {focused && (
          <Button
            variant="outlined"
            size="small"
            sx={{ alignSelf: "center" }}
            onClick={async () => {
              let message;
              if (score && comment) {
                try {
                  message = await updateDocL3(
                    "resorts",
                    props.url,
                    "reviews",
                    dateString,
                    user.uid,
                    {
                      score: score,
                      createdAt: new Date().getTime(),
                      comment: comment,
                      resort: props.url,
                      equipment: user.profile.myRide,
                      likes: [],
                    }
                  );
                  dispatch(getResortDocThunk(props.url));
                } catch (e) {
                  message = e;
                }
              } else {
                const notInput = score ? "리뷰" : "점수";
                message = notInput + "가 입력되지 않았습니다.";
              }
              alert(message);
              setBeforeObj(null);
            }}>
            {beforeObj?.score ? "수정하기" : "리뷰하기"}
          </Button>
        )}
      </Stack>
    </Paper>
  );
};

export default ReviewMaker;
