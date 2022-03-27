import React from "react";
import FullWidthTabs from "components/FullWidthTabs";
import MyReviews from "page/MyReviews";
import Profile from "page/Profile";
import CalendarLog from "page/CalendarLog";

const MyPage = (props) => {
  const logs = {
    page: CalendarLog,
    name: "기록",
  };

  const reviews = {
    page: MyReviews,
    name: "리뷰모음",
  };

  const profile = {
    page: Profile,
    name: "Profile",
  };

  const pages = [logs, reviews, profile];

  return <FullWidthTabs pages={pages} />;
};

export default MyPage;
