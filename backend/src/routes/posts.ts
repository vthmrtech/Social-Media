import express, { Router} from 'express';
import { upload } from '../utils/multer';
import { addComment, addPosts, deleteComment, deletePosts, likeDislike } from '../controllers/postcontrollers';

const router: Router = express.Router();


router.post('/addPosts',upload.single("postImg"),addPosts)
router.delete('/deletePosts',upload.single("postImg"),deletePosts)
router.post('/likeDislike',likeDislike)
router.post('/addComment',addComment)
router.delete('/deleteComment',deleteComment)
export default router;

