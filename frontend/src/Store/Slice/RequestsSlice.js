import { createSlice } from "@reduxjs/toolkit";
import { acceptRequest, blockList, blockUser, declineRequest, getBlocklist, getRequests, getfollowers, getfollowing, pendingRequests, removeFollow, sendRequests, unFollow, unblockUser } from "../actions/requestsAction";

const Requests = createSlice({
        name: "requests",
        initialState: {
            isLoading: false,
            following: [],
            followers: [],
            requests :[],
            sentRequest :[],
            blockedUser :[]
        },
        reducers: {},
        extraReducers: (builder) => {
            builder
             .addCase(getfollowers.pending, (state) => {
                    state.isLoading = true;
                })
             .addCase(getfollowers.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.followers = action.payload;      
                })
             .addCase(getfollowers.rejected, (state) => {
                    state.isLoading = false;
                })
             .addCase(getfollowing.pending, (state) => {
                    state.isLoading = true;
                })
             .addCase(getfollowing.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.following = action.payload;      
                })
             .addCase(getfollowing.rejected, (state) => {
                    state.isLoading = false;
                })
            .addCase(getRequests.pending, (state) => {
                    state.isLoading = true;
                })
            .addCase(getRequests.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.requests = action.payload;
            })
            .addCase(getRequests.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(pendingRequests.pending, (state, action) =>{
                state.isLoading = true;

            })
            .addCase(pendingRequests.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.sentRequest = action.payload
            })
            .addCase(pendingRequests.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(blockList.pending, (state, action) =>{
                state.isLoading = true;

            })
            .addCase(blockList.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.blockedUser = action.payload
            })
            .addCase(blockList.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(sendRequests.pending, (state, action) =>{
                state.isLoading = true;

            })
            .addCase(sendRequests.fulfilled, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(sendRequests.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(acceptRequest.pending, (state, action) =>{
                state.isLoading = true;

            })
            .addCase(acceptRequest.fulfilled, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(acceptRequest.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(declineRequest.pending, (state, action) =>{
                state.isLoading = true;

            })
            .addCase(declineRequest.fulfilled, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(declineRequest.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(unFollow.pending, (state, action) =>{
                state.isLoading = true;
            })
            .addCase(unFollow.fulfilled, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(unFollow.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(removeFollow.pending, (state, action) =>{
                state.isLoading = true;

            })
            .addCase(removeFollow.fulfilled, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(removeFollow.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(blockUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(blockUser.fulfilled, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(blockUser.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(unblockUser.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(unblockUser.fulfilled, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(unblockUser.rejected, (state, action) =>{
                state.isLoading = false;
            })
            .addCase(getBlocklist.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getBlocklist.fulfilled, (state, action) =>{
                state.isLoading = false;
                state.blockedUser = action.payload
            })
            .addCase(getBlocklist.rejected, (state, action) =>{
                state.isLoading = false;
            })
            
            
        },
    });
    export { Requests };
