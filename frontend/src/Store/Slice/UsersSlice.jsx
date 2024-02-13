import { createSlice } from "@reduxjs/toolkit";
import {
  loginAccount,
  logoutAccount,
  signup,
  updateAccount,
} from "../actions/useractions";

const Users = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    data: JSON.parse(localStorage.getItem('user')) || {},
    isLogin: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isLogin = true;
        localStorage.setItem("isLogin", true);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(signup.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(loginAccount.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginAccount.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        state.isLogin = true;
        localStorage.setItem("isLogin", true);
        localStorage.setItem("user", JSON.stringify(action.payload));
      })
      .addCase(loginAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateAccount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateAccount.fulfilled, (state, action) => {
        state.data = action.payload;
        state.isLoading = false;
        localStorage.setItem("user", JSON.stringify(action.payload))
      })
      .addCase(updateAccount.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutAccount.fulfilled, (state) => {
        state.isLoading = false;
          state.data = null;
          state.isLogin = false;
        window.location.href = "/login";
      });
  },
});

export { Users };
