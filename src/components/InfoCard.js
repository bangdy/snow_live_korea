import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";
import CardMedia from "@mui/material/CardMedia";
import { downloadImage } from "help/util";
import { useSelector, useDispatch } from "react-redux";
import { saveImageUrl } from "store/resorts";

const InfoCard = (props) => {
  const { name, address, url } = props.info;
  const dispatch = useDispatch();
  const resorts = useSelector((state) => state.resorts);

  const [imageUrl, setImageUrl] = useState(resorts?.images[url]);

  useEffect(() => {
    const fetch = async () => {
      const imgUrl = await downloadImage("resort", url + ".jpg");
      setImageUrl(imgUrl);
      dispatch(saveImageUrl({ url: url, imgUrl: imgUrl }));
    };
    if (resorts?.images[url] === undefined) {
      fetch();
    }
  }, []);

  return (
    <Card sx={{ width: "100%", textAlign: "center", flexGrow: 1, display: "flex" }}>
      <CardMedia
        component="img"
        sx={{ width: 150, height: "auto", objectFit: "contain", marginLeft: 2 }}
        image={imageUrl}
        alt="Live from space album cover"
      />
      <CardContent sx={{ width: 350, textAlign: "left", paddingLeft: 4 }}>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" mt={2}>
          {address}
        </Typography>
        <Stack
          direction="row"
          mt={2}
          spacing={2}
          sx={{ alignItems: "center", justifyContent: "flex-start" }}>
          <Rating name="simple-controlled" value={3} readOnly size="large" />
          <Typography variant="span">(4.5 / 4명)</Typography>
        </Stack>
        <Link to={`/${url}`} style={{ textDecoration: "none" }}>
          <CardActions sx={{ display: "felx", flex: 1, justifyContent: "center" }}>
            <Button size="small">리뷰하기</Button>
          </CardActions>
        </Link>
      </CardContent>
    </Card>
  );
};

export default InfoCard;
