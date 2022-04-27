import React, { useState, useContext, useEffect } from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import { useTheme } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import date from "date-and-time";

import ProfileAvatar from "components/ProfileAvatar";
import ProfileEditor from "components/ProfileEditor";
import { createDoc, updateDoc } from "help/firestore";
import { uploadImage, removeImage } from "help/util";
import { NavActionsContext } from "help/customHooks";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { logout, updateProfile, updatePictureUrl } from "store/user";

const timeFormat = "YY.MM.DD - HH:mm";

const Profile = (props) => {
  const { setActions } = useContext(NavActionsContext);

  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [alterImgUrl, setAlterImgUrl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleteImg, setDeleteImg] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  //Logical Indicator
  const fullfilledUser = user.uid && user.profile;
  const editable = !fullfilledUser || edit;
  const isChangigProfile = editable && alterImgUrl;

  const [nickName, setNickName] = useState(fullfilledUser ? user.profile.nickName : "");
  const [myRide, setMyRide] = useState(fullfilledUser ? user.profile.myRide : "board");

  const handleChange = (event) => editable && setNickName(event.target.value);

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
      icon: edit ? <EditOffIcon /> : <EditIcon />,
      name: "Edit Profile",
      onClick: () => {
        setEdit(!edit);
        setAlterImgUrl(null);
        setImg(null);
        if (!open) handleOpen();
      },
    },
    { icon: <LogoutIcon />, name: "Logout", onClick: logoutRequest },
  ];

  useEffect(() => {
    setActions(currentActions);
  }, [edit]);

  const updateProfileFunc = async () => {
    const func = fullfilledUser ? updateDoc : createDoc;
    const updatedProfile = {
      nickName: nickName,
      myRide: myRide,
      isAdmin: user.profile?.isAdmin ?? false,
      createdAt: user.profile?.createdAt ?? new Date().getTime(),
    };

    try {
      await func("users", user.uid, {
        profile: updatedProfile,
      });
      if (img) {
        uploadImage("profile", user.uid, img);
        dispatch(updatePictureUrl(alterImgUrl));
      } else if (deleteImg) {
        if (window.confirm("정말 프로필 사진을 지우시겠습니까?")) {
          removeImage("profile", user.uid);
          dispatch(updatePictureUrl(null));
        } else {
          throw "취소 되었습니다.";
        }
      }
      alert(`${fullfilledUser ? "수정" : "등록"}이 완료되었습니다.`);
      setEdit(!edit);
      if (!fullfilledUser) {
        window.location.href = "/";
      } else {
        dispatch(updateProfile(updatedProfile));
      }
    } catch (err) {
      alert(err);
    }
  };

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
          handleClose={handleClose}
          setAlterImgUrl={setAlterImgUrl}
          setDeleteImg={setDeleteImg}
          handleOk={handleOk}
          editable={editable}
          updateProfileFunc={updateProfileFunc}
          user={user}
          nickName={nickName}
          myRide={myRide}
          setMyRide={setMyRide}
          handleChange={handleChange}
          isChangigProfile={isChangigProfile}
          alterImgUrl={alterImgUrl}
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
          {nickName}
        </Typography>
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
