import express, { Router , Request,Response } from 'express';
import { signUp, update } from '../controllers/authController';
import { upload } from '../utils/multer';

const router: Router = express.Router();


// router.get('/login',login)
router.post('/signup',signUp)
router.post('/update' ,upload.single("profileImg"),update)
export default router;

