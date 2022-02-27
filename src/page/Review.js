import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import ReviewMaker from "components/ReviewMaker";
import ReviewCard from "components/ReviewCard";
import { getDate } from "help/util";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SortToggle from "components/SortToggle";
import { getDoc } from "help/firestore";
import { downloadImage } from "help/util";
import DateNavigator from "components/DateNavigator";

const Review = (props) => {
  const navigate = useNavigate();
  const { reviews } = props;
  const [date, setDate] = useState(new Date());
  const dateString = getDate(date);

  const isExist = reviews[dateString] && Object.keys(reviews[dateString]).length > 0;
  console.log(reviews[dateString]);

  const [keys, setKeys] = useState(Object.keys(reviews[dateString] ?? []));
  const [users, setUsers] = useState({});

  useEffect(() => {
    const getUsers = async () => {
      const t = {};
      for (var uid of keys) {
        const response = await getDoc("users", uid);
        let preImgUrl;
        try {
          preImgUrl = await downloadImage("profile", uid);
        } catch (e) {
          preImgUrl = null;
        }
        t[uid] = { ...response, preImgUrl: preImgUrl };
      }
      setUsers(t);
    };
    getUsers();
  }, []);

  useEffect(() => setKeys(Object.keys(reviews[dateString] ?? [])), [date]);

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
      <DateNavigator date={date} setDate={setDate} />
      <Divider sx={{ marginY: 2, width: "100%" }} />
      <SortToggle
        sx={{ alignSelf: "flex-start" }}
        tabs={[
          [
            "최신순",
            () => {
              setKeys(
                [...keys].sort(
                  (a, b) =>
                    reviews[dateString][a]["createdAt"] - reviews[dateString][b]["createdAt"]
                )
              );
            },
          ],
          ["공감순", () => {}],
        ]}
      />

      <Divider sx={{ marginY: 2, width: "100%" }} />

      {isExist > 0 ? (
        <>
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{ alignSelf: "flex-start", marginBottom: 2 }}>
            리뷰
          </Typography>
          {keys.map((uid, i) => (
            <ReviewCard uid={uid} {...reviews[dateString][uid]} user={users?.[uid]} key={i} />
          ))}
        </>
      ) : (
        <Typography sx={{ marginY: 2 }} variant="body2" color="text.secondary">
          오늘의 리뷰가 없습니다
        </Typography>
      )}
      <Button onClick={() => navigate("/resort_editor", { state: props.info })}>수정하기</Button>
    </Box>
  );
};

export default Review;
