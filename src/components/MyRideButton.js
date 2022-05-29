import ToggleButton from "@mui/material/ToggleButton";
import { DownhillSkiingRounded, SnowboardingRounded } from "@mui/icons-material";

const MyRideButton = (props) => {
  const { editable, equipment, setMyRide, myRide, size, sx, ...leftOver } = props;

  let MyRide;
  if (equipment === "ski") {
    MyRide = DownhillSkiingRounded;
  } else {
    MyRide = SnowboardingRounded;
  }

  const fSize = 0.7 * size;
  const selected = equipment === myRide;

  return (
    <ToggleButton
      {...leftOver}
      sx={{ width: size, height: size, borderRadius: 0.5 * size, ...sx }}
      disabled={!editable}
      value="check"
      selected={selected}
      onChange={() => editable && setMyRide(equipment)}>
      <MyRide sx={{ fontSize: fSize > 20 ? fSize : 20 }} color={selected ? "primary" : ""} />
    </ToggleButton>
  );
};

export default MyRideButton;
