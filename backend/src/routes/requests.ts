import express, { Router} from 'express';
import { accepted, blocked, blocklist, deleteRequest, followers, followings, sentRequest } from '../controllers/followController';


const router: Router = express.Router();

router.post('/sentRequest',sentRequest)
router.post('/accepted',accepted)
router.post('/blocked',blocked)
router.post('/deleteRequest',deleteRequest)
router.get('/allFollowers',followers)
router.get('/allFollowings',followings)
router.get('/blocklist',blocklist)

export default router;