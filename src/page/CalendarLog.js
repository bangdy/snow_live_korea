import React from "react";
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
// import styled from "styled-components";
import Stack from "@mui/material/Stack";

// const Dot = styled.div`
//   height: 8px;
//   width: 8px;
//   background-color: #f87171;
//   border-radius: 50%;
//   display: flex;
//   margin-left: 1px;
// `;

const Dot2 = styled((props) => {
  const { color, ...other } = props;
  return <Box {...other} sx={{ backgroundColor: color }} />;
})(({ theme, color }) => ({
  height: "8px",
  width: "8px",
  borderRadius: "50%",
  display: "flex",
  marginLeft: "1px",
}));

const dayFormat = "DD";
const timeFormat = "YYYY-MM-DD";

const CalendarLog = (props) => {
  const midDay = new Date();
  midDay.setDate(15);

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

  const cal = (d) => (
    <Stack direction="row" justifyContent="center">
      <Calendar
        calendarType="US"
        defaultValue={d}
        formatDay={(locale, date) => dateTime.format(date, dayFormat)}
        showNeighboringMonth={false}
        tileContent={({ date, view }) => {
          const founds = reviews.filter(
            (x) =>
              dateTime.format(new Date(x.createdAt), timeFormat) ===
              dateTime.format(date, timeFormat)
          );
          console.log(founds);
          if (founds.length > 0) {
            return (
              <Stack direction="row" justifyContent="center">
                {founds.map((found) => {
                  console.log(found);
                  return <Dot2 color={colors[found.resort]} />;
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
    </Box>
  );
};

export default CalendarLog;
