import { createSlice } from "@reduxjs/toolkit";
import {  loginAccount, signup } from "../actions/useractions";

const Users = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    data: null,
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
      })
      .addCase(loginAccount.rejected, (state) => {
        state.isLoading = false;
      });
  },
});


export { Users };
