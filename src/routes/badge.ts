import express from "express";
import { BadgeController } from "../controllers/badge";

export const badgeRouter = express.Router();

badgeRouter.post(
	"/articles/:articleId/reviews/:reviewId/budges",
	BadgeController.addBadge,
);
badgeRouter.get(
	"/articles/:articleId/reviews/:reviewId/budges",
	BadgeController.getBadgesByReview,
);
badgeRouter.get(
	"/users/:displayId/budges/receive",
	BadgeController.getReceivedBadges,
);
badgeRouter.get("/users/:displayId/budges/send", BadgeController.getSentBadges);

export default badgeRouter;
