import React from "react";
import FullWidthTabs from "components/tabs";
import Profile from "page/profile";

const MyPage = (props) => {
  const reviews = {
    page: (
      <div>
        <p>reviews</p>
      </div>
    ),
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
