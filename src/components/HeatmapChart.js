import { useState } from "react";
import { ResponsiveTimeRange } from "@nivo/calendar";
import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import { useSelector } from "react-redux";
import { dayFormatChange } from "help/util";

const HeatmapChart = ({ user /* see data tab */ }) => {
  const resortStore = useSelector((state) => state.resorts);
  const resorts = resortStore.collection;

  const data = [];
  Object.keys(resorts).forEach((rst) =>
    Object.keys(resorts[rst]["reviews"]).forEach((d) => {
      if (resorts[rst]["reviews"][d]?.[user.uid]) data.push({ day: dayFormatChange(d), value: 3 });
    })
  );

  const createdAt = new Date(user.profile?.createdAt);
  let temp;

  if (createdAt.getMonth() > 2) {
    temp = createdAt.getFullYear();
  } else {
    temp = createdAt.getFullYear() - 1;
  }
  const [startYear, setStartYear] = useState(temp);
  const [season, setSeason] = useState(new Date(startYear, 11, 15));
  const endSeason = 2023;
  const seasons = [];
  for (var i = 0; i < endSeason - startYear; ++i) {
    seasons.push(startYear + i);
  }

  const currentWidth = window.innerWidth;
  const validWidth = currentWidth > 760 ? 760 : currentWidth;

  return (
    <>
      <Divider sx={{ marginTop: 4, marginBottom: 2 }} />
      <Stack direction="row" spacing={1} mb={2}>
        {seasons.map((y, i) => {
          const s = String(y).slice(2);
          const e = String(Number(s) + 1);
          return (
            <Chip
              label={`${s}-${e} 시즌`}
              color="primary"
              variant={y === season.getFullYear() ? "filled" : "outlined"}
              onClick={() => setSeason(new Date(y, 11, 15))}
              key={i}
            />
          );
        })}
      </Stack>
      <Stack
        sx={{ height: validWidth * 0.15 + 220, width: "100%", border: 1, borderColor: "#dfdfdf" }}
        p={1}
        mt={4}>
        <ResponsiveTimeRange
          data={data}
          from="2021-12-15"
          to="2022-03-10"
          emptyColor="#eeeeee"
          colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
          minValue={0}
          maxValue={5}
          margin={{ top: 40, right: 0, bottom: 10, left: 0 }}
          monthLegendOffset={16}
          weekdayTicks={[0, 3, 6]}
          weekdayLegendOffset={validWidth * 0.1}
          dayRadius={5}
          daySpacing={1}
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: "bottom-right",
              direction: "row",
              justify: false,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: "right-to-left",
              translateX: -89,
              translateY: -50,
              symbolSize: 20,
            },
          ]}
        />
      </Stack>
    </>
  );
};

export default HeatmapChart;
