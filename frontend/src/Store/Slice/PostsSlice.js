import { createSlice } from "@reduxjs/toolkit";
import { addComment, addPosts, deleteComment, deletePosts, getFollowingPosts, getUserPosts, likeDislike } from "../actions/postAction";

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
      .addCase(addPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addPosts.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(addPosts.rejected, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deletePosts.pending, (state, action) =>{
        state.isLoading = true;
      })
      .addCase(deletePosts.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deletePosts.rejected, (state, action) =>{
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
      .addCase(addComment.pending, (state) =>{
        state.isLoading = true;
      })
      .addCase(addComment.fulfilled, (state) =>{
        state.isLoading = false;
      })
      .addCase(addComment.rejected, (state, action) =>{
        state.isLoading = false;
      })
      .addCase(deleteComment.pending, (state) =>{
        state.isLoading = true;
      })
      .addCase(deleteComment.fulfilled, (state) =>{
        state.isLoading = false;
      })
      .addCase(deleteComment.rejected, (state, action) =>{
        state.isLoading = false;
      })
      .addCase(getFollowingPosts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFollowingPosts.fulfilled, (state,action) =>{
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(getFollowingPosts.rejected, (state, action) => {
        state.isLoading = false;
      })
  },
});
export { UsersPost };
