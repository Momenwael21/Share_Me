import { configureStore } from "@reduxjs/toolkit";
import pinsSlice from "./slices/pinsSlice";
import searchSlice from "./slices/searchSlice";
import userProfileSlice from "./slices/userProfileSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    search: searchSlice,
    pins: pinsSlice,
    userProfile: userProfileSlice,
  },
});
