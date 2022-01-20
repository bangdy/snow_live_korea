import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserDoc } from "help/firestore";

export const getUserDocThunk = createAsyncThunk("GET_USER_DOC", async () => {
  const response = await getUserDoc();
  return response;
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
  },
  extraReducers: {
    [getUserDocThunk.fulfilled]: (state, { payload }) => {
      state.profile = payload ?? null;
    },
  },
});

export const { setUid } = user.actions;
