import { createSlice } from "@reduxjs/toolkit";
import uuid4 from "uuid4";
import { addPosts, getUserPosts, likeDislike } from "../actions/postAction";

const UsersPost = createSlice({
  name: "posts",
  initialState: {
    isLoading: false,
    data: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getUserPosts.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(likeDislike.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(likeDislike.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(likeDislike.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addPosts.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});
export { UsersPost };
