import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import { Link } from "react-router-dom";

const InfoCard = (props) => {
  const [value, setValue] = useState(3);
  const { name, address, url } = props.info;

  return (
    <Card sx={{ width: "100%", textAlign: "center", flexGrow: 1, paddingX: 4 }}>
      <CardContent>
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
          sx={{ alignItems: "center", justifyContent: "center" }}>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            size="large"
          />
          <Typography variant="span">(4.5 / 4명)</Typography>
        </Stack>
      </CardContent>
      <Link to={`/${url}`} style={{ textDecoration: "none" }}>
        <CardActions sx={{ display: "felx", flex: 1, justifyContent: "center" }}>
          <Button size="small">리뷰하기</Button>
        </CardActions>
      </Link>
    </Card>
  );
};

export default InfoCard;
