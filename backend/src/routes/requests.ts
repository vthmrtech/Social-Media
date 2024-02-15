import express, { Router} from 'express';
import { accepted, blocked, blocklist, deleteRequest, followers, followings, getRequests, removeFollower, pendingRequests, sentRequest, unBlock, unFollow } from '../controllers/requestsController';


const router: Router = express.Router();

router.post('/sentRequest',sentRequest)
router.post('/accepted',accepted)
router.patch('/blockUser/:id',blocked)
router.delete('/unblock/:id',unBlock)
router.delete('/deleteRequest/:id',deleteRequest)
router.get('/allFollowers',followers)
router.delete('/removeFollower/:id',removeFollower)
router.get('/allFollowings',followings)
router.delete('/unFollow/:id',unFollow)
router.get('/blocklist',blocklist)
router.get("/getRequests",getRequests)
router.get("/pendingRequests",pendingRequests)

export default router;