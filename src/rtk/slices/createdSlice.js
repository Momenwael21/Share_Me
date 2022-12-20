import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../client";
import { userCreatedPinsQuery } from "../../utils/data";

export const fetchCreatedSlice = createAsyncThunk(
  "createdSlice/fetchCreatedSlice",
  async (userId) => {
    const query = userCreatedPinsQuery(userId);
    const data = await client.fetch(query);
    return data;
  }
);

const createdSlice = createSlice({
  initialState: [],
  name: "createdSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCreatedSlice.fulfilled, (state, action) => {
      console.log(action.payload);
      return action.payload;
    });
  },
});

export default createdSlice.reducer;
