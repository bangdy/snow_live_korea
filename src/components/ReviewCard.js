import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Rating from "@mui/material/Rating";
import ProfileAvatar from "./ProfileAvatar";
import Typography from "@mui/material/Typography";
import { getDoc } from "help/firestore";
import date from "date-and-time";

const timeFormat = "YY.MM.DD HH:mm, (ddd)";

const ReviewCard = (props) => {
  const { uid, comment, score, createdAt } = props;

  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await getDoc("users", uid);
      setUser(response);
    };
    getUser();
  }, []);

  return (
    <Card sx={{ width: "100%", border: 1 }}>
      <CardHeader
        avatar={<ProfileAvatar user={user} size={40} uid={uid} />}
        title={user ? user.profile.nickName : ""}
        subheader={date.format(new Date(createdAt), timeFormat)}
      />
      <CardContent>
        <Rating name="simple-controlled" value={score} size="large" readOnly />
        <Typography variant="body2" color="text.secondary">
          {comment}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ReviewCard;
