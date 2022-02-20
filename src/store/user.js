import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc } from "help/firestore";
import { downloadImage } from "help/util";

export const getProfileThunk = createAsyncThunk("GET_USER_DOC", async (uid) => {
  const response = await getDoc("users", uid);
  return response.profile;
});

export const getPictureThunk = createAsyncThunk("GET_PICTURE", async (uid) => {
  const imageUrl = await downloadImage(uid);
  return imageUrl;
});

export const user = createSlice({
  name: "user",
  initialState: {
    uid: null,
    name: null,
    profile: null,
    pictureUrl: null,
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
    updateProfile: (state, { payload }) => {
      state.profile = payload;
    },
    updatePictureUrl: (state, { payload }) => {
      state.pictureUrl = payload;
    },
  },
  extraReducers: {
    [getProfileThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload ?? null;
    },
    [getPictureThunk.fulfilled]: (state, { payload }) => {
      state.pictureUrl = payload ?? null;
    },
  },
});

export const { setUid, logout, updateProfile, updatePictureUrl } = user.actions;
