import express, { Router , Request,Response } from 'express';
import { getAllUsers, loginUser, login, signUp, update } from '../controllers/authController';
import { upload } from '../utils/multer';
import authMiddleware from '../middleware/middleware';
import passport from 'passport';
import { isAuthenticated } from '../middleware/passport';

const router: Router = express.Router();


router.get('/getAllUsers',authMiddleware(),isAuthenticated,getAllUsers)
router.post('/loginUser',authMiddleware(),isAuthenticated,loginUser)
router.post('/login',passport.authenticate('local',{failureMessage:true}),login);
router.post('/signup',signUp)
router.post('/update' ,upload.single("profileImg"),authMiddleware(),isAuthenticated,update)
export default router;

