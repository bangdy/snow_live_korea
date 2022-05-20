import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import ProfileAvatar from "./ProfileAvatar";
import Typography from "@mui/material/Typography";
import { deleteDocL3 } from "help/firestore";
import date from "date-and-time";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDispatch } from "react-redux";
import { getResortDocThunk, updateLikes } from "store/resorts";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import MyRideButton from "components/MyRideButton";
import Divider from "@mui/material/Divider";
import ThumbUpAltOutlinedIcon from "@mui/icons-material/ThumbUpAltOutlined";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Box from "@mui/material/Box";
import { updateDocL4 } from "help/firestore";

const timeFormat = "YY.MM.DD HH:mm, (ddd)";

const ReviewCard = (props) => {
  const {
    uid,
    comment,
    score,
    createdAt,
    user,
    setBeforeObj,
    reviewPage,
    resortInfo,
    equipment,
    likes,
    dateString,
  } = props;

  const dispatch = useDispatch();
  const curUser = useSelector((state) => state.user);
  const [anchorEl, setAnchorEl] = React.useState(false);
  const open = Boolean(anchorEl);
  const preImgUrl = user?.preImgUrl;

  //Logical Indicator
  const iLikeIt = likes?.includes(curUser.uid);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card sx={{ width: "100%", marginBottom: 1 }}>
      <CardHeader
        avatar={<ProfileAvatar user={user} size={40} uid={uid} preImgUrl={preImgUrl} />}
        title={
          user ? (
            <Stack
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{ width: "100%" }}>
              <Typography variant="subtitle2" zIndex={100}>
                {user.profile.nickName}
              </Typography>
              <MyRideButton
                myRide={user.profile.myRide}
                equipment={user.profile.myRide}
                size={20}
                sx={{ marginLeft: 4 }}
              />
            </Stack>
          ) : (
            ""
          )
        }
        subheader={date.format(new Date(createdAt), timeFormat)}
        action={
          curUser.uid === uid && (
            <div>
              <IconButton
                aria-label="settings"
                onClick={handleClick}
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}>
                {reviewPage && (
                  <MenuItem
                    onClick={() => {
                      handleClose();
                      setBeforeObj({ comment, score });
                    }}>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText>수정하기</ListItemText>
                  </MenuItem>
                )}
                <MenuItem
                  onClick={async () => {
                    handleClose();
                    let message;
                    if (window.confirm("정말 리뷰를 지우시겠습니까?")) {
                      try {
                        message = await deleteDocL3(
                          "resorts",
                          resortInfo.url,
                          "reviews",
                          dateString,
                          uid
                        );
                        dispatch(getResortDocThunk(resortInfo.url));
                      } catch (e) {
                        message = e;
                      }
                      alert(message);
                    }
                  }}>
                  <ListItemIcon>
                    <DeleteForeverIcon />
                  </ListItemIcon>
                  <ListItemText>지우기</ListItemText>
                </MenuItem>
              </Menu>
            </div>
          )
        }
      />
      <CardContent
        sx={{
          ":last-child": {
            padding: 2,
            paddingBottom: 1,
          },
        }}>
        <Stack direction="row" sx={{ justifyContent: "space-between" }} mb={2}>
          <Rating name="simple-controlled" value={score} size="large" readOnly />
          <Stack direction="row">
            {!reviewPage && (
              <Chip label={resortInfo.name} size="small" color="primary" variant="outlined" />
            )}
          </Stack>
        </Stack>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ wordWrap: "break-word", whiteSpace: "pre-line" }}>
          {comment}
        </Typography>
        <Divider
          orientation="horizontal"
          variant="middle"
          flexItem
          sx={{ marginTop: 2, marginX: 0 }}
        />
        <Box sx={{ marginX: "auto", width: "100%", textAlign: "center" }}>
          <IconButton
            aria-label="like"
            disabled={!reviewPage}
            onClick={async () => {
              let message;
              let newArr;
              if (likes.includes(curUser.uid)) {
                newArr = likes.filter((i) => i !== curUser.uid);
              } else {
                newArr = [...likes];
                newArr.push(curUser.uid);
              }
              try {
                message = await updateDocL4(
                  "resorts",
                  resortInfo.url,
                  "reviews",
                  dateString,
                  uid,
                  "likes",
                  newArr
                );
                dispatch(
                  updateLikes({
                    url: resortInfo.url,
                    dateString: dateString,
                    uid: uid,
                    newArr: newArr,
                  })
                );
              } catch (e) {
                message = e;
                alert(message);
              }
            }}>
            {iLikeIt ? (
              <ThumbUpIcon color="primary" fontSize="small" />
            ) : (
              <ThumbUpAltOutlinedIcon fontSize="small" />
            )}
          </IconButton>
          <Typography variant="caption" color="text.secondary">
            {likes?.length}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
