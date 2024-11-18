import express from "express";
import { ReviewVoteController } from "../controllers/review_vote";

export const reviewVoteRouter = express.Router();

reviewVoteRouter.get(
	"/articles/:articleId/reviews/:reviewId/review_votes/score",
	ReviewVoteController.getScore,
);
reviewVoteRouter.put(
	"/articles/:articleId/reviews/:reviewId/review_votes",
	ReviewVoteController.addOrUpdateVote,
);
reviewVoteRouter.delete(
	"/articles/:articleId/reviews/:reviewId/users/:userId/review_votes",
	ReviewVoteController.deleteVote,
);
