import { createAsyncThunk } from "@reduxjs/toolkit";
import { postApiData } from "../utils/axiosClient";
import toast from "react-hot-toast";

export const signup = createAsyncThunk("auth/signup", async (arg, thinkAPI) => {
  try {
    const response = await postApiData("/auth/signup", arg);
    if (response.success) {
      toast.success("Signup Success");
      localStorage.setItem("token", JSON.stringify(response.token));
      return response.data;
    } else {
      toast.error(response.message);
    }
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
      if (response.success) {
        toast.success("Login Success");
        localStorage.setItem("token", JSON.stringify(response.token));
        return response.user;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("User not Found");
      console.error("Can't login", error);
      throw error;
    }
  }
);

export const updateAccount = createAsyncThunk(
  "auth/update",
  async (arg, thinkAPI) => {
    try {
      console.log('eee')
      const response = await postApiData("/auth/update", arg);
      if(response.success){
        return response.data;
      }
    } catch (error) {
      console.error("Can't update", error);
      throw error;
    }
  }
);

export const logoutAccount = createAsyncThunk(
  "auth/logout",
  async (arg, thinkAPI) => {
    try {
      localStorage.clear();
      return "logout";
    } catch (error) {
      console.error("Can't logout", error);
      throw error;
    }
  }
);
