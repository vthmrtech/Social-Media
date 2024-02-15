import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { HOC } from './Hoc'
import { useDispatch, useSelector } from 'react-redux'
import ReactTimeAgo from 'react-time-ago'
import profile from "../Assets/img/profile.jpg"
import { NavLink } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { getAllUsers } from '../Store/actions/userActions'
import { acceptRequest, blockList, blockUser, declineRequest, getRequests, getfollowers, getfollowing, pendingRequests, removeFollow, sendRequests, unFollow } from '../Store/actions/requestsAction'


const RequestsPage = () => {
    const allUsers = useSelector((state) => state.users.allUsers)

    const [loginUser, setloginUser] = useState(JSON.parse(localStorage.getItem("user")))
    const allRequests = useSelector((state) => state.requests.requests).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
    const [followingData, setfollowingData] = useState({})
    const dispatch = useDispatch()
    const [otherUsers, setotherUsers] = useState([])
    const pendingRequsts = useSelector((state) => state.requests.sentRequest)
    const followers = useSelector((state) => state.requests.followers)
    const following = useSelector((state) => state.requests.following)
    const blockedUsers =  useSelector((state) => state.requests.blockUser)
    useEffect(() => {
        getInfo()
    }, [])

    const getInfo = () => {
        dispatch(getAllUsers())
        dispatch(getRequests())
        dispatch(pendingRequests())
        dispatch(getfollowers())
        dispatch(getfollowing())
        dispatch(blockList())

    }
    

    const allpendingRequests = () => {
        return allRequests?.map((x) => x.senderId).flatMap((x) => allUsers.filter((a) => a.UserId == x))
    }

    const getUsers = (e) => {
        if (e.target.value != "") {
            const array = allUsers.filter((x) => x.username.toLowerCase().includes(e.target.value.toLowerCase()))
            setotherUsers([...array])
        }
        else {
            setotherUsers([])
        }
    }



    const follow = async (x) => {
        followingData['receivedFrom'] = x.UserId
        setfollowingData({ ...followingData })
        const response = await dispatch(acceptRequest(followingData))
        if(response.meta.requestStatus === "fulfilled"){
            getInfo()
        }
    }

    const block =  async (x) => {
        const response  = await dispatch(blockUser(x.UserId))
        if(response.meta.requestStatus === "fulfilled"){
            getInfo()
        }
    }

    const request = async (x) => {
        followingData['sendTo'] = x.UserId
        setfollowingData({ ...followingData })
        const response  = await dispatch(sendRequests(followingData))
            if(response.meta.requestStatus === "fulfilled"){
                getInfo()
            }
        


    }
    const deleteRequest = async (x) => {
        const response  = await dispatch(declineRequest(x.UserId))
        if(response.meta.requestStatus === "fulfilled"){
            getInfo()
        }

    }
    const removeFollower = async (x) => {
        const response  = await dispatch(removeFollow(x.UserId))
        if(response.meta.requestStatus === "fulfilled"){
            getInfo()
        }

    }
    const unfollowUser = async (x) => {
        const response  = await dispatch(unFollow(x.UserId))
        if(response.meta.requestStatus === "fulfilled"){
            getInfo()
        }

    }

    const duration = (x) => {
        const user = allRequests.find((e) => e.senderId == x.UserId)
        return <ReactTimeAgo date={user?.time} locale="en-US" />
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

    const followerBtn = (x) => {
        if(followers.find((e) => e.senderId == x.UserId)){ 
            return  <Button variant='outlined' color='error' onClick={() => removeFollower(x)}>Remove Follower</Button>
            
        }
        else{
            return <></>
        }
    }
    const followingBtn = (x) => {
        if(pendingRequsts.find(a => a.receiverId == x.UserId && a.senderId == loginUser.UserId))
        {
            return <Button variant='outlined' color='error' onClick={() => deleteRequest(x)}>Cancel Request</Button>
        }
        else if(following.find((e) => e.receiverId == x.UserId)){
            return <Button variant='outlined' color='error' onClick={() => unfollowUser(x)}>UnFollow</Button>
        }
        else if(followers.find((e) => e.senderId == x.UserId)){
            return <Button variant='contained' color='primary' onClick={() => request(x)}>Follow Back</Button>
        }
        else{
            return <Button variant='contained' color='primary' onClick={() => request(x)}>Follow</Button>
        }
    }

    

    return (
        <>
            <Container>


                <Typography variant='h4' className='fw-bold'>Requests</Typography>
                {
                    allpendingRequests().length === 0
                        ?
                        <Typography variant='h6' className='fw-bold my-3 text-center'>No Requests</Typography>
                        :
                        <>
                            {
                                allpendingRequests().map((x) => {
                                    return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={x.profileImg ?  `http://localhost:4000/image/uploads/profile/${x.profileImg}` :  profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
                                            <Typography variant='h6' className='fw-bold'>{x.username}</Typography>
                                        </div>

                                        <div className='text-center d-flex align-item-center gap-2'>
                                            <Typography sx={{ m: 1 }}>{duration(x)}</Typography>
                                            <Button variant='outlined' color='success' className='me-2' onClick={() => follow(x)}>Accept</Button>
                                            <Button variant='outlined' color='error' onClick={() => deleteRequest(x)}>Delete</Button>
                                            <div>
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
                                                        <Button variant='outlined' color='error' onClick={() => block(x)}>Block User</Button>
                                                    </MenuItem>

                                                </Menu>
                                            </div>
                                        </div>

                                    </Box>
                                })

                            }

                        </>
                }

                <Typography variant='h4' className='fw-bold'>Other Users</Typography>
                <Box>

                    <TextField id="outlined-basic" label="Search" variant="outlined" fullWidth sx={{ mt: 2 }} onChange={getUsers} />
                </Box>
                {
                    otherUsers.length == 0
                        ?
                        <Typography variant='h6' className='fw-bold my-3 text-center'>No Users Found</Typography>
                        :
                        <>
                            {
                                otherUsers.map((x) => {
                                    // return <Typography variant='h6' className='fw-bold'>Found</Typography>
                                    return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={x.profileImg ? `http://localhost:4000/image/uploads/profile/${x.profileImg}`  : profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
                                            <Typography variant='h6' className='fw-bold'>{x.username}</Typography>
                                        </div>
                                        { 
                                            x.UserId == loginUser.UserId                                         
                                                ?
                                                <>
                                                    <NavLink to='/profile'><Button variant='outlined' color='success' className='me-2'>View Profile</Button></NavLink>

                                                </>
                                                :
                                                <Box sx={{display:"flex",columnGap : 2}}>

                                                    {
                                                        followingBtn(x)
                                                    }
                                                    {
                                                    followerBtn(x)
                                                    }

                                                </Box>
                                        }

                                    </Box>
                                })
                            }
                        </>

                }

            </Container >
        </>
    )
}

export default HOC(RequestsPage)