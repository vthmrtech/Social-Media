import express, { Router } from 'express';
import auth from './auth';
import posts from './posts';

const router: Router = express.Router();

router.use('/auth', auth)
router.use('/posts', posts)

export default router;
