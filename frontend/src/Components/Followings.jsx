import { Button, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import profile from "../Assets/img/profile.jpg"
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getfollowers, pendingRequests } from '../Store/actions/requestsAction'
import { getAllUsers } from '../Store/actions/userActions'


const Followings = () => {
    const users = useSelector((state) => state.users.allUsers)
    const allFollow = useSelector((state) => state.requests.following).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
    console.log(allFollow)
    const [followerObj, setfollowerObj] = useState({})
    const dispatch = useDispatch()
    const [loginUser, setloginUser] = useState(JSON.parse(localStorage.getItem("user")))
    const sendRequest = useSelector((state) => state.requests.sentRequest)

    const allFollowers = useSelector((state) => state.requests.followers)


    
    const followers = () => {
        console.log("followers  allFollow?.map((x) => x.reciverId).flatMap((x) => users.filter((a) => a.UserId == x)):", allFollow?.map((x) => x.receiverId));
        return  allFollow?.map((y) => y.reciverId)
        
    }

    const blockUser = (x) => {
        followerObj['time'] = new Date();
        followerObj['senderId'] = x.UserId
        followerObj['reciverId'] = loginUser
        setfollowerObj({ ...followerObj })
        // dispatch(blockList(followerObj))
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

    const unfollow = () =>{
        console.log('unfollow')
    }

    return (
        <Container>
            <Typography variant='h5' className='fw-bold'>Following List</Typography>
            {
                followers().length === 0
                    ?
                    <Typography variant='h6' className='fw-bold my-3 text-center'>No following</Typography>
                    :
                    <>
                        {
                            followers()?.map((x) => {
                                return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                    <div className='d-flex align-items-center gap-4'>
                                        <img src={x.profileImg ?? profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
                                        <Typography variant='h6' className='fw-bold'>{x.username}</Typography>
                                    </div>
                                    <div className='d-flex'>
                                        <div>
                                            <Button variant='contained' color='error' onClick={() => unfollow(x)}>UnFollow</Button>
                                        </div>
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

                                                <MenuItem onClick={handleClose}>
                                                    <Button variant='outlined' color='error' onClick={() => blockUser(x)}>Block User</Button>
                                                </MenuItem>

                                            </Menu>
                                        </div>
                                    </div>
                                </Box>
                            })

                        }

                    </>
            }

        </Container>
    )
}

export default Followings