import React, { useEffect } from "react";
import { useState } from "react";
import { HiMenu } from "react-icons/hi";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../rtk/slices/userSlice";

import { SideBar, UserProfile } from "../components/main";
import Pins from "../container/Pins";
import { fetchFeed } from "../rtk/slices/pinsSlice";

const Home = () => {
  const [toggleState, setToggleState] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("user")) {
      navigate("/login");
    } else {
      dispatch(fetchUser(localStorage.getItem("user")?.googleId));
    }
  }, []);

  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  return (
    <div className="flex flex-col md:flex-row bg-gray-50 h-screen transition-height duration-75 ease-out">
      <div className="hidden md:flex h-screen ">
        <SideBar closeBar={setToggleState} className="" />
      </div>
      <div className="flex flex-row md:hidden justify-start items-start w-full mt-3 relative z-10">
        <div className="w-full p-3 flex flex-row justify-between items-center shadow-md">
          <HiMenu
            size={30}
            className=" mx-4 cursor-pointer transition-height"
            onClick={() => setToggleState(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="user"
              className="w-10 ml-3 rounded-md mt-1"
            />
          </Link>
        </div>
        {toggleState && (
          <div className="fixed top-0 w-3/5 bg-white flex overflow-y-auto h-screen animate-slide-in">
            <div className="absolute w-full z-40 flex justify-end items-center p-5">
              <AiOutlineClose
                className="cursor-pointer"
                size={30}
                onClick={() => setToggleState(false)}
              />
            </div>
            <SideBar closeBar={setToggleState} className=" relative z-10" />
          </div>
        )}
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-auto">
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins />} />
        </Routes>
      </div>
    </div>
  );
};

export default Home;
