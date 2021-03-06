import React, { useState, useEffect, useContext } from "react";
import Box from "@mui/material/Box";
import ReviewMaker from "components/ReviewMaker";
import ReviewCard from "components/ReviewCard";
import { getDate } from "help/util";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import SortToggle from "components/SortToggle";
import { getDoc } from "help/firestore";
import { downloadImage } from "help/util";
import DateNavigator from "components/DateNavigator";
import { useSelector, useDispatch } from "react-redux";
import { getResortDocThunk } from "store/resorts";
import InfoCard from "components/InfoCard";
import Stack from "@mui/material/Stack";
import RefreshIcon from "@mui/icons-material/Refresh";
import IconButton from "@mui/material/IconButton";
import { NavActionsContext } from "help/customHooks";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import BarChart from "components/BarChart";
import { PageChange } from "components/Motions";

const ResortReviews = (props) => {
  const dispatch = useDispatch();
  const { setActions } = useContext(NavActionsContext);
  const resorts = useSelector((state) => state.resorts.collection);
  const currentUserUid = useSelector((state) => state.user.uid);
  const reviews = resorts[props.info.url].reviews;
  const [date, setDate] = useState(new Date());
  const [onReview, setOnReview] = useState(true);
  const dateString = getDate(date);

  const isExist = reviews[dateString] && Object.keys(reviews[dateString]).length > 0;

  const [keys, setKeys] = useState(Object.keys(reviews[dateString] ?? []));
  const [users, setUsers] = useState({});

  const [beforeObj, setBeforeObj] = useState(null);

  const currentActions = [
    {
      icon: onReview ? <EditOffIcon /> : <EditIcon />,
      name: "Review 하기",
      onClick: () => setOnReview(!onReview),
    },
  ];

  useEffect(() => {
    dispatch(getResortDocThunk(props.info.url));
  }, []);

  useEffect(
    () => setKeys(Object.keys(reviews[dateString] ?? [])),
    [date, dateString, reviews[dateString]]
  );

  useEffect(() => {
    const getUsers = async () => {
      const t = { ...users };
      for (var uid of keys) {
        if (!Object.keys(users).includes(uid)) {
          const response = await getDoc("users", uid);
          let preImgUrl;
          try {
            preImgUrl = await downloadImage("profile", uid);
          } catch (e) {
            preImgUrl = null;
          }
          t[uid] = { ...response, preImgUrl: preImgUrl };
        }
      }
      setUsers(t);
    };
    getUsers();
  }, [keys]);

  useEffect(() => {
    setActions(currentActions);
  }, [onReview]);

  //Logical Indicator
  const showReviewMaker =
    currentUserUid &&
    (beforeObj ||
      (!Object.keys(reviews?.[dateString] ?? {}).includes(currentUserUid) &&
        dateString === getDate(new Date())));
  // 1.로그인을 했고 && ( 2.수정 중이 아니고, 3.내 리뷰가 당일에 없고 4.오늘 일때)
  return (
    <PageChange>
      <Box
        sx={{
          marginTop: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: 1,
          paddingX: 2,
        }}>
        <InfoCard {...resorts[props.info.url]} style={{ marginBottom: 3 }} />
        <DateNavigator date={date} setDate={setDate} setBeforeObj={setBeforeObj} />
        <Stack sx={{ height: 300, width: "100%" }}>
          <BarChart />
        </Stack>
        {onReview && showReviewMaker && (
          <ReviewMaker
            url={props.info.url}
            beforeObj={beforeObj}
            setOnReview={setOnReview}
            setBeforeObj={setBeforeObj}
            dateString={dateString}
          />
        )}
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
            <Stack direction="row" justifyContent="space-between" sx={{ width: "100%" }}>
              <Typography
                variant="h6"
                color="text.secondary"
                sx={{ alignSelf: "flex-start", marginBottom: 2 }}>
                리뷰
              </Typography>
              <IconButton
                aria-label="refresh"
                sx={{ alignSelf: "flex-start", padding: 1 }}
                onClick={() => dispatch(getResortDocThunk(props.info.url))}>
                <RefreshIcon fontSize="small" />
              </IconButton>
              <Box></Box>
            </Stack>
            {keys.map((uid, i) => (
              <ReviewCard
                uid={uid}
                {...reviews[dateString][uid]}
                user={users?.[uid]}
                key={i}
                setBeforeObj={setBeforeObj}
                reviewPage
                resortInfo={props.info}
                dateString={dateString}
              />
            ))}
          </>
        ) : (
          <Typography sx={{ marginY: 2 }} variant="body2" color="text.secondary">
            오늘의 리뷰가 없습니다
          </Typography>
        )}
      </Box>
    </PageChange>
  );
};

export default ResortReviews;
