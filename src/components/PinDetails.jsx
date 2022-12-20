import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { HiDownload } from "react-icons/hi";
import { useState } from "react";
import { v4 as uuivd4 } from "uuid";

import { client } from "../client";

import { fetchFeed, updatePins } from "../rtk/slices/pinsSlice";
import { feedQuery } from "../utils/data";
import MasonryGrid from "./MasonryGrid";

const PinDetails = () => {
  const { pinId } = useParams();
  const pins = useSelector((state) => state.pins);
  const [thePin] = pins?.filter((pin) => pin?._id === pinId);
  const user = useSelector((state) => state.user);
  const [comment, setComment] = useState("");
  const [more, setMore] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFeed(""));
  }, [dispatch]);

  const postComment = () => {
    client
      .patch(thePin?._id)
      .setIfMissing({ comments: [] })
      .insert("after", "comments[-1]", [
        {
          _key: uuivd4(),
          postedBy: {
            _type: "postedBy",
            userName: user?.userName,
            image: user?.image,
            userId: user?._id,
          },
          comment: comment,
        },
      ])
      .commit()
      .then((data) => {
        setComment("");
        dispatch(updatePins(data));
      });
  };

  return (
    <div className="flex flex-1 flex-col justify-center">
      <div className="flex-1 p-2 flex md:flex-row bg-white min-h-screen m-2 rounded-lg justify-center md:justify-between flex-col">
        <div className="flex flex-col justify-start md:w-3/6 p-2">
          <Link to={`/user-profile/${thePin?.postedBy?.userId}`}>
            <div className="flex flex-row justify-start bg-white py-2 w-full items-center">
              <img
                src={thePin?.postedBy?.image}
                className="w-8 rounded-full mt-1"
                alt="profile_photo"
              />
              <h3 className="text-lg ml-3">{thePin?.postedBy?.userName}</h3>
            </div>
          </Link>
          <img
            src={thePin?.image?.asset.url}
            alt="pin_image"
            className="rounded-lg w-full"
          />
          <a
            href={`${thePin?.image?.asset.url}?dl=`}
            download
            className="bg-mainOrange hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange flex items-center px-3 py-1 mt-3 text-white rounded-full w-fit"
          >
            Download
            <HiDownload />
          </a>
        </div>
        <div className="md:w-3/6 flex justify-start p-2 my-2 flex-col">
          <div className="flex justify-start flex-col">
            <h1 className=" text-2xl w-fit font-semibold">{thePin?.title}</h1>
            <p className="text-start text-lg w-fit mt-3">{thePin?.about}</p>
            <Link to={`/category/${thePin?.category}`} className="w-fit">
              <p className="text-blue-500 mb-3 mt-2 capitalize">
                #{thePin?.category}
              </p>
            </Link>
          </div>
          <div className="w-full rounded-md  bg-gray-100 flex flex-col p-3 mt-3">
            <div className="comment w-full flex items-center">
              <div className="flex items-center w-4/6 mb-3">
                <img
                  src={user?.image}
                  alt="user_photo"
                  className="w-6 h-6 rounded-full mr-2"
                />
                <input
                  type="text"
                  placeholder="Enter Your Comment"
                  className="p-1 w-4/6 rounded-lg border-2 focus:border-gray-400 focus:outline-none border-gray-200"
                  required
                  value={comment}
                  onChange={(e) => setComment(e.currentTarget.value)}
                />
                <button
                  className="bg-mainOrange hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange flex items-center px-3 ml-3 py-1 text-white rounded-full w-fit"
                  onClick={() => {
                    postComment();
                  }}
                >
                  Post
                </button>
              </div>
            </div>
            <div className="flex justify-start flex-col">
              {thePin?.comments?.map((comment) => (
                <div className="flex flex-col w-full" key={comment?._key}>
                  <Link to={`/user-profile/${comment?.postedBy?.userId}`}>
                    <div className="flex flex-row justify-start py-2 w-full items-center">
                      <img
                        src={comment?.postedBy?.image}
                        className="w-6 h-6 rounded-full mt-1"
                        alt="profile_photo"
                      />
                      <h3 className="text-md ml-3">
                        {comment?.postedBy?.userName}
                      </h3>
                    </div>
                  </Link>
                  <p className="border-2 rounded-md text-start p-3 border-gray-200">
                    {comment?.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center w-full flex-1">
        <button
          onClick={() => setMore(!more)}
          className=" cursor-pointertext-lg w-full py-3 hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange bg-mainOrange text-white"
        >
          {more ? "Less Pins" : "More Pins"}
        </button>
        {more && <MasonryGrid pins={pins} />}
      </div>
    </div>
  );
};

export default PinDetails;
