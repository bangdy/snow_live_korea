import React, { useEffect, useState, useRef } from "react";
import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import IconButton from "@mui/material/IconButton";

const ImageEditorBox = (props) => {
  const { img, alterImgUrl, handleOpen, resortImg } = props;
  const [width, setWidth] = useState(500);
  const myContainer = useRef(null);

  useEffect(() => {
    setWidth(myContainer.current?.offsetWidth);
  }, [myContainer.current?.offsetWidth]);

  return (
    <Box sx={{ flexGrow: 1 }} ref={myContainer}>
      {img ? (
        <CardMedia
          component="img"
          sx={{ width: "35%", height: "auto", marginX: "auto" }}
          image={alterImgUrl}
          alt="Live from space album cover"
        />
      ) : (
        <Box
          sx={{
            width: "250px",
            height: "250px",
            margin: "auto",
            border: 1,
            backgroundImage: `url(${img ? window.URL.createObjectURL(img) : resortImg})`,
          }}></Box>
      )}
      <IconButton
        sx={{
          position: "relative",
          top: -60,
          left: width / 2 - 28,
        }}
        color="primary"
        aria-label="upload picture"
        component="span"
        onClick={handleOpen}>
        <PhotoCamera sx={{ width: 40, height: 40 }} />
      </IconButton>
    </Box>
  );
};

export default ImageEditorBox;
