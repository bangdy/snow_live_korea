import React from "react";
import InfoCard from "components/InfoCard";
import { resorts } from "assets/resortData";

const Main = (props) => {
  return (
    <div>
      {resorts.map((t) => (
        <InfoCard {...t} />
      ))}
    </div>
  );
};

export default Main;
