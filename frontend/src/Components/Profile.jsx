import { Box, Button, Container, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { HOC } from './Hoc'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SendIcon from '@mui/icons-material/Send';
import { Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import uuid4 from 'uuid4';
import Followers from './Followers';
import Followings from './Followings';
import { addComment, addPost, deleteComments, deletePost, liked } from '../Store/Slice/PostsSlice';
import { Favorite } from '@mui/icons-material';
import profile from "../Assets/img/profile.jpg"
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { updateAccount } from '../Store/actions/useractions';



const Profile = () => {

    const dispatch = useDispatch()
    const [error, seterror] = useState({})
    const [open, setOpen] = useState(false)
    const [openfollowModel, setopenfollowModel] = useState([false, ""])
    const [openComment, setopenComment] = useState([false, ""]);
    const [openProfile, setopenProfile] = useState(false);
    const users = useSelector((state) => state.users)

    const [loginUser, setloginUser] = useState(JSON.parse(localStorage.getItem("loginId")))
    const [userprofile, setuserprofile] = useState({})
    const [editObj, setEditObj] = useState({})
    const [commentsObj, setcommentsObj] = useState({})
    const allFollow = useSelector((state) => state.following)
    const [following, setfollowing] = useState([])
    const [followers, setfollowers] = useState([])
    const posts = useSelector((state) => state.posts).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
    const getuserProfile = () => {
        setuserprofile(users?.find((x) => x.UserId === loginUser))

    }

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenComment = (x) => setopenComment([true, x]);
    const handleCloseComment = () => setopenComment([false, ""]);
    const handleOpenProfile = () => setopenProfile(true);
    const handleCloseProfile = () => setopenProfile(false);
    const handleOpenFollow = (x) => setopenfollowModel([true, x]);
    const handleCloseFollow = () => setopenfollowModel([false, ""]);
    useEffect(() => {
        setEditObj({ ...users?.find((x) => x.UserId === loginUser) })
    }, [userprofile])


    const editProfile = async (e) => {

        if (e.target.type === "file") {
            if (e.target.files[0]?.type.includes("image")) {

                editObj[e.target.name] = await toBase64(e.target.files?.[0])
                delete error[e.target.name]
                seterror({ ...error })
            }
            else {
                editObj[e.target.name] = profile
                error[e.target.name] = "Can Upload Only Image Files "
                seterror({ ...error })


            }
        }
        else if (e.target.type == "date") {
            if ((new Date().getFullYear() - new Date(e.target.value).getFullYear()) < 13) {

                error[e.target.name] = "Age Can't be Less than 13 "
                seterror({ ...error })

            }
            else {
                editObj[e.target.name] = e.target.value

                delete error[e.target.name]
                seterror({ ...error })
            }

        }
        else {
            editObj[e.target.name] = e.target.value
            delete error[e.target.name]
        }
        setEditObj({ ...editObj })

        for (let x in editObj) {
            if (x !== "profileImg") {

                if (editObj[x] == undefined || editObj[x] == "") {
                    error[x] = "Required*"
                }
                else {
                    delete error[x]
                }
            }

        }
        seterror({ ...error })
    }

    const updateProfile = (e) => {
        e.preventDefault();
        for (let x in editObj) {
            if (editObj[x] == undefined || editObj[x] == "") {
                error[x] = "Required*"
            }
            else {
                delete error[x]
            }

        }
        seterror({ ...error })
        if (Object.keys(error).length == 0) {

            dispatch(updateAccount(editObj))
            handleCloseProfile();
            getuserProfile();
        }

    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 700,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const followModel = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 800,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const [postData, setpostData] = useState({})

    const post = async (e) => {
        if (e.target.type === "file") {
            if (e.target.files[0]?.type.includes("image")) {

                postData[e.target.name] = await toBase64(e.target.files?.[0])
                delete error[e.target.name]
                seterror({ ...error })
            }
            else {
                postData[e.target.name] = ""
                error[e.target.name] = "Can Upload Only Image Files "
                seterror({ ...error })


            }
        }

        else {
            postData[e.target.name] = e.target.value
        }

        setpostData({ ...postData })
        console.log("error", error)
    }

    const addposts = () => {
        if (Object.keys(error).length == 0) {

            postData['UserId'] = loginUser
            postData['postId'] = uuid4();
            postData['time'] = new Date()
            setpostData({ ...postData })
            dispatch(addPost(postData))
            setpostData({})
            handleClose();
        }

    }

    useEffect(() => {
        getuserProfile()
    }, [])

    const [likeObj, setlikeObj] = useState({})

    const like = (post, loginId) => {
        likeObj['UserId'] = post.UserId
        likeObj['postId'] = post.postId
        likeObj['loginId'] = loginId
        setlikeObj({ ...likeObj })
        dispatch(liked(likeObj))
    }

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
        });

    const deletepost = (x) => {

        dispatch(deletePost(x.postId))
    }



    const comments = (e) => {
        commentsObj[e.target.name] = e.target.value
        setcommentsObj({ ...commentsObj })
    }


    const addComents = (e) => {
        e.preventDefault();
        commentsObj['postId'] = openComment[1].postId
        commentsObj['UserId'] = loginUser
        setcommentsObj({ ...commentsObj })
        dispatch(addComment(commentsObj))
        // handleCloseComment()
        setcommentsObj({})
    }

    const deleteComment = (x) => {
        commentsObj['postId'] = openComment[1].postId
        commentsObj['commentId'] = x.commentId
        setcommentsObj({ ...commentsObj })
        dispatch(deleteComments(commentsObj))
    }
    const removeProfilePic = () => {
        editObj['profileImg'] = profile
        setEditObj({ ...editObj })
    }

    return (
        <>
            <Modal open={openProfile}>
                <Box sx={style}>
                    <Form onSubmit={updateProfile} className="signUp p-3  onboardingForm">
                        <legend className='fw-bold text-center fs-1'> Profile Info</legend>
                        <Box sx={{ display: "flex" }}>
                            <div className='w-100'>
                                <div className='w-100 d-flex flex-column align-items-center' >

                                    <img
                                        src={editObj.profileImg ?? profile}
                                        className="mt-3 me-5"
                                        style={{ maxWidth: "200px", borderRadius: "50% ", maxHeight: "200px", minWidth: "200px", minHeight: "200px" }}
                                        alt=''
                                    />
                                    <Form.Label className='fw-bold mt-2 me-5'>Profile Img</Form.Label>
                                    <label className='btn btn-light  mt-3 me-4' type='button' htmlFor='profile'>Upload Profile Pic</label>
                                    {
                                        editObj['profileImg'] && editObj['profileImg'] != profile
                                            ?
                                            <button className='btn btn-danger  mt-3 me-4' type='button' onClick={() => removeProfilePic()}>Remove Profile Pic</button>
                                            :
                                            <></>
                                    }
                                    <Form.Control type="file" name="profileImg" onChange={editProfile} className='d-none' id='profile' />
                                    <Typography variant='subtitle2' color="red" sx={{ mt: 1 }}>{error.profileImg ?? ""}</Typography>

                                </div>
                            </div>
                            <div className='w-100'>
                                <Form.Label className='fw-bold mt-2'>User Name</Form.Label>
                                <Form.Control type="text" name="username" onChange={editProfile} value={editObj.username ?? ""} />
                                <Typography variant='subtitle2' color="red" sx={{ mt: 1 }}>{error.username ?? ""}</Typography>
                                <Form.Label className='fw-bold mt-2'>Mobile</Form.Label>
                                <Form.Control type="text" name="mobile" onChange={editProfile} value={editObj.mobile ?? ""} />
                                <Typography variant='subtitle2' color="red" sx={{ mt: 1 }}>{error.mobile ?? ""}</Typography>
                                <Form.Label className='fw-bold mt-2'>Birth Date</Form.Label>
                                <Form.Control type="date" name="dob" onChange={editProfile} value={editObj.dob ?? ""} />
                                <Typography variant='subtitle2' color="red" sx={{ mt: 1 }}>{error.dob ?? ""}</Typography>
                                <Form.Label className='fw-bold mt-2'>Discription</Form.Label>
                                <Form.Control as="textarea" name='bio' rows={3} onChange={editProfile} value={editObj.bio ?? ""} />
                                <Typography variant='subtitle2' color="red" sx={{ mt: 1 }}>{error.bio ?? ""}</Typography>

                            </div>
                        </Box>

                        <button className='btn btn-light w-100 rounded-5 mt-3' type='submit'>Submit</button>
                    </Form>
                </Box>
            </Modal>
            <Container sx={{ py: "40px" }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Box>
                        <div className="rounded-circle border border-2  " style={{ maxHeight: "200px", maxWidth: "185px", overflow: "hidden" }} >
                            <img src={users?.find((x) => x.UserId === loginUser)?.profileImg ?? profile} alt="" height={180} width={180} style={{ objectFit: "cover", maxHeight: "180px", maxWidth: "180px" }} />
                        </div>
                        <Typography variant='h3'>{users?.find((x) => x.UserId === loginUser)?.username}</Typography>
                        <Typography variant='h6'>{users?.find((x) => x.UserId === loginUser)?.bio}</Typography>

                    </Box>
                    <Box>
                        <Box sx={{ display: "flex", gap: "40px", textAlign: "center" }}>
                            <Box sx={{ cursor: "pointer" }}>
                                <Typography variant='h6'>{posts.filter((x) => x.UserId === loginUser)?.length}</Typography>
                                <Typography variant='h6'>Post</Typography>
                            </Box>
                            <Box sx={{ cursor: "pointer" }} onClick={() => handleOpenFollow("followers")}>
                                <Typography variant='h6'>{allFollow.filter((x) => x.reciverId == loginUser && x.status == "accepted").length}</Typography>
                                <Typography variant='h6'>Followers</Typography>
                            </Box>
                            <Box sx={{ cursor: "pointer" }} onClick={() => handleOpenFollow("following")}>
                                <Typography variant='h6'>{allFollow.filter((x) => x.senderId == loginUser && x.status == "accepted").length}</Typography>
                                <Typography variant='h6'>Following</Typography>
                            </Box>
                        </Box>
                        <div className='mt-5'>

                            <Button variant='contained' color='warning' sx={{ marginTop: "10px" }} fullWidth onClick={handleOpenProfile}>Edit Profile</Button>
                        </div>

                    </Box>
                </Box>
                <Container sx={{ display: "flex", justifyContent: "space-between", py: 1 }}>
                    <Typography variant='h5'>Add Post</Typography>
                    <Button variant='contained' color='primary' onClick={handleOpen}>Add Post</Button>
                </Container>
                <Container sx={{ display: "flex", flexWrap: "wrap", p: "0", alignContent: "flex-start" }}>
                    {
                        posts.length != 0
                            ?
                            <>
                                {
                                    posts.map((x) => {
                                        if (x.UserId === loginUser) {
                                            return <Box className='p-1 w-25 ' sx={{ cursor: "pointer" }} onDoubleClick={() => deletepost(x)}>
                                                <div className='border border-2 position-relative posts' style={{ height: "315px" }}>
                                                    <img src={x.postImg ?? profile} alt="" style={{ minHeight: "270px", maxHeight: "270px" }} width="100%" />
                                                    <div className='px-3 d-flex justify-content-between mt-2'>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><button className={`border-0 bg-transparent text-danger  ${x.like.includes(loginUser) ? 'text-danger' : 'text-dark'}`} onClick={() => like(x, loginUser)}><Favorite /></button><span>{x.like.length}</span></Typography>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><button className='border-0 bg-transparent ' onClick={() => handleOpenComment(x)}><ChatBubbleRoundedIcon /></button><span>{x.comments.length}</span></Typography>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><SendIcon sx={{ rotate: "320deg" }} /><span></span></Typography>

                                                    </div>
                                                </div>
                                            </Box>
                                        }

                                    })

                                }

                            </>
                            :
                            <></>
                    }

                </Container>
            </Container>
            <Modal
                open={open}

            >
                <Box sx={style}>
                    <Form>
                        <Form.Label className='fw-bold mt-2 d-block'>Post Img</Form.Label>
                        <Form.Control type="file" name="postImg" onChange={post} id='post' className='d-none'/>
                        <label className='btn btn-secondary  mt-3 me-4 ' type='button' htmlFor='post' >Upload Image</label>
                        <Box sx={{ maxHeight: "250px", maxWidth: "250px", minHeight: "250px", minWidth: "250px", mt: 2 , border:"1px solid #888", display: "flex", alignItems: "center",justifyContent:"center"}}>
                            {
                                postData.postImg == "" || postData.postImg == undefined
                                    ?
                                    <>
                                        <Typography variant='h5'>Your Post Img</Typography>
                                    </>
                                    :
                                    <><img src={postData.postImg} alt="" height={"250px"} width={"250px"} /></>
                            }
                        </Box>
                        <Typography variant='subtitle2' color="red" sx={{ mt: 1 }}>{error.postImg ?? ""}</Typography>
                        <Form.Label className='fw-bold mt-5'>Discription</Form.Label>
                        <Form.Control as="textarea" name='postDisc' rows={3} onChange={post} />
                        
                        <Button onClick={addposts} variant='contained' sx={{ mt: 2 }}>Save Post</Button>
                    </Form>
                </Box>
            </Modal>
            <Modal
                open={openComment[0]}
            >

                <Box sx={style}>
                    <Button variant='outlined' onClick={handleCloseComment} color='error' sx={{ mt: 2, position: "absolute", right: "20px", top: 0 }} ><CloseIcon /></Button>

                    <Box sx={{ mt: 2 }}>
                        {
                            openComment[1] && posts.find((a) => a.postId == openComment[1]['postId'])['comments'].map((x) => {
                                return <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, justifyContent: "space-between" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img src={//d((a) => a.UserId == x.UserId).profileImg ?? profile} alt="userProfile" height={"40px"} width={"40px"} className='rounded-circle' />
                                        <div>
                                            <Typography variant='h6' className='fw-bold'>{//d((a) => a.UserId == x.UserId).username}</Typography>
                                            <Typography>{x.comment}</Typography>
                                        </div>
                                    </Box>
                                    <Box>
                                        <Button onClick={() => deleteComment(x)} color='error'  ><DeleteIcon /></Button>

                                    </Box>
                                </Box>
                            })

                        }

                    </Box>
                    <Form onSubmit={addComents}>
                        <Form.Label className='fw-bold mt-2'>Add Comment</Form.Label>
                        <Form.Control type="text" name="comment" onChange={comments} value={commentsObj.comment ?? ""} />
                        <Button type='submit' variant='contained' sx={{ mt: 2 }}>Add Coment</Button>
                    </Form>
                </Box>
            </Modal>
            <Modal
                open={openfollowModel[0]}
            >
                <Box sx={followModel}>
                    <Button variant='outlined' color='error' sx={{ fontSize: "15px", p: 0, position: "absolute", top: "10px", right: "10px" }} onClick={handleCloseFollow}>x</Button>
                    {openfollowModel[1] === "followers" ? <Followers /> : <Followings />}
                </Box>
            </Modal>

        </>
    )
}

export default HOC(Profile)