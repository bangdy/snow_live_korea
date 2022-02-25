import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import { downloadImage } from "help/util";

import styled from "styled-components";

const FitImg = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
`;

const ProfileAvatar = (props) => {
  const { user, isChangigProfile, alterImgUrl, size, uid, preImgUrl } = props;
  const [imageUrl, setImageUrl] = useState(null);

  let profile;

  useEffect(() => {
    const fetch = async () => {
      const imgUrl = await downloadImage("profile", uid);
      setImageUrl(imgUrl);
    };
    if (uid && !preImgUrl) {
      fetch();
    }
  }, []);

  if (preImgUrl) {
    profile = <FitImg src={preImgUrl} />;
  } else if (isChangigProfile) {
    profile = <FitImg src={alterImgUrl} />;
  } else if (user?.pictureUrl) {
    profile = <FitImg src={user.pictureUrl} />;
  } else if (imageUrl) {
    profile = <FitImg src={imageUrl} />;
  } else if (user?.profile) {
    profile = user.profile.nickName[0];
  } else {
    profile = null;
  }

  return (
    <Avatar
      sx={{
        bgcolor: deepOrange[100],
        width: size,
        height: size,
        fontSize: size * 0.75,
        border: 1,
      }}>
      {profile}
    </Avatar>
  );
};

export default ProfileAvatar;
