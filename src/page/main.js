import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import InfoCard from "components/InfoCard";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useSelector, useDispatch } from "react-redux";
import { getAllDocsThunk } from "store/resorts";

const Main = (props) => {
  const dispatch = useDispatch();
  const resorts = useSelector((state) => state.resorts);

  useEffect(() => {
    dispatch(getAllDocsThunk());
  }, [dispatch]);

  return (
    <Stack spacing={2} direction="column" sx={{ alignItems: "center" }}>
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
