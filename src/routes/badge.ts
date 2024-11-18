import express from 'express';
import { BadgeController } from '../controllers/badge';

const router = express.Router();

router.post('/articles/:articleId/reviews/:reviewId/budges', BadgeController.addBadge);
router.get('/articles/:articleId/reviews/:reviewId/budges', BadgeController.getBadgesByReview);
router.get('/users/:displayId/budges/receive', BadgeController.getReceivedBadges);
router.get('/users/:displayId/budges/send', BadgeController.getSentBadges);

export default router;
