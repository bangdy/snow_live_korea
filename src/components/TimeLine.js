import React from "react";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";
import date from "date-and-time";

const timeFormat = "HH:mm A";

const TimeItem = (props) => {
  const { time, k } = props;

  return (
    <TimelineItem>
      <TimelineOppositeContent color="text.secondary">
        {date.format(new Date(time[k]), timeFormat)}
      </TimelineOppositeContent>
      <TimelineSeparator>
        <TimelineDot />
        <TimelineConnector />
      </TimelineSeparator>
      <TimelineContent>{k.includes("Start") ? "시작" : "종료"}</TimelineContent>
    </TimelineItem>
  );
};

const TimeLine = (props) => {
  const { time } = props;

  const validTimes = Object.keys(time)
    .filter((k) => k[0] === "t" && time[k])
    .sort((i, j) => (time[i] > time[j] ? 1 : -1));

  return (
    <React.Fragment>
      <Timeline position="alternate">
        {validTimes.map((k) => (
          <TimeItem time={time} k={k} />
        ))}
      </Timeline>
    </React.Fragment>
  );
};

export default TimeLine;
