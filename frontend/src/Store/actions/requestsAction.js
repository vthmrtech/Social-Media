import { createAsyncThunk } from "@reduxjs/toolkit";
import { deleteData, getApiResource, postApiData } from "../utils/axiosClient";
import toast from "react-hot-toast";


export const getfollowers = createAsyncThunk(
  "requests/getfollowers",
  async (arg, thunkAPI) => {
    try {
      const response = await getApiResource("/requests/allFollowers");
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't get Followers");
      console.error("Can't get Followers", error);
      throw error;
    }
  }
)
export const getfollowing = createAsyncThunk(
  "requests/getfollowing",
  async (arg, thunkAPI) => {
    try {
      const response = await getApiResource("/requests/allFollowings");
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't get following");
      console.error("Can't get following", error);
      throw error;
    }
  }
)

export const sendRequests = createAsyncThunk(
  "requests/sendRequests",
  async (arg, thunkAPI) => {
    try {
      const response = await postApiData("/requests/sentRequest", arg);
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't send Requests");
      console.error("Can't send Requests", error);
      throw error;
    }
  }
)

export const getRequests = createAsyncThunk(
  "requests/getRequests",
  async (arg, thunkAPI) => {
    try {
      const response = await getApiResource("/requests/getRequests");
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't get Requests");
      console.error("Can't get Requests", error);
      throw error;
    }
  })


export const pendingRequests = createAsyncThunk(
  "requests/pendingRequests",
  async (arg, thunkAPI) => {
    try {
      const response = await getApiResource("/requests/pendingRequests");
      if (response.success) {
        return response.data;
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Can't get Requests");
      console.error("Can't get Requests", error);
      throw error;
    }
  })

  export const blockList = createAsyncThunk(
    "requests/blockList",
    async (arg, thunkAPI) => {
      try {
        const response = await getApiResource("/requests/blockList");
        if (response.success) {
          return response.data;
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Can't block List");
        console.error("Can't block List", error);
        throw error;
      }
    }
  )

  export const  acceptRequest = createAsyncThunk(
    "requests/acceptRequest",
    async (arg, thunkAPI) => {
      try {
        const response = await postApiData("/requests/accepted", arg);
        if (response.success) {
          return response.data;
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Can't accept Request");
        console.error("Can't accept Request", error);
        throw error;
      }
    }
  )

  export const declineRequest = createAsyncThunk(
    "requests/deleteRequests",
    async (arg, thunkAPI) => {
      try {
        const response = await deleteData("/requests/deleteRequest", arg);
        if (response.success) {
          return response.data;
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Can't decline Request");
        console.error("Can't decline Request", error);
        throw error;
      }
    }
  )
  export const unFollow = createAsyncThunk(
    "requests/unFollow",
    async (arg, thunkAPI) => {
      try {
        const response = await deleteData("/requests/unFollow", arg);
        if (response.success) {
          return response.data;
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Can't decline Request");
        console.error("Can't decline Request", error);
        throw error;
      }
    }
  )
  export const removeFollow = createAsyncThunk(
    "requests/removeFollow",
    async (arg, thunkAPI) => {
      try {
        const response = await deleteData("/requests/removeFollower", arg);
        if (response.success) {
          return response.data;
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error("Can't decline Request");
        console.error("Can't decline Request", error);
        throw error;
      }
    }
  )