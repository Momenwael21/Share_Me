import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { HiOutlineLogout } from "react-icons/hi";
import { useState } from "react";
import { useEffect } from "react";
import { fetchUserInfo } from "../rtk/slices/userProfileSlice";
import MasonryGrid from "./MasonryGrid";
import { fetchFeed } from "../rtk/slices/pinsSlice";

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId } = useParams();
  const userInfo = useSelector((state) => state.userProfile[0]);
  const currentUser = useSelector((state) => state.user);
  const [activeBtn, setActiveBtn] = useState("created");
  const [qoute, setQoute] = useState({});

  const createdPins = useSelector((state) =>
    state.pins?.filter((pin) => pin?.postedBy?.userId === userId)
  );

  const savedPins = useSelector((state) =>
    state.pins?.filter(
      (pin) =>
        pin.save !== null &&
        pin.save?.filter((user) => user?.userId === userId).length !== 0
    )
  );

  console.log(createdPins);
  console.log(savedPins);

  const activeClass = "bg-mainOrange text-white";
  const notActiveClass = "bg-transparent text-orange-600";

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchUserInfo(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    fetch("https://api.quotable.io/random?minLength=100&maxLength=140")
      .then((resp) => resp.json())
      .then((qoute) => setQoute(qoute));
  }, []);

  return (
    <div className="flex relative flex-1 justify-center flex-col">
      {currentUser?._id === userId && (
        <GoogleLogout
          clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
          render={(renderProps) => (
            <button
              style={{ zIndex: 5 }}
              type="button"
              className="bg-mainOrange absolute top-5 right-5 text-white cursor-pointer flex rounded-full p-1 outline-none items-center"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <HiOutlineLogout fontSize={25} />
            </button>
          )}
          onLogoutSuccess={logout}
          cookiePolicy="single_host_origin"
        />
      )}
      <div className="w-full flex flex-col items-center relative">
        <div
          style={{ zIndex: 2 }}
          className=" w-3/4 md:w-1/2 absolute h-full flex items-center justify-center flex-col"
        >
          <h2 className="text-gray-200 font-light text-2xl">
            {qoute?.content}
          </h2>
          <p className="text-gray-300 mt-3 font-semibold">{qoute?.author}</p>
        </div>
        <div className="absolute top-0 bottom-0 left-0 right-0 bg-black opacity-60"></div>
        <img
          className="w-full h-340 xl:h-510 "
          src="https://source.unsplash.com/1600x900/?nature,technology,wallpapers,animals"
          alt="banner_photo"
        />
      </div>
      <div
        style={{ zIndex: 5 }}
        className="flex w-full justify-center -my-16  items-center flex-col"
      >
        <img
          src={userInfo?.image}
          alt="user-profile"
          className="rounded-full w-32 border-4 border-white shadow-lg"
        />
        <h2 className="text-2xl font-bold">{userInfo?.userName}</h2>
      </div>
      <div className="w-full mt-36">
        <button
          className={`py-2 border-2 border-orange-600 px-3 rounded-full mx-2 ${
            activeBtn === "created" ? activeClass : notActiveClass
          }`}
          onClick={() => setActiveBtn("created")}
        >
          Created
        </button>
        <button
          className={`py-2 border-2 border-orange-600 px-3 rounded-full mx-2 ${
            activeBtn === "saved" ? activeClass : notActiveClass
          }`}
          onClick={() => setActiveBtn("saved")}
        >
          Saved
        </button>
        <div className=" mt-10 bg-white m-2 rounded-md shadow-md">
          {activeBtn === "created" ? (
            createdPins.length > 0 ? (
              <MasonryGrid pins={createdPins} />
            ) : (
              <h2 className="text-2xl my-4 py-2">No Pins Yet!</h2>
            )
          ) : savedPins.length > 0 ? (
            <MasonryGrid pins={savedPins} />
          ) : (
            <h2 className="text-2xl my-4 py-2">No Pins Yet!</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
