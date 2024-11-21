import express from "express";
import { ReviewController } from "../controllers/review";

export const reviewRouter = express.Router();

reviewRouter.get("/articles/:articlesId", ReviewController.getArticleReviews);
reviewRouter.post("/articles/:articleId", ReviewController.addReview);
reviewRouter.get("/users/:displayId", ReviewController.getUserReviews);
reviewRouter.delete(
	"/:reviewId/articles/:articleId",
	ReviewController.deleteReview,
);
