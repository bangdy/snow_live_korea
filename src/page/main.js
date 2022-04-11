import React from "react";
import InfoCard from "components/InfoCard";
import Stack from "@mui/material/Stack";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";

const Main = (props) => {
  const resorts = useSelector((state) => state.resorts);
  const isMobile = useSelector((state) => state.user.isMobile);
  const navigate = useNavigate();

  return (
    <Stack
      spacing={2}
      direction="column"
      sx={{ alignItems: "center", width: "100%", textAlign: "center", flexGrow: 1 }}>
      {Object.keys(resorts.collection).map((key, i) => {
        return <InfoCard key={i} {...resorts.collection[key]} isInMain />;
      })}
      <Box
        pr={2}
        sx={{
          position: isMobile ? "sticky" : "fixed",
          right: !isMobile && 100,
          bottom: 30,
          alignSelf: "flex-end",
        }}>
        <Paper elevation={3} sx={{ borderRadius: "50%" }}>
          <IconButton
            onClick={() => navigate("/about")}
            sx={{
              border: 1,
              backgroundColor: "#f9f9f9",
            }}
            color="primary"
            aria-label="upload picture"
            component="span">
            <QuestionMarkIcon sx={{ width: 20, height: 20 }} />
          </IconButton>
        </Paper>
      </Box>
    </Stack>
  );
};

export default Main;
