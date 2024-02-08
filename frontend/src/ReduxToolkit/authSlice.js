import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL, api, setAuthHeader } from "../Api/api";

export const login = createAsyncThunk("auth/login", async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signin`, userData)
    localStorage.setItem("jwt", data.jwt)
    console.log("Login--- ", data)
    return data;
  } catch (error) {
    console.log("Login--- ", error)
    throw Error(error.response.data.error)
  }
})


export const register = createAsyncThunk("auth/register", async (userData) => {
  try {
    const { data } = await axios.post(`${BASE_URL}/auth/signup`, userData)
    localStorage.setItem("jwt", data.jwt)
    console.log("Register--- ", data)
    return data;
  } catch (error) {
    console.log("Register--- ", error)
    throw Error(error.response.data.error)
  }
})


export const logout = createAsyncThunk("auth/logout", async (userData) => {
  try {
    localStorage.clear()
  } catch (error) {
    console.log("Logout--- ", error)
    throw Error(error.response.data.error)
  }
})

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
  setAuthHeader(jwt, api)
  try {
    const { data } = await api.get(`/api/users/profile`)
    console.log("getUserProfile--- ", data)
    return data;
  } catch (error) {
    console.log("Get user profile--- ", error)
    throw Error(error.response.data.error)
  }
})


export const getAllUsers = createAsyncThunk("auth/getAllUsers", async (jwt) => {
  setAuthHeader(jwt, api)
  try {
    const { data } = await api.get(`/api/users`)
    console.log("getAllUsers--- ", data)
    return data;
  } catch (error) {
    console.log("get all users--- ", error)
    throw Error(error.response.data.error)
  }
})


const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loggedIn: false,
    loading: false,
    error: null,
    jwt: null,
    users: []
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.loggedIn = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loggedIn = false;
        state.loading = false;
        state.error = null;
        state.jwt = null;
        state.users = [];
      });
  },
});

export default authSlice.reducer