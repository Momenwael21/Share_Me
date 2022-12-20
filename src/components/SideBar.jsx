import React from "react";
import { Link, NavLink } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import logo from "../assets/logo.png";
import { useSelector } from "react-redux";
import { categories } from "../utils/data";

const SideBar = ({ closeBar }) => {
  const user = useSelector((state) => state.user);

  const ActiveClass =
    "text-black border-r-4 relative z-20 border-black my-3 px-3 flex flex-row items-center justify-start w-full";
  const NotActiveClass =
    "text-gray-600 relative z-20 flex flex-row my-3 px-3 items-center justify-start w-full";

  return (
    <aside className="h-screen flex relative justify-start w-full shadow-md items-start overflow-y-auto flex-col">
      <div className="w-full p-5">
        <img src={logo} className="w-24 sm:w-40" alt="logo" />
      </div>
      <div className="w-full mt-3 flex flex-col">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? ActiveClass : NotActiveClass
          }
          onClick={() => closeBar(false)}
        >
          <AiFillHome className="mr-2" /> Home
        </NavLink>
        <h3 className={NotActiveClass}>Discover Categories</h3>
        {categories.map((category) => {
          return (
            <NavLink
              to={`category/${category.name}`}
              className={({ isActive }) =>
                isActive ? ActiveClass : NotActiveClass
              }
              onClick={() => closeBar(false)}
              key={category.name}
            >
              <img
                className="w-8 h-8 rounded-full mr-2"
                src={category?.image}
                alt="category_photo"
              />
              <h5 className="capitalize">{category?.name}</h5>
            </NavLink>
          );
        })}
        <Link to={`/user-profile/${user?._id}`} onClick={() => closeBar(false)}>
          <div className="flex flex-row justify-center bg-white py-2 w-full items-center">
            <img
              src={user?.image}
              className="w-8 rounded-md mt-1"
              alt="profile_photo"
            />
            <h3 className="text-lg ml-3">{user?.userName}</h3>
          </div>
        </Link>
      </div>
    </aside>
  );
};

export default SideBar;
