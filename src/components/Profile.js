import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import InstagramIcon from "@mui/icons-material/Instagram";
import Divider from "@mui/material/Divider";
import date from "date-and-time";
import Linkify from "react-linkify";

import ProfileAvatar from "components/ProfileAvatar";
import MyRideButton from "components/MyRideButton";

const timeFormat = "YY.MM.DD";

const Profile = (props) => {
  const { user } = props;

  const theme = useTheme();

  return (
    <Stack direction="column" sx={{ alignItems: "center", position: "relative" }}>
      <Box
        sx={{
          alignSelf: "stretch",
          height: 120,
          background: `linear-gradient(${theme.palette.primary.light}, #ffffff)`,
          position: "relative",
        }}></Box>
      <Grid container spacing={2} mt={-10}>
        <Grid item xs={4} sm={4}>
          <ProfileAvatar user={user} size={100} sx={{ marginX: "auto" }} />
        </Grid>
        <Grid item xs={8} sm={8}>
          <Stack
            direction="column"
            justifyContent="space-evenly"
            alignItems="flex-start"
            sx={{ height: "100%" }}>
            <Stack direction="row" justifyContent={"space-between"} sx={{ width: "100%" }}>
              <Typography variant="h5" zIndex={100}>
                {user.profile.nickName}
              </Typography>
              <MyRideButton
                myRide={user.profile.myRide}
                equipment={user.profile.myRide}
                size={30}
                sx={{ marginRight: 10 }}
              />
            </Stack>
            <Stack direction="row" zIndex={100}>
              <InstagramIcon />
            </Stack>
            <Box>
              <Typography variant="caption" mt={2}>
                Since {date.format(new Date(user.profile.createdAt), timeFormat)}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>

      <Stack
        direction="column"
        alignItems="stretch"
        mt={4}
        px={4}
        sx={{ textAlign: "left", width: "100%" }}>
        <Typography variant="caption" mb={2}>
          <Linkify
            componentDecorator={(decoratedHref, decoratedText, key) => (
              <a target="blank" href={decoratedHref} key={key}>
                {decoratedText}
              </a>
            )}>
            {user.profile?.introduce ?? "소개 없음"}
          </Linkify>
        </Typography>
      </Stack>
      <Stack direction="row" mt={2} justifyContent="space-around" sx={{ height: 40, width: "80%" }}>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" fontWeight={800}>
            24
          </Typography>
          <Typography variant="h6">Ridings</Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginX: 0.5, marginY: 0 }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" fontWeight={800}>
            10
          </Typography>
          <Typography variant="h6">Followers</Typography>
        </Box>
        <Divider
          orientation="vertical"
          variant="middle"
          flexItem
          sx={{ marginX: 0.5, marginY: 0 }}
        />
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="caption" fontWeight={800}>
            120
          </Typography>
          <Typography variant="h6">Likes</Typography>
        </Box>
      </Stack>
    </Stack>
  );
};

export default Profile;
