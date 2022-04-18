import { ResponsiveBar } from "@nivo/bar";

// make sure parent container have a defined height when using
// responsive component, otherwise height will be 0 and
// no chart will be rendered.
// website examples showcase many properties,
// you'll often use just a few of them.

const data2 = [
  {
    date: "3/14",
    rating: 4.5,
  },
  {
    date: "3/15",
    rating: 4.9,
  },
  {
    date: "3/16",
    rating: 3.7,
  },
  {
    date: "3/17",
    rating: 3.1,
  },
  {
    date: "3/18",
    rating: 2.5,
  },
  {
    date: "3/19",
    rating: 3.7,
  },
  {
    date: "3/20",
    rating: 4.8,
  },
];

const BarChart = ({ data /* see data tab */ }) => (
  <ResponsiveBar
    data={data2}
    keys={["rating"]}
    minValue={0}
    maxValue={5}
    indexBy="date"
    margin={{ top: 50, right: 50, bottom: 50, left: 60 }}
    padding={0.4}
    valueScale={{ type: "linear" }}
    indexScale={{ type: "band", round: true }}
    colors={{ scheme: "nivo" }}
    defs={[
      {
        id: "dots",
        type: "patternDots",
        background: "inherit",
        color: "#38bcb2",
        size: 4,
        padding: 1,
        stagger: true,
      },
      {
        id: "lines",
        type: "patternLines",
        background: "inherit",
        color: "#eed312",
        rotation: -45,
        lineWidth: 6,
        spacing: 10,
      },
    ]}
    fill={[
      {
        match: {
          id: "fries",
        },
        id: "dots",
      },
      {
        match: {
          id: "sandwich",
        },
        id: "lines",
      },
    ]}
    borderColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    axisTop={null}
    axisRight={null}
    axisBottom={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "dates",
      legendPosition: "middle",
      legendOffset: 32,
    }}
    axisLeft={{
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "rating",
      legendPosition: "middle",
      legendOffset: -40,
    }}
    labelSkipWidth={12}
    labelSkipHeight={12}
    labelTextColor={{
      from: "color",
      modifiers: [["darker", 1.6]],
    }}
    role="application"
    ariaLabel="Nivo bar chart demo"
    barAriaLabel={function (e) {
      return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
    }}
  />
);

export default BarChart;
