import React from "react";
import Masonry from "react-masonry-css";
import Pin from "./Pin";
import { v4 as uuidv4 } from "uuid";

const MasonryGrid = ({ pins }) => {
  const breakpointsObj = {
    default: 4,
    3000: 5,
    2000: 4,
    1200: 3,
    1000: 2,
    500: 1,
  };
  return (
    <div className="p-3">
      <Masonry
        className="animate-slide-fwd w-full flex"
        breakpointCols={breakpointsObj}
        key={uuidv4()}
      >
        {pins.map((pin) => {
          return <Pin key={pin?._id} pin={pin} />;
        })}
      </Masonry>
    </div>
  );
};

export default MasonryGrid;
