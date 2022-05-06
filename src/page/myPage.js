import React from "react";
import FullWidthTabs from "components/FullWidthTabs";
import MyReviews from "page/MyReviews";
import Profile from "page/ProfilePage";
import CalendarLog from "page/CalendarLog";

const MyPage = (props) => {
  const calendar = {
    page: CalendarLog,
    name: "캘린더",
  };

  const reviews = {
    page: MyReviews,
    name: "리뷰모음",
  };

  const profile = {
    page: Profile,
    name: "프로필",
  };

  const pages = [profile, calendar, reviews];

  return <FullWidthTabs pages={pages} />;
};

export default MyPage;
