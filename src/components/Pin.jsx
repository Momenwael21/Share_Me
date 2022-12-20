import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { client } from "../client";
import { v4 as uuidv4 } from "uuid";
import { updatePins } from "../rtk/slices/pinsSlice";
import { BsCheck2 } from "react-icons/bs";
import { HiDownload } from "react-icons/hi";
import { FaRegComment } from "react-icons/fa";

const Pin = ({ pin }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let savedBefore =
    pin?.save?.filter((item) => item?.userId === user?._id)?.length > 0
      ? true
      : false;

  const savePin = (id) => {
    client
      .patch(id)
      .setIfMissing({ save: [] })
      .insert("after", "save[-1]", [
        {
          _key: uuidv4(),
          postedBy: {
            userId: pin?.postedBy.userId,
            userName: pin?.postedBy?.userName,
            image: pin?.postedBy?.image,
          },
          userId: `${user?._id}`,
        },
      ])
      .commit()
      .then((data) => {
        console.log(data);

        dispatch(updatePins(data));
      });
  };

  const unSavePin = (id) => {
    let newSave = pin?.save.filter((item) => item?.userId !== user?._id);

    client
      .patch(id)
      .set({
        save: [...newSave],
      })
      .commit()
      .then((data) => {
        dispatch(updatePins(data));
      });
  };
  return (
    <div className="bg-white animate-slide-in rounded-lg shadow-md p-3 m-2">
      <div className="flex justify-between items-start">
        <Link
          to={`/user-profile/${pin?.postedBy?.userId}`}
          className="flex items-center"
        >
          <img
            src={pin?.postedBy?.image}
            className="w-6 h-6 rounded-full mr-2"
            alt="publisher_photo"
          />
          <p className="text-sm font-semibold">{pin?.postedBy?.userName}</p>
        </Link>
        <div className="flex items-center">
          {!savedBefore ? (
            <button
              type="button"
              className="bg-mainOrange hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange text-white text-sm px-3 py-1 rounded-full flex justify-center items-center"
              onClick={() => savePin(pin?._id)}
            >
              Save <IoMdAdd />
            </button>
          ) : (
            <button
              type="button"
              className="bg-mainOrange hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange text-white text-sm px-3 py-1 rounded-full flex justify-center items-center"
              onClick={() => unSavePin(pin?._id)}
            >
              Saved <BsCheck2 className="" />
            </button>
          )}
        </div>
      </div>
      <h2 className="text-start mt-4 overflow-hidden">{pin?.title}</h2>
      <Link to={`/pin-detail/${pin?._id}`}>
        <img
          src={pin?.image?.asset.url}
          alt={`${pin?.postedBy?.userName} pin`}
          className="my-3 rounded-lg"
        />
        <p className="text-start overflow-hidden">
          {pin?.about?.length > 200
            ? pin?.about.slice(0, 250) + "..."
            : pin?.about}
        </p>
      </Link>
      <Link to={`/category/${pin?.category}`}>
        <p className="text-start text-blue-500 mb-3 capitalize">
          #{pin?.category}
        </p>
      </Link>
      <div className="flex mt-2 justify-between">
        <Link to={`/pin-detail/${pin?._id}`}>
          <p className="flex items-center text-gray-600">
            <FaRegComment fontSize={20} className="mr-2" />
            {pin?.comments?.length ? pin?.comments?.length : 0} Comments
          </p>
        </Link>
        <a
          href={`${pin?.image?.asset.url}?dl=`}
          download
          className="bg-mainOrange hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange text-white w-8 h-8 rounded-full flex justify-center items-center"
        >
          <HiDownload />
        </a>
      </div>
    </div>
  );
};

export default Pin;
