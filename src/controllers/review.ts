import type { Request, Response } from "express";
import { ReviewModel } from "../models/review";

export const ReviewController = {
	getArticleReviews: (req: Request, res: Response) => {
		const { articleId } = req.params;
		const page = Number.parseInt(req.query.page as string) || 1;
		const reviews = ReviewModel.getArticleReviews(articleId, page);
		res.json(reviews);
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
	deleteReview: async (req: Request, res: Response) => {
		const { articleId, reviewId } = req.params;

		try {
			// モデル層を呼び出して削除
			const deletedReview = await ReviewModel.deleteReview(articleId, reviewId);

			// データが削除されていれば成功レスポンスを返す
			if (deletedReview && deletedReview.length > 0) {
				res.status(200).json({ message: "Review deleted successfully." });
			} else {
				res.status(404).json({ message: "Review not found." });
			}
		} catch (error) {
			res.status(500).json({ message: "Failed to delete review." });
		}
	},
};
