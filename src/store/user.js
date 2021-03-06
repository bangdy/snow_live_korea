import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getDoc } from "help/firestore";
import { downloadImage } from "help/util";

export const getProfileThunk = createAsyncThunk("GET_PROFILE", async (uid) => {
  const response = await getDoc("users", uid);
  return response?.profile;
});

export const getPictureThunk = createAsyncThunk("GET_PICTURE", async (uid) => {
  const imageUrl = await downloadImage("profile", uid);
  return imageUrl;
});

export const user = createSlice({
  name: "user",
  initialState: {
    uid: null,
    name: null,
    profile: null,
    pictureUrl: null,
    isMobile: false,
    loading: false,
  },
  reducers: {
    setUid: (state, { payload }) => {
      state.uid = payload.uid;
      state.name = payload.displayName;
    },
    logout: (state) => {
      state.uid = false;
      state.name = null;
      state.profile = null;
      state.pictureUrl = null;
    },
    updateProfile: (state, { payload }) => {
      state.profile = payload;
    },
    updatePictureUrl: (state, { payload }) => {
      state.pictureUrl = payload;
    },
    setMobile: (state, { payload }) => {
      state.isMobile = payload;
    },
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
  },
  extraReducers: {
    [getProfileThunk.pending]: (state, { payload }) => {
      state.loading = true;
    },
    [getProfileThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload ?? null;
      state.loading = false;
    },
    [getPictureThunk.fulfilled]: (state, { payload }) => {
      state.pictureUrl = payload ?? null;
    },
  },
});

export const { setUid, logout, updateProfile, updatePictureUrl, setMobile, setLoading } =
  user.actions;
