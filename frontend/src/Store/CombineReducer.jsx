import { configureStore } from "@reduxjs/toolkit";
import { Users } from "./Slice/UsersSlice";
import { UsersPost } from "./Slice/PostsSlice";
import { following } from "./Slice/FollowSlice";

const store = configureStore({
    reducer:{
        users : Users.reducer,
        posts : UsersPost.reducer,
        following : following.reducer,
    }
    
})

export default store;
