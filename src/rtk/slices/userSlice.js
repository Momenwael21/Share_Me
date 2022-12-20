import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../client";
import { userQuery } from "../../utils/data";

export const fetchUser = createAsyncThunk("userSlice/fetchUser", async () => {
  const userInfo =
    localStorage.getItem("user") !== "undefined"
      ? JSON.parse(localStorage.getItem("user"))
      : localStorage.clear();

  const query = userQuery(userInfo?.googleId);
  const data = await client.fetch(query);
  return data[0];
});

export const userSlice = createSlice({
  initialState: {},
  name: "userSlice",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export default userSlice.reducer;
