import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
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
import { getDate } from "help/util";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import TimeLine from "./TimeLine";
import Box from "@mui/material/Box";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const InfoCard = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isInMain, style } = props;
  const { name, address, url } = props.info;
  const reviews = props.reviews;
  const resorts = useSelector((state) => state.resorts);
  const user = useSelector((state) => state.user);
  const isMobile = user.isMobile;

  const [imageUrl, setImageUrl] = useState(resorts?.images[url]);
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const fetch = async () => {
      const imgUrl = await downloadImage("resort", url);
      setImageUrl(imgUrl);
      dispatch(saveImageUrl({ url: url, imgUrl: imgUrl }));
    };
    if (!resorts?.images[url]) {
      fetch();
    }
  }, [dispatch]);

  const today = new Date();
  const dateString = getDate(today);
  const revieweesArr = Object.keys(reviews[dateString] ?? {});
  const revieweeNum = revieweesArr.length;

  const meanScore =
    revieweeNum > 0
      ? revieweesArr.reduce((acc, cur) => reviews[dateString][cur].score + acc, 0) / revieweeNum
      : 0;

  //Logical Indicator
  const showEditButton = !isInMain && user.profile.isAdmin;

  return (
    <Card sx={style}>
      <Stack direction={isMobile ? "column" : "row"} sx={isMobile ? { alignItems: "center" } : {}}>
        <CardMedia
          component="img"
          sx={{ width: "35%", height: "auto", objectFit: "contain", marginLeft: 2 }}
          image={imageUrl}
          alt="Resort's Logo Image"
        />
        <CardContent sx={{ width: 350, textAlign: "left", paddingLeft: 4 }}>
          <CardHeader
            sx={{ padding: 0 }}
            action={
              showEditButton && (
                <IconButton
                  aria-label="settings"
                  onClick={() => navigate("/resort_editor", { state: props.info })}>
                  <EditIcon />
                </IconButton>
              )
            }
            title={
              <Typography variant="h5" component="div">
                {name}
              </Typography>
            }
          />
          <Typography variant="body2" mt={2}>
            {address}
          </Typography>
          <Stack
            direction="row"
            mt={2}
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "flex-start" }}>
            <Rating name="simple-controlled" value={meanScore ?? 0} readOnly size="large" />
            <Stack direction="row">
              <Typography variant="subtitle2"> {meanScore.toPrecision(2)} / </Typography>
              <DirectionsWalkIcon fontSize="small" sx={{ marginLeft: 0.5 }} />
              <Typography variant="subtitle2">{revieweeNum} </Typography>
            </Stack>
          </Stack>
        </CardContent>
      </Stack>
      {isInMain && (
        <CardActions disableSpacing sx={{ justifyContent: "space-between" }}>
          <Box sx={{ width: 40 }}></Box>
          <Link to={`/${url}`} style={{ textDecoration: "none" }}>
            <CardActions sx={{ display: "felx", flex: 1, justifyContent: "center" }}>
              <Button size="small">리뷰하기</Button>
            </CardActions>
          </Link>
          <ExpandMore
            sx={{ marginLeft: 0, alignSelf: "center", justifySelf: "flex-end" }}
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more">
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <TimeLine time={props.info} />
      </Collapse>
    </Card>
  );
};

export default InfoCard;
