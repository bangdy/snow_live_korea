import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const Admin = (props) => {
  return (
    <Stack direction="column" sx={{ alignItems: "center", position: "relative", width: "100%" }}>
      <Box
        p={2}
        mt={2}
        sx={{
          display: "block",
          textAlign: "center",
          width: "100%",
        }}>
        <Typography variant="h5">관리자 영역</Typography>
      </Box>
      <Stack
        mt={6}
        px={4}
        direction="row"
        justifyContent="space-between"
        sx={{
          width: "100%",
        }}>
        <Typography variant="h6">Resort 만들기</Typography>
        <Box>
          <Link to="/resort_editor" style={{ textDecoration: "none" }}>
            <Button variant="outlined">Resort 만들기</Button>
          </Link>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Admin;
