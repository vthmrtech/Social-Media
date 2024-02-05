import { createSlice } from "@reduxjs/toolkit";
import uuid4 from "uuid4";

const Users = createSlice({
    name: "users",
    initialState: JSON.parse(localStorage.getItem("users")) || [],
    reducers: {
        addUser(state, action) {
            let data = {
                ...action.payload,
                
            }
            state.push(data);
            localStorage.setItem("users", JSON.stringify(state))
        },

        editUser(state, action) {
            console.log(action.payload)
            
            let data = {
                ...state.find((x) => x.UserId == action.payload.UserId),
                ...action.payload,
            }
            state.splice(state.findIndex((x) => x.UserId == action.payload.UserId), 1, data)
            localStorage.setItem("users", JSON.stringify(state))
        }
        
    }
})



export const { addUser, editUser } = Users.actions

export {Users}

