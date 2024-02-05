import { createSlice } from "@reduxjs/toolkit";
import uuid4 from "uuid4";

const UsersPost = createSlice({
    name: "posts",
    initialState: JSON.parse(localStorage.getItem("posts")) || [],
    reducers: {
        addPost(state, action) {
            let data = {
                ...action.payload,
                postId: uuid4(),
                like:[],
                comments : [],
            }

            state.push(data);

            localStorage.setItem("posts", JSON.stringify(state))
        },

        liked(state,action) {
            let addLike = state.find((x) =>x.UserId == action.payload.UserId && x.postId == action.payload.postId)
            addLike['like'].includes(action.payload.loginId) ? addLike['like'].splice(addLike['like'].findIndex((x) => x == action.payload.loginId) , 1)  :  addLike['like'].push(action.payload.loginId)
            state.splice(state.findIndex((x) =>x.UserId == action.payload.UserId && x.postId == action.payload.postId),1,addLike)
            localStorage.setItem("posts", JSON.stringify(state))
        },

        deletePost(state, action) {
            let deleteData = state.findIndex((x) => x.postId == action.payload)
            state.splice(deleteData, 1)
            localStorage.setItem("posts", JSON.stringify(state))
        },

        addComment(state,action){
            let comment = {
                "commentId": uuid4(),
                "comment" : action.payload.comment,
                "UserId" : action.payload.UserId
            }
            let post = state.find((x) =>x.postId == action.payload.postId)
            post['comments'].push(comment)
            // let addComment = state.find((x) =>x.UserId == action.payload.UserId && x.postId == action.payload.postId)
            state.splice(state.findIndex((x) =>x.postId == action.payload.postId),1,post)
            localStorage.setItem("posts", JSON.stringify(state))

        },
        deleteComments(state,action){
            let post = state.find((x) =>x.postId == action.payload.postId)
            post['comments'].splice(post['comments'].findIndex((x) => x.commentId == action.payload.commentId),1)
            state.splice(state.findIndex((x) =>x.postId == action.payload.postId),1,post)
            localStorage.setItem("posts", JSON.stringify(state))

        }
        
        
    }
})
export const { addPost, deletePost , liked , addComment,deleteComments } = UsersPost.actions
export {UsersPost}