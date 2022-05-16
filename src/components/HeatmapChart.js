import { ResponsiveTimeRange } from "@nivo/calendar";

const HeatmapChart = ({ data /* see data tab */ }) => (
  <ResponsiveTimeRange
    data={data}
    from="2021-12-15"
    to="2022-03-01"
    emptyColor="#eeeeee"
    colors={["#61cdbb", "#97e3d5", "#e8c1a0", "#f47560"]}
    minValue="auto"
    maxValue={290}
    margin={{ top: 40, right: 40, bottom: 100, left: 60 }}
    monthLegendOffset={16}
    weekdayTicks={[0, 3, 6]}
    weekdayLegendOffset={70}
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
);

export default HeatmapChart;
