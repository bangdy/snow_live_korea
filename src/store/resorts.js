import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDocs } from "help/firestore";

export const getAllDocsThunk = createAsyncThunk("GET_ALL_RESORTS", async () => {
  const response = await getAllDocs("resorts");
  return response;
});

export const resorts = createSlice({
  name: "resorts",
  initialState: {
    collection: [],
  },
  reducers: {},
  extraReducers: {
    [getAllDocsThunk.fulfilled]: (state, { payload }) => {
      state.collection = payload;
    },
  },
});
