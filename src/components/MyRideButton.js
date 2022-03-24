import ToggleButton from "@mui/material/ToggleButton";
import { DownhillSkiingRounded, SnowboardingRounded } from "@mui/icons-material";

const MyRideButton = (props) => {
  const { editable, equipment, setMyRide, myRide, size } = props;

  let MyRide;
  if (equipment === "ski") {
    MyRide = DownhillSkiingRounded;
  } else {
    MyRide = SnowboardingRounded;
  }

  const fSize = 0.7 * size;

  return (
    <ToggleButton
      sx={{ width: size, height: size, borderRadius: 0.1 * size }}
      disabled={!editable}
      value="check"
      selected={equipment === myRide}
      onChange={() => editable && setMyRide(equipment)}>
      <MyRide sx={{ fontSize: fSize > 20 ? fSize : 20 }} />
    </ToggleButton>
  );
};

export default MyRideButton;