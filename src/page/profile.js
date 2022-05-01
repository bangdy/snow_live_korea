import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useState, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import InstagramIcon from "@mui/icons-material/Instagram";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import date from "date-and-time";
import Linkify from "react-linkify";

import ProfileAvatar from "components/ProfileAvatar";
import ProfileEditor from "components/ProfileEditor";
import { NavActionsContext } from "help/customHooks";
import { logout } from "store/user";

const timeFormat = "YY.MM.DD - HH:mm";

const Profile = (props) => {
  const { setActions } = useContext(NavActionsContext);

  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState(null);
  const [alterImgUrl, setAlterImgUrl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  //Logical Indicator
  const fullfilledUser = user.uid && user.profile;

  const onImageChange = (file) => {
    file && setImg(file);
  };

  const logoutRequest = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("logout");
        navigate("/");
        dispatch(logout());
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setAlterImgUrl(window.URL.createObjectURL(img));
  };

  const handleClose = () => {
    setImg(null);
    setOpen(false);
  };

  const currentActions = [
    {
      icon: <EditIcon />,
      name: "Edit Profile",
      onClick: () => {
        setEdit(true);
        setAlterImgUrl(null);
        setImg(null);
        handleOpen();
      },
    },
    { icon: <LogoutIcon />, name: "Logout", onClick: logoutRequest },
  ];

  useEffect(() => {
    setActions(currentActions);
  }, [edit]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ProfileEditor
          onImageChange={onImageChange}
          img={img}
          edit={edit}
          setEdit={setEdit}
          setOpen={setOpen}
          setAlterImgUrl={setAlterImgUrl}
          handleOk={handleOk}
          user={user}
          alterImgUrl={alterImgUrl}
          handleClose={handleClose}
          fullfilledUser={fullfilledUser}
          dispatch={dispatch}
        />
      </Modal>
      <Stack direction="column" sx={{ alignItems: "center", position: "relative" }}>
        <Box
          sx={{
            alignSelf: "stretch",
            height: 120,
            background: `linear-gradient(${theme.palette.primary.light}, #ffffff)`,
            position: "relative",
          }}></Box>
        <ProfileAvatar user={user} size={100} sx={{ marginTop: -10 }} />

        <Typography variant="h5" mb={2}>
          {user.profile.nickName}
        </Typography>
        <InstagramIcon />
        <Stack
          direction="column"
          alignItems="stretch"
          px={4}
          sx={{ textAlign: "left", width: "100%" }}>
          <Typography variant="caption" mb={2}>
            <Linkify
              componentDecorator={(decoratedHref, decoratedText, key) => (
                <a target="blank" href={decoratedHref} key={key}>
                  {decoratedText}
                </a>
              )}>
              {user.profile?.introduce ?? "소개 없음"}
            </Linkify>
          </Typography>
        </Stack>
        <Stack
          direction="row"
          mt={2}
          justifyContent="space-around"
          sx={{ height: 40, width: "80%" }}>
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" fontWeight={800}>
              24
            </Typography>
            <Typography variant="h6">Ridings</Typography>
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ marginX: 0.5, marginY: 0 }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" fontWeight={800}>
              10
            </Typography>
            <Typography variant="h6">Followers</Typography>
          </Box>
          <Divider
            orientation="vertical"
            variant="middle"
            flexItem
            sx={{ marginX: 0.5, marginY: 0 }}
          />
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="caption" fontWeight={800}>
              120
            </Typography>
            <Typography variant="h6">Likes</Typography>
          </Box>
        </Stack>
        <Box sx={{ display: "block", textAlign: "left", width: "100%", padding: 2, marginTop: 2 }}>
          <Typography variant="h5">가입일</Typography>
          <Typography variant="body2" mt={2}>
            {date.format(new Date(user.profile.createdAt), timeFormat)}
          </Typography>
        </Box>
        {user.profile?.isAdmin && (
          <>
            <Box
              sx={{
                display: "block",
                textAlign: "left",
                width: "100%",
                padding: 2,
                marginTop: 2,
              }}>
              <Typography variant="h5">관리자 영역</Typography>
            </Box>
            <Box>
              <Link to="/resort_editor" style={{ textDecoration: "none" }}>
                <Button variant="outlined">Resort 만들기</Button>
              </Link>
            </Box>
          </>
        )}
      </Stack>
    </>
  );
};

export default Profile;
