import { configureStore } from "@reduxjs/toolkit";
import { Users } from "./Slice/UsersSlice";
import { UsersPost } from "./Slice/PostsSlice";
import { Requests } from "./Slice/RequestsSlice";

const store = configureStore({
    reducer:{
        users : Users.reducer,
        posts : UsersPost.reducer,
        requests : Requests.reducer
    }
    
})

export default store;
