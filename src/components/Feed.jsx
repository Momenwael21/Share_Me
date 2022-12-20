import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchFeed } from "../rtk/slices/pinsSlice";
import MasonryGrid from "./MasonryGrid";
import "animate.css";

import Spinner from "./Spinner";

const Feed = () => {
  const { categoryId } = useParams();
  let pins = useSelector((state) => state.pins);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed(""));
  }, [categoryId, dispatch]);
  if (pins.includes("wait")) return <Spinner message={"Loading..."} />;

  let specificPins = [];
  if (categoryId) {
    specificPins = pins?.filter((pin) => pin?.category === categoryId);
  } else {
    specificPins = pins;
  }

  return specificPins.length > 0 && !pins.includes("wait") ? (
    <div className="w-full">
      <div className="w-full relative">
        <div className="w-full absolute h-full flex items-center justify-center flex-col z-10">
          <h1 className="text-white mb-2 text-3xl animate__animated animate__bounceInLeft">
            Happy To See You Here
          </h1>
          <p className="text-white text-lg animate__animated animate__bounceInRight">
            Go and start your journey by posting the best photo you have taken.
          </p>
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-60"></div>
        <img
          className="w-full h-340 xl:h-510"
          src="https://source.unsplash.com/1600x600/?nature,technology,wallpapers,animals"
          alt="banner_photo"
        />
      </div>
      <MasonryGrid pins={specificPins} />
    </div>
  ) : (
    <h2 className="text-2xl mt-4">No Pins Yet!</h2>
  );
};

export default Feed;
