import { createSlice } from "@reduxjs/toolkit";

const loginUser = createSlice({
    name: "loginUser",
    initialState: {},
    reducers: {
        
        updateUser(state, action) {
            state  = {
                ...state,
                ...action.payload
            }
        },

        loginData(state,action){
            state = {...action.payload}
            
        }

    }
    
})



export const { updateUser,loginData} = loginUser.actions

export {loginUser}

