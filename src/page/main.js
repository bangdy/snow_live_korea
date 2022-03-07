import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import InfoCard from "components/InfoCard";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const Main = (props) => {
  const resorts = useSelector((state) => state.resorts);

  return (
    <Stack
      spacing={2}
      direction="column"
      sx={{ alignItems: "center", width: "100%", textAlign: "center", flexGrow: 1 }}>
      {Object.keys(resorts.collection).map((key, i) => {
        return <InfoCard key={i} {...resorts.collection[key]} />;
      })}
      <Box>
        <Link to="/resort_editor" style={{ textDecoration: "none" }}>
          <Button variant="outlined">만들기</Button>
        </Link>
      </Box>
    </Stack>
  );
};

export default Main;
