import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../client";
import { userQuery } from "../../utils/data";

export const fetchUserInfo = createAsyncThunk(
  "userProfileSlice/fetchUserInfo",
  async (userId) => {
    const query = userQuery(userId);
    const data = client.fetch(query);
    return data;
  }
);

const userProfileSlice = createSlice({
  initialState: {},
  name: "userProfileSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUserInfo.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default userProfileSlice.reducer;
