import React from "react";
import { Link } from "react-router-dom";
import InfoCard from "components/InfoCard";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";

const Main = (props) => {
  const resorts = useSelector((state) => state.resorts);

  return (
    <Stack spacing={2} direction="column" sx={{ alignItems: "center" }}>
      {resorts.collection.map((data) => {
        return <InfoCard {...data} />;
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
