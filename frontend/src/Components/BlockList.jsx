import { Box, Button, Container, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import profile from "../Assets/img/profile.jpg"
import { HOC } from './Hoc'


const BlockList = () => {
    const users = useSelector((state) => state.users)
    const allFollow = useSelector((state) => state.following).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
    const [blockList, setblockList] = useState([])
    const [blockObj, setblockObj] = useState([])
    const [loginUser, setloginUser] = useState(JSON.parse(localStorage.getItem("loginId")))
    const dispatch = useDispatch()
    const unblockUser = () => {
        return allFollow?.filter((x) => x.reciverId == loginUser && x.status == "blocked").map((x) => x.senderId).flatMap((x) => users.filter((a) => a.UserId == x))
    }



    const unblock = (x) => {
        blockObj['senderId'] = x.UserId
        blockObj['reciverId'] = loginUser
        setblockObj({ ...blockObj })
        // dispatch(declineRequest(blockObj))

    }


    return (
        <>
            <Container>
                <Typography variant='h4' className='fw-bold'>Block List</Typography>
                {
                   unblockUser().length === 0
                        ?
                        <Typography variant='h6' className='fw-bold my-3 text-center'>No Blocked Users</Typography>
                        :
                        <>
                            {
                                unblockUser().map((x) => {
                                    return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={x.profileImg ?? profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
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