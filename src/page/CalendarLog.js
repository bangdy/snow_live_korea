import React, { useState } from "react";
import Box from "@mui/material/Box";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import dateTime from "date-and-time";
import { useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import ReviewCard from "components/ReviewCard";

const Dot = styled((props) => {
  const { color, ...other } = props;
  return <Box {...other} sx={{ backgroundColor: color }} />;
})(({ theme }) => ({
  height: "8px",
  width: "8px",
  borderRadius: "50%",
  display: "flex",
  marginLeft: "1px",
}));

const dayFormat = "DD";
const timeFormat = "YYYY-MM-DD";
const midDay = new Date();
midDay.setDate(15);
const memoFounds = {};

const CalendarLog = (props) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const resortStore = useSelector((state) => state.resorts);
  const resorts = resortStore.collection;
  const colors = resortStore.colors;
  const user = useSelector((state) => state.user);

  const reviews = [];
  Object.keys(resorts).forEach((rst) =>
    Object.keys(resorts[rst]["reviews"]).forEach((d) => {
      if (resorts[rst]["reviews"][d]?.[user.uid])
        reviews.push({ ...resorts[rst]["reviews"][d][user.uid], resortInfo: resorts[rst].info });
    })
  );
  const lastMonth = dateTime.addMonths(midDay, -1);
  const nextMonth = dateTime.addMonths(midDay, 1);

  const selectedDaysReviews = selectedDay
    ? memoFounds[dateTime.format(selectedDay, timeFormat)]
    : [];

  const cal = (d) => (
    <Stack direction="row" justifyContent="center">
      <Calendar
        calendarType="US"
        defaultValue={d}
        formatDay={(locale, date) => dateTime.format(date, dayFormat)}
        showNeighboringMonth={false}
        onChange={(date) => {
          if (Object.keys(memoFounds).includes(dateTime.format(date, timeFormat))) {
            setSelectedDay(date);
          } else {
            setSelectedDay(null);
          }
        }}
        tileContent={({ date, view }) => {
          const founds = reviews.filter(
            (x) =>
              dateTime.format(new Date(x.createdAt), timeFormat) ===
              dateTime.format(date, timeFormat)
          );
          if (founds.length > 0) {
            memoFounds[dateTime.format(date, timeFormat)] = founds;
            return (
              <Stack direction="row" justifyContent="center">
                {founds.map((found) => {
                  return <Dot color={colors[found.resort]} />;
                })}
              </Stack>
            );
          }
        }}
      />
    </Stack>
  );

  return (
    <Box>
      <Swiper
        slidesPerView={1.3}
        spaceBetween={8}
        centeredSlides={true}
        pagination={{
          clickable: true,
          type: "progressbar",
        }}
        modules={[Pagination]}
        touchStartForcePreventDefault={true}
        touchMoveStopPropagation={true}
        className="mySwiper">
        <SwiperSlide>{cal(lastMonth)}</SwiperSlide>
        <SwiperSlide>{cal(midDay)}</SwiperSlide>
        <SwiperSlide>{cal(nextMonth)}</SwiperSlide>
      </Swiper>
      <Divider sx={{ marginY: 3, width: "100%" }} />
      {selectedDaysReviews.map((rev, i) => (
        <ReviewCard {...rev} key={i} user={user} uid={user.uid} resortInfo={rev.resortInfo} />
      ))}
    </Box>
  );
};

export default CalendarLog;
