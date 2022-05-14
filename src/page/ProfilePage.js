import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import React, { useState, useContext, useEffect } from "react";
import Modal from "@mui/material/Modal";
import LogoutIcon from "@mui/icons-material/Logout";
import EditIcon from "@mui/icons-material/Edit";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ProfileEditor from "components/ProfileEditor";
import { NavActionsContext } from "help/customHooks";
import { logout } from "store/user";
import Profile from "components/Profile";

const ProfilePage = (props) => {
  const { setActions } = useContext(NavActionsContext);
  const { currentTab } = props;

  const user = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState(null);
  const [alterImgUrl, setAlterImgUrl] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    user.profile?.isAdmin && {
      icon: <ManageAccountsIcon />,
      name: "Admin",
      onClick: () => {
        navigate("/admin");
      },
    },
  ];

  useEffect(() => {
    setActions(currentActions);
  }, [currentTab]);

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
      <Profile user={user} />
    </>
  );
};

export default ProfilePage;
