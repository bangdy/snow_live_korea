import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useSelector } from "react-redux";
import { createDoc, updateDoc } from "help/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { logout, updateProfile, updatePictureUrl } from "store/user";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import AvatarImageCropper from "react-avatar-image-cropper";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";
import ProfileAvatar from "components/ProfileAvatar";
import { uploadImage, removeImage } from "help/util";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";
import SpeedDial from "components/SpeedDial";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import EditOffIcon from "@mui/icons-material/EditOff";
import MyRideButton from "components/MyRideButton";
import date from "date-and-time";

const timeFormat = "YY.MM.DD - HH:mm";

const Profile = (props) => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [alterImgUrl, setAlterImgUrl] = useState(null);
  const [edit, setEdit] = useState(false);
  const [deleteImg, setDeleteImg] = useState(false);
  const dispatch = useDispatch();

  //Logical Indicator
  const fullfilledUser = user.uid && user.profile;
  const editable = !fullfilledUser || edit;
  const isChangigProfile = editable && alterImgUrl;

  const [nickName, setNickName] = useState(fullfilledUser ? user.profile.nickName : "");
  const [myRide, setMyRide] = useState(fullfilledUser ? user.profile.myRide : "board");
  const ariaLabel = { "aria-label": "description" };

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
        dispatch(logout());
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOk = () => {
    setAlterImgUrl(window.URL.createObjectURL(img));
    setOpen(false);
  };

  const handleClose = () => {
    setImg(null);
    setOpen(false);
  };

  const actions = [
    {
      icon: edit ? <EditOffIcon /> : <EditIcon />,
      name: "Edit Profile",
      onClick: () => {
        setEdit(!edit);
        setAlterImgUrl(null);
        setImg(null);
      },
    },
    { icon: <LogoutIcon />, name: "Logout", onClick: logoutRequest },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxWidth: 600,
    width: 500,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Stack
          sx={{
            ...style,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
          }}>
          <Box
            sx={{
              width: "250px",
              height: "250px",
              margin: "auto",
              border: 1,
              backgroundImage: `url(${img && window.URL.createObjectURL(img)})`,
            }}>
            <AvatarImageCropper apply={onImageChange} noWaterMark={Boolean(img)} />
          </Box>
          <Stack direction="row" sx={{ justifyContent: "space-around", width: 350, marginTop: 2 }}>
            <Button variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleClose();
                setAlterImgUrl(" ");
                setDeleteImg(true);
              }}>
              지우기
            </Button>
            <Button variant="contained" onClick={handleOk}>
              확인
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Stack sx={{ alignItems: "center", position: "relative" }}>
        <SpeedDial actions={actions} />
        <ProfileAvatar
          user={user}
          isChangigProfile={isChangigProfile}
          size={200}
          alterImgUrl={alterImgUrl}
        />
        <IconButton
          sx={{ position: "relative", top: -30, left: 0 }}
          disabled={!editable}
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={handleOpen}>
          <PhotoCamera sx={{ width: 40, height: 40 }} />
        </IconButton>
        <Stack direction="row" spacing={2} sx={{ height: 40 }}>
          {editable ? (
            <>
              <Button
                variant="contained"
                onClick={async () => {
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
                }}>
                저장
              </Button>
            </>
          ) : (
            <></>
          )}
        </Stack>
        <Box mt={2} sx={{ display: "block", textAlign: "left", width: "100%", padding: 2 }}>
          <Typography variant="h5" mb={2}>
            닉네임
          </Typography>
          <Input
            inputProps={ariaLabel}
            readOnly={!editable}
            value={nickName}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ display: "block", textAlign: "left", width: "100%", padding: 2, marginTop: 2 }}>
          <Typography variant="h5">내 탈거</Typography>
        </Box>
        <Box sx={{ width: "100%", padding: 2, display: "flex", justifyContent: "space-around" }}>
          <MyRideButton
            myRide={myRide}
            setMyRide={setMyRide}
            editable={editable}
            equipment={"board"}
            size={100}
          />
          <MyRideButton
            myRide={myRide}
            setMyRide={setMyRide}
            editable={editable}
            equipment={"ski"}
            size={100}
          />
        </Box>
        <Box sx={{ display: "block", textAlign: "left", width: "100%", padding: 2, marginTop: 2 }}>
          <Typography variant="h5">가입일</Typography>
          <Typography variant="body2" mt={2}>
            {date.format(new Date(user.profile.createdAt), timeFormat)}
          </Typography>
        </Box>
        {user.profile?.isAdmin && (
          <>
            <Box
              sx={{ display: "block", textAlign: "left", width: "100%", padding: 2, marginTop: 2 }}>
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
