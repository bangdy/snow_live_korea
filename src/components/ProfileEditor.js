import { useState } from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Input from "@mui/material/Input";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

import MyRideButton from "components/MyRideButton";
import ProfileAvatar from "components/ProfileAvatar";

import AvatarImageCropper from "react-avatar-image-cropper";

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

const ProfileEditor = (props) => {
  const {
    onImageChange,
    img,
    handleClose,
    setAlterImgUrl,
    setDeleteImg,
    handleOk,
    editable,
    updateProfileFunc,
    user,
    nickName,
    myRide,
    setMyRide,
    handleChange,
    isChangigProfile,
    alterImgUrl,
  } = props;

  const [innerOpen, setInnerOpen] = useState(false);

  const handleInnerClose = () => setInnerOpen(false);
  const handleInnerOk = () => {
    handleOk();
    setInnerOpen(false);
  };

  return (
    <>
      <Modal
        open={innerOpen}
        onClose={handleClose}
        hideBackdrop
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
            <Button variant="outlined" onClick={handleInnerClose}>
              취소
            </Button>
            <Button
              variant="outlined"
              onClick={() => {
                handleInnerClose();
                setAlterImgUrl(" ");
                setDeleteImg(true);
              }}>
              지우기
            </Button>
            <Button variant="contained" onClick={handleInnerOk}>
              확인
            </Button>
          </Stack>
        </Stack>
      </Modal>
      <Stack
        sx={{
          ...style,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
        }}>
        <ProfileAvatar
          sx={{ marginTop: 4 }}
          user={user}
          isChangigProfile={isChangigProfile}
          size={100}
          alterImgUrl={alterImgUrl}
        />
        <IconButton
          sx={{ position: "relative", top: -30, left: 0 }}
          disabled={!editable}
          color="primary"
          aria-label="upload picture"
          component="span"
          onClick={() => setInnerOpen(true)}>
          <PhotoCamera sx={{ width: 40, height: 40 }} />
        </IconButton>

        <Box mt={2} sx={{ display: "block", textAlign: "left", width: "100%", padding: 2 }}>
          <Typography variant="h5" mb={2}>
            닉네임
          </Typography>
          <Input
            inputProps="description"
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
        <Stack direction="row" spacing={2} sx={{ height: 40 }}>
          {editable ? (
            <>
              <Button variant="contained" onClick={updateProfileFunc}>
                저장
              </Button>
            </>
          ) : (
            <></>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ProfileEditor;
