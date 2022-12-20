import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../client";
import { searchQuery } from "../../utils/data";

export const fetchSearched = createAsyncThunk(
  "searchSlice/fetchSearched",
  async (searchItem) => {
    const query = searchQuery(searchItem);
    const data = await client.fetch(query);
    console.log(data);
    return data;
  }
);

export const searchSlice = createSlice({
  initialState: "",
  name: "searchSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSearched.pending, (state, action) => {
      return "wait";
    });
    builder.addCase(fetchSearched.fulfilled, (state, action) => {
      console.log(action.payload);
      return action.payload;
    });
  },
});

export default searchSlice.reducer;
