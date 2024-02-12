import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApiData } from "../utils/axiosClient";

export const signup = createAsyncThunk("auth/signup", async (arg, thinkAPI) => {
  try {
    const response = await postApiData("/auth/signup", arg);
    return response.data;
  } catch (error) {
    console.error("Can't  sign up", error.message);
    throw error;
  }
});

export const loginAccount = createAsyncThunk(
  "auth/login",
  async (arg, thinkAPI) => {
    try {
      const response = await postApiData("/auth/login", arg);
      return response.data;
    } catch (error) {
      console.error("Can't login", error);
      throw error;
    }
  }
);

export const updateAccount = createAsyncThunk(
  "auth/update",
  async (arg, thinkAPI) => {
    try {
      const response = await postApiData("/auth/update", arg);
      return response.data;
    } catch (error) {
      console.error("Can't update", error);
      throw error;
    }
  }
);