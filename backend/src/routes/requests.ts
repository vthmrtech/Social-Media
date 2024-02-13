import express, { Router} from 'express';
import { accepted, blocked, blocklist, deleteRequest, followers, followings, removeFollower, sentRequest, unBlock, unFollow } from '../controllers/followController';


const router: Router = express.Router();

router.post('/sentRequest',sentRequest)
router.post('/accepted',accepted)
router.post('/blockUser',blocked)
router.post('/unblock',unBlock)
router.delete('/deleteRequest',deleteRequest)
router.post('/allFollowers',followers)
router.post('/removeFollower',removeFollower)
router.post('/allFollowings',followings)
router.post('/unFollow',unFollow)
router.post('/blocklist',blocklist)

export default router;