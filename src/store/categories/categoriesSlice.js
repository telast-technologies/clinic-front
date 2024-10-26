import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

let initialState = {
  isLoading: false,
  data: {},
  errors: [],
};

export const getCategories = createAsyncThunk(
  "categories/getCategories",
  async (args, thunkApi) => {
    try {
      const { page, size = 10, query, filter = JSON.stringify({}) } = args;
      const { data } = await axios.get(
        `/api/get_categories?page=${page}&size=${size}&query=${query}&filter=${filter}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: thunkApi.getState().auth.token,
          },
        }
      );
      return thunkApi.fulfillWithValue(data);
    } catch (errors) {
      console.log(errors);
      return thunkApi.rejectWithValue(
        errors.response.status !== 400
          ? { errors: [{ msg: "something went wrong" }] }
          : errors.response.data
      );
    }
  }
);

export const createCategory = createAsyncThunk(
  "categories/createCategory",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.post("/api/create_category", args, {
        headers: {
          "Content-Type": "multipart/form-data",
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

export const updateCategory = createAsyncThunk(
  "categories/updateCategory",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.put(
        `/api/update_category/${args.id}`,
        args.values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
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

export const deleteCategory = createAsyncThunk(
  "categories/deleteCategory",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.delete(`/api/delete_category/${args._id}`, {
        headers: {
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

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      // Get Categories
      .addCase(getCategories.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.errors = [];
      })
      .addCase(getCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.data = {};
        state.errors = action.payload.errors;
      })

      // Create Category
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.itemsCount++;
        if (state.data?.data?.length < 10) {
          state.data.data.push(action.payload.data);
        }
        state.errors = [];
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
      })

      // Update Category
      .addCase(updateCategory.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        const indexAt = state.data.data?.findIndex(
          (el) => el._id === action.payload.data._id
        );
        if (indexAt !== -1) {
          state.data.data[indexAt] = action.payload.data;
        }
        state.errors = [];
      })
      .addCase(updateCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
      })

      // Delete Category
      .addCase(deleteCategory.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data.data = state.data.data.filter(
          (el) => el._id !== action.payload.data._id
        );
        state.errors = [];
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
      });
  },
});

export default categoriesSlice.reducer;
