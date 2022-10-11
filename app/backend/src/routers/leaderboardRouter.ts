import { Router } from 'express';
import LeaderboardController from '../controllers/LeaderboardController';

const router = Router();
const leaderboardController = new LeaderboardController();

router.get('/', leaderboardController.general);
router.get('/home', leaderboardController.endedHome);
router.get('/away', leaderboardController.endedAway);

export default router;
