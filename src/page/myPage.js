import React from "react";
import FullWidthTabs from "components/FullWidthTabs";
import MyReviews from "page/MyReviews";
import Profile from "page/Profile";

const MyPage = (props) => {
  const reviews = {
    page: <MyReviews />,
    name: "기록",
  };

  const profile = {
    page: <Profile />,
    name: "Profile",
  };

  const pages = [reviews, profile];

  return <FullWidthTabs pages={pages} />;
};

export default MyPage;
