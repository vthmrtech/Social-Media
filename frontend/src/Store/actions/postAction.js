import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getApiResource, postApiData } from "../utils/axiosClient";
import toast from "react-hot-toast";

export const getUserPosts = createAsyncThunk(
  "posts/getUserPost",
  async (arg, thinkAPI) => {

    try {
      
      const response = await getApiResource("/posts/getUserPost");
      if (response.success) {
        
        return response.data;
      } else {
        toast.error(response.message);
      }

    } catch (error) {
      toast.error("Can't get User Posts");
      console.error("Can't get User Posts", error);
      throw error;
    }
  }
);

export const addPosts = createAsyncThunk(
  "posts/addPosts",
  async (arg, thinkAPI) => {
    try {
      const response = await postApiData("/posts/addPosts", arg);
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't add Posts");
      console.error("Can't add Posts", error);
      throw error;
    }
  }
)

export const likeDislike = createAsyncThunk(
  "posts/likeDislike",
  async (arg, thinkAPI) => {
    try {
      const response = await postApiData("/posts/likeDislike", arg);
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't like or dislike");
      console.error("Can't like or dislike", error);
      throw error;
    }
  }
);

export const deletePosts = createAsyncThunk(
  "posts/deletePosts",
  async (arg, thinkAPI) => {
    try {
      const response = await deleteData("/posts/deletePosts", arg);
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't delete Posts");
      console.error("Can't delete Posts", error);
      throw error;
    }
  
})

export const addComment = createAsyncThunk(
  "posts/addComment",
  async (arg, thinkAPI) => {
    try {
      const response = await postApiData("/posts/addComment", arg);
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't add Comment");
      console.error("Can't add Comment", error);
      throw error;
    }
  }
)

export const deleteComment = createAsyncThunk(
  "posts/deleteComment",
  async (arg, thinkAPI) => {
    try {
      const response = await postApiData("/posts/deleteComment", arg);
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't delete Comment");
      console.error("Can't delete Comment", error);
      throw error;
    }
  }
)


export const getFollowingPosts = createAsyncThunk(
  "posts/getFollowingPosts",
  async (arg, thinkAPI) => {
    try {
      const response = await getApiResource("/posts/followingPosts");
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }

    } catch (error) {
      toast.error("Can't get Following O Posts");
      console.error("Can't get Following O Posts", error);
      throw error;
    }
  }
)
