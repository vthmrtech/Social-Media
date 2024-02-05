import { Box, Button, Container, Modal, Typography } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ChatBubbleRoundedIcon from '@mui/icons-material/ChatBubbleRounded';
import SendIcon from '@mui/icons-material/Send';
import { HOC } from './Hoc'
import { useDispatch, useSelector } from 'react-redux'
import { Favorite } from '@mui/icons-material';
import { addComment, deleteComments, liked } from '../Store/Slice/PostsSlice';
import profile from "../Assets/img/profile.jpg"
import OnBoarding from './OnBoarding';
import { Context } from '../App';
import { Form } from 'react-bootstrap';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';



const Home = () => {
    let isLogin = useContext(Context)
    const [commentsObj, setcommentsObj] = useState({})
    const [likeObj, setlikeObj] = useState({})
    const [openComment, setopenComment] = useState([false, ""]);
    const loginId = JSON.parse(localStorage.getItem("loginId"))
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users)
    const allFollowings = useSelector((state) => state.following).filter((x) => x.senderId == loginId && x.status == "accepted")
    const posts = useSelector((state) => state.posts).slice().sort((date1, date2) => new Date(date2.time) - new Date(date1.time))
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

    const like = (post, loginId) => {
        likeObj['UserId'] = post.UserId
        likeObj['postId'] = post.postId
        likeObj['loginId'] = loginId
        setlikeObj({ ...likeObj })
        dispatch(liked(likeObj))
    }

    const comments = (e) => {
        commentsObj[e.target.name] = e.target.value
        setcommentsObj({ ...commentsObj })
    }


    const addComents = (e) => {
        e.preventDefault();
        commentsObj['postId'] = openComment[1].postId
        commentsObj['UserId'] = loginId
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
    return (
        <>
            {
                isLogin.userName == undefined
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
                                        if (allFollowings.find((a) => a.reciverId == x.UserId) || x.UserId === loginId) {

                                            return <div className='p-1 w-25 ' >
                                                <div className='border border-2' style={{ height: "351px" }}>
                                                    <div className='d-flex align-items-center gap-2'>
                                                        <img src={users.find((a) => a.UserId == x.UserId).profileImg ?? profile} alt="userProfile" height={"40px"} width={"40px"} className='rounded-circle' />
                                                        <Typography variant='h6' className='fw-bold'>{users.find((a) => a.UserId == x.UserId).username}</Typography>
                                                    </div>
                                                    <img src={x.postImg} alt="" style={{ minHeight: "270px", maxHeight: "270px" }} width="100%" />
                                                    <div className='px-3 d-flex justify-content-between'>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><button className={`border-0 bg-transparent text-danger  ${x.like.includes(loginId) ? 'text-danger' : 'text-dark'}`} onClick={() => like(x, loginId)}><Favorite /></button><span>{x.like.length}</span></Typography>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><button className='border-0 bg-transparent ' onClick={() => handleOpenComment(x)}><ChatBubbleRoundedIcon /></button><span>{x.comments.length}</span></Typography>
                                                        <Typography variant='h5' sx={{ display: "flex", alignItems: "center", gap: 1 }}><SendIcon sx={{ rotate: "320deg" }} /><span></span></Typography>

                                                    </div>
                                                </div>
                                            </div>
                                        }

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
                            openComment[1] && posts.find((a) => a.postId == openComment[1]['postId'])['comments'].map((x) => {
                                return <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1, justifyContent: "space-between" }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <img src={users.find((a) => a.UserId == x.UserId).profileImg ?? profile} alt="userProfile" height={"40px"} width={"40px"} className='rounded-circle' />
                                        <div>
                                            <Typography variant='h6' className='fw-bold'>{users.find((a) => a.UserId == x.UserId).username}</Typography>
                                            <Typography>{x.comment}</Typography>
                                        </div>
                                    </Box>
                                    <Box>
                                        {
                                            x.UserId == loginId || posts.find((a) => a.postId == openComment[1]['postId'])['UserId'] == loginId
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