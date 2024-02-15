import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import profile from "../Assets/img/profile.jpg"
import { HOC } from './Hoc'
import { getBlocklist, unblockUser } from '../Store/actions/requestsAction'
import { getAllUsers } from '../Store/actions/userActions'


const BlockList = () => {
    const users = useSelector((state) => state.users.allUsers)
    const blockedUsers = useSelector((state) => state.requests.blockedUser).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
    const loginUser = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    
    useEffect( () => {
        getInfo()
    },[])
    
    const getInfo = () =>{
        dispatch(getAllUsers()) 
        dispatch(getBlocklist())
    }
    
    const blocked = () => {
        const followerBlocked = blockedUsers?.map((x) => x.receiverId).flatMap((x) => users.filter((a) => a.UserId == x && a.UserId !== loginUser.UserId))
        const followingBlocked = blockedUsers?.map((x) => x.senderId).flatMap((x) => users.filter((a) => a.UserId == x && a.UserId !== loginUser.UserId))
        const blocklist = [...followerBlocked,...followingBlocked]
        return [...new Set(blocklist)]
    }
    const unblock = async (x) => {
        
        const response = await dispatch(unblockUser(x.UserId))

        if(response.meta.requestStatus == "fulfilled"){
            getInfo()
        }
    }


    return (
        <>
            <Container>
                <Typography variant='h4' className='fw-bold'>Block List</Typography>
                {
                   blocked().length === 0
                        ?
                        <Typography variant='h6' className='fw-bold my-3 text-center'>No Blocked Users</Typography>
                        :
                        <>
                            {
                                blocked().map((x) => {
                                    return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={x.profileImg ?  `http://localhost:4000/image/uploads/profile/${x.profileImg}` :  profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
                                            <Typography variant='h6' className='fw-bold'>{x.username}</Typography>
                                        </div>

                                        <div className='text-center d-flex align-item-center gap-2'>
                                            <Button variant='outlined' color='error' onClick={() => unblock(x)}>UnBlock</Button>
                                        </div>

                                    </Box>
                                })
                            }

                        </>
                }

            </Container>
        </>
    )
}

export default HOC(BlockList)