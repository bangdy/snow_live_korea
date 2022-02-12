import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc } from "help/firestore";

export const getProfileThunk = createAsyncThunk("GET_USER_DOC", async (uid) => {
  const response = await getDoc("users", uid);
  return response.profile;
});

export const user = createSlice({
  name: "user",
  initialState: {
    uid: null,
    name: null,
    profile: null,
  },
  reducers: {
    setUid: (state, { payload }) => {
      state.uid = payload.uid;
      state.name = payload.displayName;
    },
    logout: (state) => {
      state.uid = null;
      state.name = null;
      state.profile = null;
    },
  },
  extraReducers: {
    [getProfileThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload ?? null;
    },
  },
});

export const { setUid, logout } = user.actions;
