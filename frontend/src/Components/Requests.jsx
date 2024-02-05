import { Button, TextField, Typography } from '@mui/material'
import { Box, Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { HOC } from './Hoc'
import { useDispatch, useSelector } from 'react-redux'
import { addRequests, addfollowing, blockList, declineRequest } from '../Store/Slice/FollowSlice'
import ReactTimeAgo from 'react-time-ago'
import profile from "../Assets/img/profile.jpg"
import { NavLink } from 'react-router-dom'
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const RequestsPage = () => {
    const allUsers = useSelector((state) => state.users)
    const [loginUser, setloginUser] = useState(JSON.parse(localStorage.getItem("loginId")))
    const allRequests = useSelector((state) => state.following).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
    const [followingData, setfollowingData] = useState({})
    const dispatch = useDispatch()
    const [otherUsers, setotherUsers] = useState([])

    const followers = () => {
        return allRequests?.filter((x) => x.reciverId == loginUser && x.status == "requested").map((x) => x.senderId).flatMap((x) => allUsers.filter((a) => a.UserId == x))
    }

    const getUsers = (e) => {
        if (e.target.value != "") {
            const array = allUsers.filter((x) => x.username.toLowerCase().includes(e.target.value.toLowerCase()))
            if (allRequests.length != 0) {
                const unblockedUsers = array.filter((x) => {
                    if (x.UserId != loginUser) {
                        const user = allRequests.find((e) => e.reciverId == x.UserId)
                        if (user && user.status != "blocked") {
                            return user
                        }
                        else {

                            return x
                        }
                    }
                    else {
                        return x
                    }
                })
                setotherUsers(unblockedUsers)

            }
            else {

                setotherUsers(array)
            }
            // const unblockedUsers = array.filter((x) => unblocked.find((e) => e.reciverId == x.UserId))
        }
        else {
            setotherUsers([])
        }
    }



    const follow = (x) => {
        followingData['time'] = new Date();
        followingData['senderId'] = x.UserId
        followingData['reciverId'] = loginUser
        setfollowingData({ ...followingData })
        dispatch(addfollowing(followingData))
    }

    const blockUser = (x) => {
        followingData['time'] = new Date();
        followingData['senderId'] = x.UserId
        followingData['reciverId'] = loginUser
        setfollowingData({ ...followingData })
        dispatch(blockList(followingData))
    }

    const request = (x) => {
        followingData['senderId'] = loginUser
        followingData['reciverId'] = x.target.value
        followingData['time'] = new Date();
        setfollowingData({ ...followingData })
        dispatch(addRequests(followingData))

        x.target.innerHTML = "Requested"
        x.target.classList.remove('btn-primary')
        x.target.classList.add('btn-secondary')

    }
    const deleteRequest = (x) => {
        followingData['senderId'] = x.UserId
        followingData['reciverId'] = loginUser
        setfollowingData({ ...followingData })
        dispatch(declineRequest(followingData))

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

    return (
        <>
            <Container>


                <Typography variant='h4' className='fw-bold'>Requests</Typography>
                {
                    followers().length === 0
                        ?
                        <Typography variant='h6' className='fw-bold my-3 text-center'>No Requests</Typography>
                        :
                        <>
                            {
                                followers().map((x) => {
                                    return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={x.profileImg ?? profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
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
                                    return <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", my: 2 }}>
                                        <div className='d-flex align-items-center gap-4'>
                                            <img src={x.profileImg ?? profile} alt="userProfile" height={"70px"} width={"70px"} className='rounded-circle' />
                                            <Typography variant='h6' className='fw-bold'>{x.username}</Typography>
                                        </div>
                                        {
                                            allUsers.find((a) => a.UserId == loginUser).UserId == x.UserId
                                                ?
                                                <>
                                                    <NavLink to='/profile'><Button variant='outlined' color='success' className='me-2'>View Profile</Button></NavLink>

                                                </>
                                                :
                                                <>

                                                    {
                                                        allRequests.find((e) => e.reciverId == x.UserId && e.senderId == loginUser)
                                                            ?
                                                            <>
                                                                {
                                                                    allRequests.find((e) => e.reciverId == x.UserId).status == "requested"
                                                                        ?
                                                                        <Button variant='outlined' color='error' onClick={() => deleteRequest(x)}>Cancel Request</Button>
                                                                        :
                                                                        <Button variant='outlined' color='error' onClick={() => deleteRequest(x)}>Unfollow</Button>

                                                                }

                                                            </>
                                                            :
                                                            <>
                                                                <button onClick={request} className='btn btn-primary' value={x.UserId}>Follow</button>
                                                            </>
                                                    }

                                                </>
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