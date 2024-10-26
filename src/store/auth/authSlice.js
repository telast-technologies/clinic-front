import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { axiosApi } from "../../Config/axiosConfig";

let initialState = {
  isLoading: false,
  isAuth: false,
  user: null,
  token: Cookies.get("token") || "",
  errors: [],
};

export const login = createAsyncThunk("auth/login", async (args, thunkApi) => {
  try {
    const { data } = await axiosApi.post("api/login/", args, {
      headers: {
        "Content-Type": "application/json",
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
});

export const register = createAsyncThunk(
  "auth/register",
  async (args, thunkApi) => {
    try {
      const { data } = await axiosApi.post(`/api/register`, args, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return thunkApi.fulfillWithValue(data);
    } catch (error) {
      if (error.response.status >= 404) {
        return thunkApi.rejectWithValue({
          errors: [{ msg: "something went wrong" }],
        });
      }
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);

export const checkAuthentication = createAsyncThunk(
  "auth/checkAuthentication",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.post("/api/check_auth", args, {
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

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.post("/api/reset_password", args, {
        headers: {
          "Content-Type": "application/json",
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

export const changePassword = createAsyncThunk(
  "auth/changePassword",
  async (args, thunkApi) => {
    try {
      const { data } = await axios.post(
        `/api/change_password/${args.token}`,
        args.values,
        {
          headers: {
            "Content-Type": "application/json",
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

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLoading = false;
      state.errors = [];
      state.isAuth = false;
      state.token = "";
      Cookies.remove("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errors = [];
        state.isAuth = true;
        Cookies.set("token", action.payload.token, {
          expires: 1, // 1 day
        });
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
        state.isAuth = false;
        state.token = "";
        state.user = null;
        Cookies.remove("token");
      })
      // register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
        state.errors = [];
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
      })
      // check auth
      .addCase(checkAuthentication.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(checkAuthentication.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errors = [];
        state.isAuth = true;
        state.token = action.payload.token;
        Cookies.set("token", action.payload.token, {
          expires: 1, // 1 day
        });
        state.user = action.payload.user;
      })
      .addCase(checkAuthentication.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
        state.token = "";
        state.isAuth = false;
        Cookies.remove("token");
        state.user = null;
      })
      // reset password
      .addCase(resetPassword.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.isLoading = false;
        state.errors = [];
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
      })
      // change password
      .addCase(changePassword.pending, (state) => {
        state.isLoading = true;
        state.errors = [];
      })
      .addCase(changePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.errors = [];
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errors = action.payload.errors;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
