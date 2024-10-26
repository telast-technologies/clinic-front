import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  isLoading: false,
  data: {},
  errors: [],
};

export const getStatistics = createAsyncThunk(
  "statistics/getStatistics",
  async (args, thunkApi) => {
    try {
      const { filter = JSON.stringify({}) } = args;
      const { data } = await axios.get(`/api/get_statistics?filter=${filter}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: thunkApi.getState().auth.token,
        },
      });
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      return thunkApi.rejectWithValue(
        errors.response.status !== 400
          ? { errors: [{ msg: "something went wrong" }] }
          : errors.response.data
      );
    }
  }
);

const statisticsSlice = createSlice({
  name: "statistics",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getStatistics.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.errors = [];
      })
      .addCase(getStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.data = {};
        state.errors = action.payload.errors;
      });
  },
});

export default statisticsSlice.reducer;
