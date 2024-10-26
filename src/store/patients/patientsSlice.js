import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { axiosApi } from "../../Config/axiosConfig";

const initialState = {
  isLoading: false,
  data: {},
  user: null,
  errors: [],
};

// Thunks
export const getPatients = createAsyncThunk(
  "patients/getPatients",
  async (args, thunkApi) => {
    try {
      const { page, size = 10, query, filter = JSON.stringify({}) } = args;
      const { data } = await axiosApi.get(
        `v1/patients/patient/?page=${page}&size=${size}&query=${query}&filter=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.status !== 400
          ? { errors: [{ msg: "Something went wrong" }] }
          : error.response.data
      );
    }
  }
);

export const createPatient = createAsyncThunk(
  "patients/createPatient",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosApi.post("v1/patients/patient", args, {
        headers: {
          "Content-Type": "application/json",
          Authorization: thunkApi.getState().auth.token,
        },
      });
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.status !== 400
          ? { errors: [{ msg: "Something went wrong" }] }
          : error.response.data
      );
    }
  }
);

export const updatePatient = createAsyncThunk(
  "patients/updatePatient",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosApi.patch(
        `v1/patients/patient//${args.id}`,
        args,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(
        error.response?.status !== 400
          ? { errors: [{ msg: "Something went wrong" }] }
          : error.response.data
      );
    }
  }
);

// Slice
const patientsSlice = createSlice({
  name: "patients",
  initialState,
  extraReducers: (builder) => {
    builder
      // Get patients
      .addCase(getPatients.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getPatients.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.errors = [];
      })
      .addCase(getPatients.rejected, (state, action) => {
        state.isLoading = false;
        state.data = {};
        state.errors = action.payload.errors || [];
      })

      // Create user
      .addCase(createPatient.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(createPatient.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.itemsCount = (state.data.itemsCount || 0) + 1;
        if (state.data?.data?.length < 10) {
          state.data.data = [...(state.data.data || []), action.payload.data];
        }
        state.errors = [];
      })
      .addCase(createPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors || [];
      })

      // Update user
      .addCase(updatePatient.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.data.data?.findIndex(
          (el) => el._id === action.payload.data._id
        );
        if (index !== -1) {
          state.data.data[index] = action.payload.data;
        }
        state.errors = [];
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors || [];
      });
  },
});

export default patientsSlice.reducer;
