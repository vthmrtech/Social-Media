import { createAsyncThunk } from "@reduxjs/toolkit";
import { getApiResource, postApiData } from "../utils/axiosClient";
import toast from "react-hot-toast";

export const getUserPosts = createAsyncThunk(
  "posts/getUserPost",
  async (arg, thinkAPI) => {
    try {
      const response = await postApiData("/posts/getUserPost", arg);
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
