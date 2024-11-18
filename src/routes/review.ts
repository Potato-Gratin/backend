import express from "express";
import { ReviewController } from "../controllers/review";

export const reviewRouter = express.Router();

reviewRouter.get(
	"/articles/:articleId/reviews",
	ReviewController.getArticleReviews,
);
reviewRouter.post("/articles/:articleId/reviews", ReviewController.addReview);
reviewRouter.get("/users/:displayId/reviews", ReviewController.getUserReviews);
reviewRouter.delete(
	"/articles/:articleId/reviews/:reviewId",
	ReviewController.deleteReview,
);
