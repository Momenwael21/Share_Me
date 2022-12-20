import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearched } from "../rtk/slices/searchSlice";
import MasonryGrid from "./MasonryGrid";
import Spinner from "./Spinner";

const Search = ({ searchItem }) => {
  console.log(searchItem);
  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search);

  useEffect(() => {
    dispatch(fetchSearched(searchItem));
  }, [dispatch, searchItem]);

  return searchResult === "wait" ? (
    <Spinner message={"Search For Pins..."} />
  ) : searchResult?.length !== 0 ? (
    <MasonryGrid pins={searchResult} />
  ) : (
    <h1 className="sm:text-2xl mt-4">
      No Results For "{searchItem}" try another words
    </h1>
  );
};

export default Search;
