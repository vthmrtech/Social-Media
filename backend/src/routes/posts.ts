import express, { Router} from 'express';
import { upload } from '../utils/multer';
import { addComment, addPosts, deleteComment, deletePosts, getUserFollowingPosts, getUserPost, likeDislike } from '../controllers/postcontrollers';

const router: Router = express.Router();


router.post('/addPosts',upload.single("postImg"),addPosts)
router.delete('/deletePosts/:id',deletePosts)
router.post('/likeDislike',likeDislike)
router.post('/addComment',addComment)
router.post('/deleteComment',deleteComment)
router.get('/followingPosts',getUserFollowingPosts)
router.get('/getUserPost',getUserPost)

export default router;

