import { useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import AvatarImageCropper from "react-avatar-image-cropper";
import InstagramIcon from "@mui/icons-material/Instagram";

import { createDoc, updateDoc } from "help/firestore";
import { uploadImage, removeImage } from "help/util";
import { updateProfile, updatePictureUrl } from "store/user";
import MyRideButton from "components/MyRideButton";
import ProfileAvatar from "components/ProfileAvatar";
import { ModalWrapper } from "help/util";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: 480,
  width: "90%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 1,
};

const ProfileEditor = (props) => {
  const {
    onImageChange,
    img,
    edit,
    setEdit,
    setOpen,
    setAlterImgUrl,
    handleOk,
    user,
    alterImgUrl,
    handleClose,
    fullfilledUser,
    dispatch,
  } = props;

  const [nickName, setNickName] = useState(fullfilledUser ? user.profile.nickName : "");
  const [myRide, setMyRide] = useState(fullfilledUser ? user.profile.myRide : "board");
  const [introduce, setIntroduce] = useState(fullfilledUser ? user.profile?.introduce : "");
  const [instagram, setInstagram] = useState(fullfilledUser ? user.profile?.instagram : "");

  const [deleteImg, setDeleteImg] = useState(false);

  //Logical Indicator
  const editable = !fullfilledUser || edit;
  const isChangigProfile = editable && alterImgUrl;

  const handleChange = (event, setFunc) => editable && setFunc(event.target.value);

  const [innerOpen, setInnerOpen] = useState(false);

  const handleInnerClose = () => setInnerOpen(false);
  const handleInnerOk = () => {
    handleOk();
    setInnerOpen(false);
  };

  const updateProfileFunc = async () => {
    const func = fullfilledUser ? updateDoc : createDoc;
    const updatedProfile = {
      nickName: nickName,
      myRide: myRide,
      introduce: introduce,
      instagram: instagram,
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
        setOpen(false);
      }
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Box>
      <Modal
        open={innerOpen}
        onClose={handleInnerClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <ModalWrapper>
          <Stack
            sx={{
              ...style,
              width: user.isMobile ? "70%" : 500,
              position: "relative",
              top: "40%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "white",
            }}>
            <Box
              sx={{
                width: 250,
                height: 250,
                margin: "auto",
                border: 1,
                backgroundImage: `url(${img && window.URL.createObjectURL(img)})`,
              }}>
              <AvatarImageCropper apply={onImageChange} noWaterMark={Boolean(img)} />
            </Box>
            <Stack
              direction="row"
              sx={{ justifyContent: "space-around", width: "100%", marginTop: 2 }}>
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
        </ModalWrapper>
      </Modal>
      <Box
        sx={{
          ...style,
          backgroundColor: "white",
          overflow: user.isMobile ? "scroll" : "auto",
          height: user.isMobile ? "100%" : "auto",
        }}>
        <Stack direction="column" justifyContent="center" alignItems="center" p={1}>
          <ProfileAvatar
            sx={{ marginTop: 2 }}
            user={user}
            isChangigProfile={isChangigProfile}
            size={100}
            alterImgUrl={alterImgUrl}
          />
          <IconButton
            sx={{ position: "relative", top: -10, left: 0, height: 10 }}
            disabled={!editable}
            color="primary"
            aria-label="upload picture"
            component="span"
            onClick={() => setInnerOpen(true)}>
            <PhotoCamera sx={{ width: 40, height: 40 }} />
          </IconButton>
          <Box mt={2} sx={{ display: "block", textAlign: "left", width: "100%", paddingX: 2 }}>
            <Typography variant="caption" sx={{ marginLeft: 1 }}>
              닉네임
            </Typography>
            <TextField
              size="medium"
              readOnly={!editable}
              value={nickName}
              variant="outlined"
              onChange={(event) => handleChange(event, setNickName)}
              sx={{ width: "100%", marginY: 1 }}
            />
          </Box>
          <Box
            sx={{ display: "block", textAlign: "left", width: "100%", paddingX: 2, marginTop: 2 }}>
            <Typography variant="caption" sx={{ marginLeft: 1 }}>
              소개
            </Typography>
            <TextField
              sx={{ width: "100%", marginY: 1 }}
              id="outlined-multiline-static"
              multiline
              value={introduce}
              onChange={(event) => handleChange(event, setIntroduce)}
              rows={4}
            />
          </Box>
          <Stack
            alignItems="center"
            direction="row"
            sx={{ width: "100%", paddingX: 2, marginTop: 2 }}>
            <InstagramIcon size="small" />
            <TextField
              size="small"
              readOnly={!editable}
              value={instagram}
              variant="outlined"
              onChange={(event) => handleChange(event, setInstagram)}
              sx={{ width: "100%", marginY: 1, marginLeft: 1 }}
            />
          </Stack>
          <Box sx={{ display: "block", textAlign: "left", width: "100%", paddingX: 2, marginY: 2 }}>
            <Typography variant="caption" sx={{ marginLeft: 1 }}>
              내 탈거
            </Typography>
          </Box>
          <Box
            sx={{
              maxWidth: 320,
              width: "100%",
              display: "flex",
              justifyContent: "space-around",
            }}>
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
          <Stack direction="row" spacing={2} mt={4} sx={{ height: 40 }}>
            <Button variant="outlined" onClick={handleClose}>
              취소
            </Button>
            <Button variant="contained" onClick={updateProfileFunc}>
              저장
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default ProfileEditor;
