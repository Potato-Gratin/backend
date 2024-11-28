import express from "express";
import { ReviewVoteController } from "../controllers/review_vote";

export const reviewVoteRouter = express.Router();

reviewVoteRouter.get(
	"/score/articles/:articleId/reviews/:reviewId",
	ReviewVoteController.getScore,
);
reviewVoteRouter.put(
	"/articles/:articleId/reviews/:reviewId",
	ReviewVoteController.addOrUpdateVote,
);
reviewVoteRouter.delete(
	"/articles/:articleId/reviews/:reviewId/users/:userId",
	ReviewVoteController.deleteVote,
);
