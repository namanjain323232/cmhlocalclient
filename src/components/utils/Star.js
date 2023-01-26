import { CheckSquareTwoTone } from "@ant-design/icons";
import React from "react";
import StarRating from "react-star-ratings";

const Star = ({ starClicked, numberOfStars, selected }) => {
  return (
    <>
      <StarRating
        changeRating={() => starClicked(numberOfStars)}
        numberOfStars={numberOfStars}
        starDimension="20px"
        starSpacing="2px"
        rating={numberOfStars}
        starHoverColor="red"
        starRatedColor={selected ? "red" : "#929699"}
      />
      <br />
    </>
  );
};

export default Star;
