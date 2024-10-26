import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  isLoading: false,
  data: {},
  errors: [],
};

export const getNotifications = createAsyncThunk(
  "notifications/getNotifications",
  async (args, thunkApi) => {
    try {
      const { page, size = 10, query, filter = JSON.stringify({}) } = args;
      const { data } = await axios.get(
        `/api/get_notifications?page=${page}&size=${size}&query=${query}&filter=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
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

export const updateNotification = createAsyncThunk(
  "notifications/updateNotification",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(
        `/api/update_notification/${args._id}`,
        args,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
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

export const updateNotifications = createAsyncThunk(
  "notifications/updateNotifications",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(
        "/api/update_notifications",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
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

const notificationsSlice = createSlice({
  name: "notifications",
  initialState,
  extraReducers: (builder) => {
    builder
      // get notifications
      .addCase(getNotifications.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.errors = [];
      })
      .addCase(getNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.data = {};
        state.errors = action.payload.errors;
      })

      // update notification
      .addCase(updateNotification.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(updateNotification.fulfilled, (state, action) => {
        state.isLoading = false;
        const indexAt = state.data.data?.findIndex(
          (el) => el._id === action.payload.data._id
        );
        if (indexAt !== -1) {
          state.data.data[indexAt] = action.payload.data;
        }
        state.errors = [];
      })
      .addCase(updateNotification.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
      })

      // update notifications
      .addCase(updateNotifications.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(updateNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errors = [];
      })
      .addCase(updateNotifications.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
      });
  },
});

export default notificationsSlice.reducer;
