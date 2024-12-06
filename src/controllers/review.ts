import type { Request, Response } from "express";
import { ReviewModel } from "../models/review";

export const ReviewController = {
	getArticleReviews: async (req: Request, res: Response) => {
		const { articleId } = req.params;
		const page = Number.parseInt(req.query.page as string) || 1;

		const result = await ReviewModel.getReviewsByArticleId(articleId, page);
		if (result.isFailure()) {
			const e = result.value;
			console.log(e);
			res.status(500).json({ message: e.message });
		}

		const reviews = result.value;
		res.status(200).json(reviews);
	},

	addReview: (req: Request, res: Response) => {
		const { articleId } = req.params;
		const { content, userId } = req.body;
		const newReview = ReviewModel.addReview(articleId, content, userId);
		res.status(201).json(newReview);
	},
	getUserReviews: (req: Request, res: Response) => {
		const { displayId } = req.params;
		const reviews = ReviewModel.getUserReviews(displayId);
		res.json(reviews);
	},
	deleteReview: (req: Request, res: Response) => {
		const { articleId, reviewId } = req.params;
		const result = ReviewModel.deleteReview(articleId, reviewId);
		res.json(result);
	},
};
