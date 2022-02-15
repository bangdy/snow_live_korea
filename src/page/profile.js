import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DownhillSkiingRounded, SnowboardingRounded } from "@mui/icons-material";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useSelector } from "react-redux";
import { createDoc, updateDoc } from "help/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { logout, updateProfile } from "store/user";
import { useDispatch } from "react-redux";
import Modal from "@mui/material/Modal";
import AvatarImageCropper from "react-avatar-image-cropper";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const Profile = (props) => {
  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [img, setImg] = useState(null);
  const [imgurl, setImgurl] = useState(null);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  const storage = getStorage();
  const storageRef = ref(storage, `profile/${user.profile.uid}`);

  //Logical Indicator
  const fullfilledUser = user.uid && user.profile;
  const editable = !fullfilledUser || edit;

  const [nickName, setNickName] = useState(fullfilledUser ? user.profile.nickName : "");
  const [ski, setSki] = useState(fullfilledUser ? user.profile.ski : false);
  const [board, setBoard] = useState(fullfilledUser ? user.profile.board : false);
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

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    getDownloadURL(storageRef)
      .then((url) => {
        setImgurl(url);
      })
      .catch((error) => {
        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
          case "storage/object-not-found":
            // File doesn't exist
            break;
          case "storage/unauthorized":
            // User doesn't have permission to access the object
            break;
          case "storage/canceled":
            // User canceled the upload
            break;

          case "storage/unknown":
            // Unknown error occurred, inspect the server response
            break;
        }
      });
  }, []);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Stack sx={{ alignItems: "center", justifyContent: "center", backgroundColor: "white" }}>
          <h3>닉네임2</h3>
          <Box sx={{ width: "250px", height: "250px", margin: "auto", border: 1 }}>
            <AvatarImageCropper apply={onImageChange} />
          </Box>
        </Stack>
      </Modal>
      <Stack sx={{ alignItems: "center" }}>
        <Avatar sx={{ bgcolor: deepOrange[100], width: 200, height: 200, fontSize: 150 }}>
          {imgurl ? <img src={imgurl} /> : "🐻"}
        </Avatar>

        <Button variant="contained" onClick={handleOpen}>
          모달 열기
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            uploadBytes(storageRef, img).then((snapshot) => {
              console.log("Uploaded a blob or file!");
            })
          }>
          이미지 저장
        </Button>
        <Box sx={{ display: "block", textAlign: "left", width: "100%", padding: 2 }}>
          <h3>닉네임</h3>
          <Input
            defaultValue="Hello world"
            inputProps={ariaLabel}
            readOnly={!editable}
            value={nickName}
            onChange={handleChange}
            sx={{ width: "100%" }}
          />
        </Box>
        <Box sx={{ display: "block", textAlign: "left", width: "100%", padding: 2, marginTop: 2 }}>
          <h3>내 탈거</h3>
        </Box>
        <Box sx={{ width: "100%", padding: 2, display: "flex", justifyContent: "space-around" }}>
          <ToggleButton
            value="check"
            selected={board}
            onChange={() => editable && setBoard(!board)}>
            <SnowboardingRounded sx={{ fontSize: 80 }} />
          </ToggleButton>
          <ToggleButton value="check" selected={ski} onChange={() => editable && setSki(!ski)}>
            <DownhillSkiingRounded sx={{ fontSize: 80 }} />
          </ToggleButton>
        </Box>
        <Stack direction="row" spacing={2} mt={10}>
          {editable ? (
            <>
              {fullfilledUser && (
                <Button
                  variant="contained"
                  onClick={() => {
                    setEdit(!edit);
                    setNickName(user.profile.nickName);
                    setSki(user.profile.ski);
                    setBoard(user.profile.board);
                  }}>
                  취소
                </Button>
              )}
              <Button
                variant="contained"
                onClick={() => {
                  const func = fullfilledUser ? updateDoc : createDoc;
                  func("users", user.uid, {
                    profile: { nickName: nickName, ski: ski, board: board },
                  }).then(() => {
                    alert("수정이 완료되었습니다.");
                    setEdit(!edit);
                    if (!fullfilledUser) {
                      window.location.href = "/";
                    } else {
                      dispatch(updateProfile({ nickName: nickName, ski: ski, board: board }));
                    }
                  });
                }}>
                저장
              </Button>
            </>
          ) : (
            <>
              <Button variant="contained" onClick={() => setEdit(!edit)}>
                수정하기
              </Button>
              <Button onClick={logoutRequest}>로그아웃!</Button>
            </>
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default Profile;
