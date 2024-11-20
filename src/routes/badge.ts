import express from "express";
import { BadgeController } from "../controllers/badge";

export const badgeRouter = express.Router();

badgeRouter.post(
	"/articles/:articleId/reviews/:reviewId",
	BadgeController.addBadge,
);
badgeRouter.get(
	"/articles/:articleId/reviews/:reviewId",
	BadgeController.getBadgesByReview,
);
badgeRouter.get(
	"/receive/users/:displayId",
	BadgeController.getReceivedBadges,
);
badgeRouter.get("/send/users/:displayId", BadgeController.getSentBadges);

export default badgeRouter;
