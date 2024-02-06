import express, { Router } from 'express';
import auth from './auth';
import dotenv from 'dotenv';

const router: Router = express.Router();

router.use('/auth', auth)

export default router;
