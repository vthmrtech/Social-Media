import { Box, Button, Container, Modal, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SendIcon from '@mui/icons-material/Send';
import { HOC } from './Hoc'
import { useDispatch, useSelector } from 'react-redux'
import { Favorite } from '@mui/icons-material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import profile from "../Assets/img/profile.jpg"
import OnBoarding from './OnBoarding';
import { Context } from '../App';
import { Form } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { addComment, deleteComment, getFollowingPosts, likeDislike } from '../Store/actions/postAction';



const Home = () => {
    let isLogin = useContext(Context)
    const [commentsObj, setcommentsObj] = useState({})
    const [likeObj, setlikeObj] = useState({})
    const [openComment, setopenComment] = useState([false, ""]);
    const loginId = JSON.parse(localStorage.getItem("user"))
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.data)
    const posts = useSelector((state) => state.users.followingPosts).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))

    const handleOpenComment = (x) => setopenComment([true, x]);
    const handleCloseComment = () => setopenComment([false, ""]);
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
    };

    const like = async (post) => {
        likeObj['postId'] = post.postId
        setlikeObj({ ...likeObj })
        const response  = await dispatch(likeDislike(likeObj))
        if(response.meta.requestStatus === "fulfilled"){
            dispatch(getFollowingPosts())
        }
    }
    
    
    const comments = (e) => {
    commentsObj[e.target.name] = e.target.value
    setcommentsObj({ ...commentsObj })
}


const addComents = async (e) => {
    e.preventDefault();
    commentsObj['postId'] = openComment[1].postId
    setcommentsObj({ ...commentsObj })
    const response = await dispatch(addComment(commentsObj))
    if(response.meta.requestStatus === "fulfilled"){
        handleCloseComment()
        dispatch(getFollowingPosts())
    }
    setcommentsObj({})
}

const deleteComments = async (x) => {
    commentsObj['postId'] = openComment[1].postId
    commentsObj['commentId'] = x.commentId
    setcommentsObj({ ...commentsObj })
    const response  = await dispatch(deleteComment(commentsObj))
    if(response.meta.requestStatus === "fulfilled"){
        handleCloseComment()
        dispatch(getFollowingPosts())
    }
}

    useEffect(() => {
      dispatch(getFollowingPosts())
    }, [])
    
    const loginUser = useSelector((state) => state.users.data)
    return (
        <>
            {
                loginUser.username == undefined
                    ?
                    <Box sx={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, zIndex: 500 }}>
                        <OnBoarding />
                    </Box>
                    :
                    <>
                        <Container>
                            <Typography variant='h3'>All Posts</Typography>

                            <Container sx={{ display: "flex", flexWrap: "wrap", p: "0", alignContent: "flex-start" }}>
                                {
                                    posts?.map((x) => {

                                            return <div className='p-1 w-25 ' >
                                                <div className='border border-2' style={{ height: "351px" }}>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <img src={x.userPosts.userProfile ?`http://localhost:4000/image/uploads/profile/${x.userPosts.userProfile}` : profile} alt="userProfile" height={"40px"} width={"40px"} className='rounded-circle' />
                                                        <Typography variant='h6' className='fw-bold'>{x.userPosts.username}</Typography>
                                                    </div>
                                                    <img src={`http://localhost:4000/image/uploads/posts/${x.userPosts.postImg}`} alt="" style={{ minHeight: "270px", maxHeight: "270px" }} width="100%" />
                                                    <div className='px-3 d-flex justify-content-between'>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><button className={`border-0 bg-transparent`} onClick={() => like(x.userPosts, loginId)}>{x.userPosts.like.includes(loginId.UserId) ? <Favorite color='error'/> : <FavoriteBorderIcon/>}</button><span>{x.userPosts.like.length}</span></Typography>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><button className='border-0 bg-transparent ' onClick={() => handleOpenComment(x.userPosts)}><ChatBubbleRoundedIcon /></button><span>{x.userPosts.comments.length}</span></Typography>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><SendIcon sx={{ rotate: "320deg" }} /><span></span></Typography>

                                                    </div>
                                                </div>
                                            </div>

                                    })

                                }

                            </Container>
                        </Container>
                    </>
            }

<Modal
                open={openComment[0]}
            >

                <Box sx={style}>
                    <Button variant='outlined' onClick={handleCloseComment} color='error' sx={{ mt: 2, position: "absolute", right: "20px", top: 0 }} ><CloseIcon /></Button>

                    <Box sx={{ mt: 2 }}>
                        {
                            openComment[1].comments?.map((x) => {
                                return <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, justifyContent: "space-between" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img src={ x.userProfile ? `http://localhost:4000/image/uploads/profile/${x.userProfile}` : profile} alt="userProfile" height={"40px"} width={"40px"} className='rounded-circle' />
                                        <div>
                                            <Typography variant='h6' className='fw-bold'>{x.username}</Typography>
                                            <Typography>{x.comment}</Typography>
                                        </div>
                                    </Box>
                                    <Box>
                                        {
                                            x.UserId == loginId.UserId 
                                                ?
                                                <Button onClick={() => deleteComment(x)} color='error'  ><DeleteIcon /></Button>
                                                :
                                                <></>
                                            }
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

        </>
    )
}

export default HOC(Home)