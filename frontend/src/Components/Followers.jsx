import { Button, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import profile from "../Assets/img/profile.jpg"
import { addRequests, blockList, declineRequest, } from '../Store/Slice/FollowSlice'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const Followers = () => {
    const users = useSelector((state) => state.users)
    const allFollow = useSelector((state) => state.following).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
    const [followerObj, setfollowerObj] = useState({})
    const dispatch = useDispatch()
    const [loginUser, setloginUser] = useState(JSON.parse(localStorage.getItem("loginId")))



    const followers = () => {
        return allFollow?.filter((x) => x.reciverId == loginUser && x.status == "accepted").map((y) => y.senderId).flatMap((z) => users.filter((a) => a.UserId == z))
    }
    

    const unfollow = (x) => {
        followerObj['reciverId'] = x.UserId
        followerObj['senderId'] = loginUser
        setfollowerObj({ ...followerObj })
        dispatch(declineRequest(followerObj))
        
    }
    
    const request = (x) => {
        followerObj['senderId'] = loginUser
        followerObj['reciverId'] = x.target.value
        followerObj['time'] = new Date();
        setfollowerObj({ ...followerObj })
        dispatch(addRequests(followerObj))


    }
    
    const deleteRequest = (x) => {
        followerObj['senderId'] = loginUser
        followerObj['reciverId'] = 
        setfollowerObj({ ...followerObj })
        dispatch(declineRequest(followerObj))
        
    }

    const blockUser = (x) => {
        followerObj['time'] = new Date();
        followerObj['senderId'] = x.UserId
        followerObj['reciverId'] = loginUser
        setfollowerObj({ ...followerObj })
        dispatch(blockList(followerObj))
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
    
    const removeFollower = (x) =>{
        followerObj['senderId'] = x.UserId
        followerObj['reciverId'] = loginUser
        dispatch(declineRequest(followerObj))
    }
    

    return (
        <Container>
            <Typography variant='h5' className='fw-bold'>Followers</Typography>
            {
                followers()?.length === 0
                    ?
                    <Typography variant='h6' className='fw-bold my-3 text-center'>No following</Typography>
                    :
                    <>
                        {
                            followers()?.map((x) => {
                                return <>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={x.profileImg ?? profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
                                            <Typography variant='h6' className='fw-bold'>{x.username}</Typography>
                                        </div>
                                        <div>
                                            {
                                                allFollow.find(a => a.reciverId == x.UserId && a.senderId == loginUser && a.status == "accepted")
                                                    ?
                                                    <Button variant='contained' color='error' onClick={() => unfollow(x)}>UnFollow</Button>
                                                    :
                                                    <>
                                                        {
                                                            allFollow.find(a => a.reciverId == x.UserId && a.senderId == loginUser && a.status == "requested")
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
                                                        <Button variant='outlined' color='error' onClick={() => blockUser(x)}>Block User</Button>
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