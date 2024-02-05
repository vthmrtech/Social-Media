import { configureStore } from "@reduxjs/toolkit";
import { Users } from "./Slice/UsersSlice";
import { UsersPost } from "./Slice/PostsSlice";
import { following } from "./Slice/FollowSlice";
import { loginUser } from "./Slice/LoginUserSlice";

const store = configureStore({
    reducer:{
        users : Users.reducer,
        posts : UsersPost.reducer,
        following : following.reducer,
        loginUser : loginUser.reducer,
    }
    
})

export default store;
