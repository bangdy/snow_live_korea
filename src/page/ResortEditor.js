import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useNavigate, useLocation } from "react-router-dom";
import { ResortFactory } from "assets/ResortFactory";
import Button from "@mui/material/Button";
import { updateDoc, createDoc } from "help/firestore";
import TimePickerPack from "components/TimePickerPack";
import AvatarImageCropper from "react-avatar-image-cropper";
import Modal from "@mui/material/Modal";
import Stack from "@mui/material/Stack";
import ImageEditorBox from "components/ImageEditorBox";
import { uploadImage } from "help/util";
import { useDispatch, useSelector } from "react-redux";
import { saveImageUrl, getResortDocThunk } from "store/resorts";

const ResortEditor = (props) => {
  const [img, setImg] = useState(null);
  const [alterImgUrl, setAlterImgUrl] = useState(null);
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const resortObj = location.state;
  const resort = new ResortFactory(resortObj);
  const resortImg = useSelector((state) => state.resorts.images?.[resort.url]);

  //Logical Indicator
  const forEdit = resort.getObject.url !== undefined;
  const onTextChangeHandler = (e) => {
    resort.update(e.target.id, e.target.value);
    e.target.value = resort[e.target.id];
  };

  const timesArr = Object.keys(resort.getObject).filter((i) => i[0] === "t");

  const onImageChange = (file) => {
    file && setImg(file);
  };

  const handleOk = () => {
    setAlterImgUrl(window.URL.createObjectURL(img));
    setOpen(false);
  };

  const handleClose = () => {
    setImg(null);
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

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
            <Button variant="contained" onClick={handleOk}>
              확인
            </Button>
          </Stack>
        </Stack>
      </Modal>

      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Grid container spacing={2} mb={2}>
          <ImageEditorBox
            img={img}
            alterImgUrl={alterImgUrl}
            handleOpen={handleOpen}
            resortImg={resortImg}
          />
        </Grid>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12}>
            <TextField
              name="name"
              required
              fullWidth
              id="name"
              label="리조트 이름"
              autoFocus
              onChange={onTextChangeHandler}
              defaultValue={resort.name}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="name"
              required
              fullWidth
              id="address"
              label="주소"
              onChange={onTextChangeHandler}
              defaultValue={resort.address}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              name="name"
              required
              fullWidth
              id="url"
              label="url"
              onChange={onTextChangeHandler}
              value={resort.url}
              disabled={forEdit}
            />
          </Grid>
        </Grid>
        {timesArr.map((t, i) => (
          <Grid item xs={12} sm={12} mt={2} sx={{ width: "100%" }} key={i}>
            <TimePickerPack id={t} resortFactory={resort} />
          </Grid>
        ))}

        <Button
          sx={{ marginTop: 2 }}
          variant="outlined"
          onClick={async () => {
            const dbFunction = forEdit ? updateDoc : createDoc;
            let message;

            if (!img || window.confirm("리조트 이미지 사진이 변경됩니다. 진행하시겠습니까")) {
              try {
                message = await dbFunction("resorts", resort.url, { info: resort.getObject });
                dispatch(getResortDocThunk(resort.url));
                if (img) {
                  await uploadImage("resort", resort.url, img);
                  dispatch(saveImageUrl({ url: resort.url, imgUrl: alterImgUrl }));
                }
              } catch (e) {
                message = e;
              }
            } else {
              message = "최소되었습니다.";
            }
            alert(message);
            navigate("/");
          }}>
          {forEdit ? "수정하기" : "만들기"}
        </Button>
      </Box>
    </>
  );
};

export default ResortEditor;
