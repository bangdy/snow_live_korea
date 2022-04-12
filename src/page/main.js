import React from "react";
import InfoCard from "components/InfoCard";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";

const Main = (props) => {
  const resorts = useSelector((state) => state.resorts);

  return (
    <Stack
      spacing={2}
      direction="column"
      sx={{ alignItems: "center", width: "100%", textAlign: "center", flexGrow: 1 }}>
      {Object.keys(resorts.collection).map((key, i) => {
        return <InfoCard key={i} {...resorts.collection[key]} isInMain />;
      })}
    </Stack>
  );
};

export default Main;
