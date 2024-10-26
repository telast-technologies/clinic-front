import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state
const initialState = {
  isLoading: false,
  data: {
    activities: [],
    activitiesList: [],
    marketers: [],
    products: [],
    rates: [],
    adminStatistics: [],
  },
  errors: [],
};

// Thunks
export const getStatisticsMarketers = createAsyncThunk(
  "reports/marketers",
  async (args, thunkApi) => {
    const { filter = {} } = args;
    try {
      const { data } = await axios.get(
        `/api/statistics_marketers?filter=${JSON.stringify(filter)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.status !== 400
          ? { errors: [{ msg: "Something went wrong" }] }
          : error.response.data
      );
    }
  }
);

export const getProductStatistics = createAsyncThunk(
  "reports/products",
  async (_, thunkApi) => {
    try {
      const { data } = await axios.get(`/api/statistics_products`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: thunkApi.getState().auth.token,
        },
      });
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.status !== 400
          ? { errors: [{ msg: "Something went wrong" }] }
          : error.response.data
      );
    }
  }
);

export const getProductRates = createAsyncThunk(
  "reports/rates",
  async (args, thunkApi) => {
    try {
      const { filter = {}, page = 1, size = 20 } = args;

      const { data } = await axios.get(
        `/api/rates_products?filter=${JSON.stringify(
          filter
        )}&page=${page}&size=${size}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.status !== 400
          ? { errors: [{ msg: "Something went wrong" }] }
          : error.response.data
      );
    }
  }
);
export const getActivitiesCountByUser = createAsyncThunk(
  "reports/admins_activities",
  async (args, thunkApi) => {
    try {
      const { filter = {}, page = 1 } = args;

      const { data } = await axios.get(
        `/api/admins_activities?filter=${JSON.stringify(filter)}&page=${page}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.status !== 400
          ? { errors: [{ msg: "Something went wrong" }] }
          : error.response.data
      );
    }
  }
);
export const getAdminStatistics = createAsyncThunk(
  "reports/admins_statistics",
  async (args, thunkApi) => {
    try {
      const { filter = {} } = args;

      const { data } = await axios.get(
        `/api/admins_statistics?filter=${JSON.stringify(filter)}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.status !== 400
          ? { errors: [{ msg: "Something went wrong" }] }
          : error.response.data
      );
    }
  }
);

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    clearActivities(state) {
      state.data.activities = [];
      state.data.activitiesList = [];
      state.errors = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle getStatisticsMarketers
      .addCase(getStatisticsMarketers.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getStatisticsMarketers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.marketers = action.payload;
        state.errors = [];
      })
      .addCase(getStatisticsMarketers.rejected, (state, action) => {
        state.isLoading = false;
        state.data.marketers = [];
        state.errors = action.payload.errors;
      })

      // Handle getProductStatistics
      .addCase(getProductStatistics.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getProductStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.products = action.payload;
        state.errors = [];
      })
      .addCase(getProductStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.data.products = [];
        state.errors = action.payload.errors;
      })

      // Handle getProductRates
      .addCase(getProductRates.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getProductRates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.rates = action.payload;
        state.errors = [];
      })
      .addCase(getProductRates.rejected, (state, action) => {
        state.isLoading = false;
        state.data.rates = [];
        state.errors = action.payload.errors;
      })
      // Handle getActivitiesCountByUser
      .addCase(getActivitiesCountByUser.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getActivitiesCountByUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.activities = action.payload.data;
        state.data.activities.itemsCount = action.payload.itemsCount;
        state.data.activitiesList = action.payload.activities;
        state.errors = [];
      })
      .addCase(getActivitiesCountByUser.rejected, (state, action) => {
        state.isLoading = false;
        state.data.rates = [];
        state.errors = action.payload.errors;
      })
      // Handle getAdminStatistics
      .addCase(getAdminStatistics.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getAdminStatistics.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.adminStatistics = action.payload.data;

        state.errors = [];
      })
      .addCase(getAdminStatistics.rejected, (state, action) => {
        state.isLoading = false;
        state.data.rates = [];
        state.errors = action.payload.errors;
      });
  },
});
export const { clearActivities } = reportsSlice.actions;

export default reportsSlice.reducer;
