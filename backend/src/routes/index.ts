import express, { Router } from 'express';
import auth from './auth';
import posts from './posts';
import requests from './requests';
import authMiddleware from '../middleware/middleware';

const router: Router = express.Router();

router.use('/auth', auth)
router.use('/posts',authMiddleware(), posts)
router.use('/requests',authMiddleware(), requests)

export default router;
