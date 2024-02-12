import express, { Router , Request,Response } from 'express';
import { getAllUsers, login, signUp, update } from '../controllers/authController';
import { upload } from '../utils/multer';
import authMiddleware from '../middleware/middleware';
import passport from 'passport';
import { isAuthenticated } from '../middleware/passport';

const router: Router = express.Router();


router.get('/getAllUsers',authMiddleware(),getAllUsers)
router.post('/login',passport.authenticate('local'),login)
router.post('/signup',signUp)
router.post('/update' ,upload.single("profileImg"),authMiddleware(),isAuthenticated,update)
export default router;

