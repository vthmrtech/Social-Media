import express, { Router} from 'express';
import { upload } from '../utils/multer';
import authMiddleware from '../middleware/middleware';
import { addPosts } from '../controllers/postcontrollers';

const router: Router = express.Router();


router.post('/addPosts',upload.single("postImg"),authMiddleware(),addPosts)
export default router;

