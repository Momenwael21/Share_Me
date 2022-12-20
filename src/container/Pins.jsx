import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";

import {
  NavBar,
  PinDetails,
  Search,
  Feed,
  CreatePin,
} from "../components/main";
import { useState } from "react";

const Pins = () => {
  const [searchItem, setSearchItem] = useState(null);
  return (
    <div className="h-full">
      <div className="bg-gray-50 -z-10 ">
        <NavBar setSearch={setSearchItem} />
      </div>

      <div className="h-full">
        <Routes>
          <Route path="/" element={<Feed />} />
          <Route path="/category/:categoryId" element={<Feed />} />
          <Route path="/pin-detail/:pinId" element={<PinDetails />} />
          <Route path="/create-pin" element={<CreatePin />} />
          <Route path="/search" element={<Search searchItem={searchItem} />} />
        </Routes>
      </div>
      <div className="absolute bg-mainOrange text-white w-12 h-12 right-10 bottom-10 flex justify-center items-center rounded-full">
        <Link to={"/create-pin"}>
          <IoMdAdd fontSize={30} color="white" />
        </Link>
      </div>
    </div>
  );
};

export default Pins;
