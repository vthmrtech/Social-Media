import { createSlice } from "@reduxjs/toolkit"

const following = createSlice({
    name: "following",
    initialState: JSON.parse(localStorage.getItem("follow")) || [],
    reducers: {
        addRequests(state, action) {
            const data = {
                ...action.payload,
                status: 'requested'
            }
            if (!state.includes(data)) {
                state.push(data);
            }



            localStorage.setItem("follow", JSON.stringify(state))

        },

        addfollowing(state, action) {
            const data = {
                ...action.payload,
                status: 'accepted'
            }
            state.splice(state.findIndex((x) => x.senderId == data.senderId && x.reciverId == data.reciverId), 1, data)

            localStorage.setItem("follow", JSON.stringify(state))


        },

        blockList(state, action) {
            const data = {
                ...action.payload,
                status: 'blocked'
            }
            console.log(action.payload)
            state.splice(state.findIndex((x) => x.senderId == action.payload.senderId && x.reciverId == action.payload.reciverId), 1 ,data)
            state.splice(state.findIndex((x) => x.senderId == action.payload.reciverId && x.reciverId == action.payload.senderId), 1)

            localStorage.setItem("follow", JSON.stringify(state))


        },

        declineRequest(state, action) {
            state.splice(state.findIndex((x) => x.senderId == action.payload.senderId && x.reciverId == action.payload.reciverId), 1)

            localStorage.setItem("follow", JSON.stringify(state))
        }

    }

})

export const { addfollowing, addRequests, declineRequest, blockList } = following.actions
export { following }