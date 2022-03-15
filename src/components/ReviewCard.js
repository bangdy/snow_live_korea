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
import { getResortDocThunk } from "store/resorts";
import { getDate } from "help/util";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";

const timeFormat = "YY.MM.DD HH:mm, (ddd)";

const ReviewCard = (props) => {
  const { uid, comment, score, createdAt, user, setBeforeObj, reviewPage, resortInfo } = props;

  const [anchorEl, setAnchorEl] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();

  const dateString = getDate(new Date(createdAt));
  const preImgUrl = user?.preImgUrl;

  return (
    <Card sx={{ width: "100%", marginBottom: 1 }}>
      <CardHeader
        avatar={<ProfileAvatar user={user} size={40} uid={uid} preImgUrl={preImgUrl} />}
        title={user ? user.profile.nickName : ""}
        subheader={date.format(new Date(createdAt), timeFormat)}
        action={
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
        }
      />
      <CardContent>
        <Stack direction="row" sx={{ justifyContent: "space-between" }} mb={2}>
          <Rating name="simple-controlled" value={score} size="large" readOnly />
          {!reviewPage && (
            <Chip label={resortInfo.name} size="small" color="primary" variant="outlined" />
          )}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
