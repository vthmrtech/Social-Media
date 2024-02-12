import express, { Router } from 'express';
import auth from './auth';
import posts from './posts';
import requests from './requests';
import authMiddleware from '../middleware/middleware';
import { isAuthenticated } from '../middleware/passport';

const router: Router = express.Router();

router.use('/auth', auth)
router.use('/posts',authMiddleware(),isAuthenticated, posts)
router.use('/requests',authMiddleware(),isAuthenticated, requests)

export default router;
