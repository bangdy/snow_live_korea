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

const TimeLine = (props) => {
  const { time } = props;

  return (
    <React.Fragment>
      <Timeline position="alternate">
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {date.format(new Date(time.t1Start), timeFormat)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>시작</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {date.format(new Date(time.t1Finish), timeFormat)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>종료</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {date.format(new Date(time.t2Start), timeFormat)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>시작</TimelineContent>
        </TimelineItem>
        <TimelineItem>
          <TimelineOppositeContent color="text.secondary">
            {date.format(new Date(time.t2Finish), timeFormat)}
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>종료</TimelineContent>
        </TimelineItem>
        {time.t3Start ?? (
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {date.format(new Date(props.time.t3Start), timeFormat)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>시작</TimelineContent>
          </TimelineItem>
        )}
        {time.t3Start ?? (
          <TimelineItem>
            <TimelineOppositeContent color="text.secondary">
              {date.format(new Date(props.time.t3Finish), timeFormat)}
            </TimelineOppositeContent>
            <TimelineSeparator>
              <TimelineDot />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>시작</TimelineContent>
          </TimelineItem>
        )}
      </Timeline>
    </React.Fragment>
  );
};

export default TimeLine;
