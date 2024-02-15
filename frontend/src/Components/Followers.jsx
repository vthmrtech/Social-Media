import { Button, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import profile from "../Assets/img/profile.jpg"
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getfollowers, sendRequests, pendingRequests, removeFollow, blockUser, getfollowing } from '../Store/actions/requestsAction'
import { getAllUsers } from '../Store/actions/userActions'

const Followers = () => {
    const users = useSelector((state) => state.users.allUsers)
    const allFollow = useSelector((state) => state.requests.followers).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
    const [followerObj, setfollowerObj] = useState({})
    const dispatch = useDispatch()
    const [loginUser, setloginUser] = useState(JSON.parse(localStorage.getItem("user")))
    const sendRequest = useSelector((state) => state.requests.sentRequest)

    const allfollowings = useSelector((state) => state.requests.following)



    const followers = () => {
        return allFollow?.map((y) => y.senderId).flatMap((z) => users.filter((a) => a.UserId == z))
    }
    
    const getInfo = () => {
        dispatch(getfollowers())
        dispatch(getfollowing())
        dispatch(getAllUsers())
        dispatch(pendingRequests())

    }

    useEffect(() => {
        getInfo()
    }, [])
    
    const unfollow = (x) => {
        followerObj['reciverId'] = x.UserId
        followerObj['senderId'] = loginUser
        setfollowerObj({ ...followerObj })
        // dispatch(declineRequest(followerObj))
        
    }
    
    const request = async (x) => {
        followerObj['sendTo'] = x.target.value
        setfollowerObj({ ...followerObj })
        const response  = await dispatch(sendRequests(followerObj))
        if(response.meta.requestStatus  === "fulfilled"){
            getInfo()
        }


    }
    
    const deleteRequest = (x) => {
        followerObj['senderId'] = loginUser
        followerObj['reciverId'] = 
        setfollowerObj({ ...followerObj })
        // dispatch(declineRequest(followerObj))
        
    }

    const block =  async (x) => {
        const response  = await dispatch(blockUser(x.UserId))
        if(response.meta.requestStatus === "fulfilled"){
            getInfo()
        }
    }
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const ITEM_HEIGHT = 48;
    
        const removeFollower = async (x) => {
            const response  = await dispatch(removeFollow(x.UserId))
            if(response.meta.requestStatus === "fulfilled"){
                getInfo()
            }
    
        }
    

    return (
        <Container>
            <Typography variant='h5' className='fw-bold'>Followers</Typography>
            {
                followers()?.length === 0
                    ?
                    <Typography variant='h6' className='fw-bold my-3 text-center'>No followers</Typography>
                    :
                    <>
                        {
                            followers()?.map((x) => {
                                
                                return <>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={x.profileImg ? `http://localhost:4000/image/uploads/profile/${x.profileImg}`  : profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
                                            <Typography variant='h6' className='fw-bold'>{x.username}</Typography>
                                        </div>
                                        <div>
                                            {
                                                allfollowings.find(a => a.receiverId == x.UserId)
                                                    ?
                                                    <></>
                                                    :
                                                    <>
                                                        {
                                                            sendRequest.find(a => a.receiverId == x.UserId)
                                                                ?
                                                                <Button variant='outlined' color='error' onClick={() => deleteRequest(x)}>Cancel Request</Button>

                                                                :
                                                                <button onClick={request} className='btn btn-primary' value={x.UserId}>Follow Back</button>


                                                        }
                                                        
                                                    </>

                                            }
                                            
                                            <Button variant='outlined' color='error' sx={{ml:1}} onClick={() => removeFollower(x)}>Remove</Button>
                                            <div className='d-inline-block'>
                                                <IconButton
                                                    aria-label="more"
                                                    id="long-button"
                                                    aria-controls={open ? 'long-menu' : undefined}
                                                    aria-expanded={open ? 'true' : undefined}
                                                    aria-haspopup="true"
                                                    onClick={handleClick}
                                                >
                                                    <MoreVertIcon />
                                                </IconButton>
                                                <Menu
                                                    id="long-menu"
                                                    MenuListProps={{
                                                        'aria-labelledby': 'long-button',
                                                    }}
                                                    anchorEl={anchorEl}
                                                    open={open}
                                                    onClose={handleClose}
                                                    PaperProps={{
                                                        style: {
                                                            maxHeight: ITEM_HEIGHT * 4.5,
                                                            width: '16ch',
                                                        },
                                                    }}
                                                >

                                                    <MenuItem    onClick={handleClose}>
                                                        <Button  color='error' onClick={() => block(x)}>Block User</Button>
                                                    </MenuItem>

                                                </Menu>
                                            </div>

                                        </div>

                                    </Box>
                                </>
                            })
                            
                        }
                        
                    </>
            }
            
        </Container>
    )
}

export default Followers