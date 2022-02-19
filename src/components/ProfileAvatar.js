import React from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";

import styled from "styled-components";

const FitImg = styled.img`
  height: 100%;
  width: auto;
  object-fit: contain;
`;

const ProfileAvatar = (props) => {
  const { user, isChangigProfile, alterImgUrl, size } = props;

  let profile;

  if (isChangigProfile) {
    profile = <FitImg src={alterImgUrl} />;
  } else if (user.pictureUrl) {
    profile = <FitImg src={user.pictureUrl} />;
  } else {
    profile = user.profile.nickName[0];
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
