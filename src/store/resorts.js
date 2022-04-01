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
    images: {},
    colors: {},
  },
  reducers: {
    saveImageUrl: (state, { payload }) => {
      state.images = { ...state.images, [payload.url]: payload.imgUrl };
    },
    updateLikes: (state, { payload }) => {
      const { url, dateString, uid, newArr } = payload;
      const updatedResort = state.collection[url];
      console.log(updatedResort);
      updatedResort["reviews"][dateString][uid]["likes"] = newArr;
      state.collection = { ...state.collection, [url]: updatedResort };
    },
  },
  extraReducers: {
    [getAllDocsThunk.fulfilled]: (state, { payload }) => {
      state.collection = payload;
      const colors = {};
      Object.keys(payload).map((r) => (colors[r] = payload[r].info.color));
      state.colors = colors;
    },
    [getResortDocThunk.fulfilled]: (state, { payload }) => {
      state.collection = { ...state.collection, [payload["resort"]]: payload.response };
    },
  },
});

export const { saveImageUrl, updateLikes } = resorts.actions;
