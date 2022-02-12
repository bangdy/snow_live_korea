import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import { DownhillSkiingRounded, SnowboardingRounded } from "@mui/icons-material";
import ToggleButton from "@mui/material/ToggleButton";
import Button from "@mui/material/Button";
import Input from "@mui/material/Input";
import { useSelector } from "react-redux";
import { createDoc } from "help/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { logout } from "store/user";
import { useDispatch } from "react-redux";

const Profile = (props) => {
  const user = useSelector((state) => state.user);
  const [edit, setEdit] = useState(false);
  const dispatch = useDispatch();

  //Logical Indicator
  const fullfilledUser = user.uid && user.profile;
  const editable = fullfilledUser && edit;

  const [nickName, setNickName] = useState(fullfilledUser ? user.profile.nickName : "");
  const [ski, setSki] = useState(fullfilledUser ? user.profile.ski : false);
  const [board, setBoard] = useState(fullfilledUser ? user.profile.board : false);
  const ariaLabel = { "aria-label": "description" };

  const handleChange = (event) => editable && setNickName(event.target.value);

  const logoutRequest = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        alert("logout");
        dispatch(logout());
      });
  };

  return (
    <Stack sx={{ alignItems: "center" }}>
      <Avatar sx={{ bgcolor: deepOrange[100], width: 200, height: 200, fontSize: 150 }}>🐻</Avatar>
      <Box sx={{ display: "block", textAlign: "left", width: "100%", padding: 2 }}>
        <h3>닉네임</h3>
        <Input
          defaultValue="Hello world"
          inputProps={ariaLabel}
          readOnly={!editable && fullfilledUser}
          value={nickName}
          onChange={handleChange}
          sx={{ width: "100%" }}
        />
      </Box>

      <Box sx={{ display: "block", textAlign: "left", width: "100%", padding: 2, marginTop: 2 }}>
        <h3>내 탈거</h3>
      </Box>
      <Box sx={{ width: "100%", padding: 2, display: "flex", justifyContent: "space-around" }}>
        <ToggleButton value="check" selected={board} onChange={() => editable && setBoard(!board)}>
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
              onClick={() =>
                createDoc("users", user.uid, {
                  profile: { nickName: nickName, ski: ski, board: board },
                }).then(() => {
                  alert("수정이 완료되었습니다.");
                  setEdit(!edit);
                })
              }>
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
  );
};

export default Profile;
