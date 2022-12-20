import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client, urlFor } from "../../client";
import { feedQuery } from "../../utils/data";

export const fetchFeed = createAsyncThunk("pinsSlice/fetchFeed", async () => {
  const query = feedQuery();
  const pins = await client.fetch(query);
  return pins;
});

export const pinsSlice = createSlice({
  initialState: [],
  name: "pinsSlice",
  reducers: {
    addNew: (state, action) => {
      const newPin = {
        ...action.payload,
        image: {
          asset: { url: urlFor(action.payload?.image?.asset?._ref).url() },
        },
      };
      state.push(newPin);
    },
    updatePins: (state, action) => {
      const newPin = {
        ...action.payload,
        image: {
          asset: { url: urlFor(action.payload?.image?.asset?._ref).url() },
        },
      };
      const newPins = state.map((pin) => {
        return pin?._id === newPin?._id ? newPin : pin;
      });
      console.log(newPins);
      return newPins;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFeed.pending, (state, action) => {
      state.push("wait");
    });
    builder.addCase(fetchFeed.fulfilled, (state, action) => {
      if (state.includes("wait")) {
        return state.filter((pin) => pin !== "wait");
      }
      if (state.length === 0) {
        return action.payload;
      }

      const newPins = action.payload
        .filter((pin) => {
          return (
            [pin] ===
            state.filter((oldPin) => {
              return oldPin?._id !== pin?._id;
            })
          );
        })
        .flat();
      return [...state, ...newPins];
    });
  },
});
export default pinsSlice.reducer;
export const { updatePins, addNew } = pinsSlice.actions;
