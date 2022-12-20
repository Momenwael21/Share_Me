import React from "react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

const NavBar = ({ setSearch }) => {
  const user = useSelector((state) => state.user);
  const [searchField, setSearchField] = useState("");
  const navigate = useNavigate();

  const searchHandler = () => {
    return searchField.trim() === "" || searchField == null
      ? false
      : setSearch(searchField);
  };

  return (
    <div className="w-full flex gap-2 items-center justify-between md:gap-5 p-3 shadow-sm bg-white">
      <div className="flex justify-start items-center">
        <AiOutlineSearch fontSize={20} />
        <input
          className="bg-white w-full ml-3 border-b-2 border-b-gray-100 focus:outline-none focus-within:shadow-sm "
          placeholder="Search"
          onFocus={() => navigate("/search")}
          onChange={(e) => setSearchField(e.target.value)}
        />
        <button
          onClick={searchHandler}
          className="bg-mainOrange hover:bg-transparent duration-100 border-2 border-orange-600 hover:text-mainOrange text-white rounded-full ml-3 px-3 py-1"
        >
          Search
        </button>
      </div>
      <div className="justify-center hidden md:flex items-center">
        <Link to={`user-profile/${user?._id}`}>
          <img
            src={user?.image}
            className="w-8 rounded-md mt-1"
            alt="profile_photo"
          />
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
