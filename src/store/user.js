import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    uid: null,
    name: null,
  },
  reducers: {
    setUid: (state, { payload }) => {
      state.uid = payload.uid;
      state.name = payload.displayName;
    },
  },
});

export const { setUid } = user.actions;
