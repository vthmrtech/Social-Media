import express, { Router , Request,Response } from 'express';
import { login, signUp, update } from '../controllers/authController';
import { upload } from '../utils/multer';
import authMiddleware from '../middleware/middleware';

const router: Router = express.Router();


router.post('/login',login)
router.post('/signup',signUp)
router.post('/update' ,upload.single("profileImg"),authMiddleware(),update)
export default router;

