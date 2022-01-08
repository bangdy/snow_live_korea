import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
  name: "user",
  initialState: {
    kakaoUid: null,
  },
  reducers: {
    setKakaoUid: (state, { payload }) => {
      state.list = payload;
    },
  },
});
