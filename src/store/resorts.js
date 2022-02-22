import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllDocs, getDoc } from "help/firestore";

export const getAllDocsThunk = createAsyncThunk("GET_ALL_RESORTS", async () => {
  const response = await getAllDocs("resorts");
  const responseObj = {};
  response.forEach((i) => (responseObj[i.info.url] = i));
  return responseObj;
});

export const getResortDocThunk = createAsyncThunk("GET_RESORT_DOC", async (resort) => {
  const response = await getDoc("resorts", resort);
  return { response: response, resort: resort };
});

export const resorts = createSlice({
  name: "resorts",
  initialState: {
    collection: {},
  },
  reducers: {},
  extraReducers: {
    [getAllDocsThunk.fulfilled]: (state, { payload }) => {
      state.collection = payload;
    },
    [getResortDocThunk.fulfilled]: (state, { payload }) => {
      console.log(payload["resort"]);
      state.collection = { ...state.collection, [payload["resort"]]: payload.response };
    },
  },
});
