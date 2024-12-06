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
	getUserReviews: async (req: Request, res: Response) => {
		const { userId } = req.params;
		const page = Number.parseInt(req.query.page as string) || 1;
		const limit = 10; // 1ページ当たりの件数
		const offset = (page - 1) * limit; // オフセット計算

		try {
			// モデルでレビュー情報を取得
			const reviews = await ReviewModel.getReviewsByUserId(
				userId,
				limit,
				offset,
			);

			res.status(200).json(reviews);
		} catch (error) {
			res.status(500).json({ message: "Failed to fetch reviews." });
		}
	},
	deleteReview: (req: Request, res: Response) => {
		const { articleId, reviewId } = req.params;
		const result = ReviewModel.deleteReview(articleId, reviewId);
		res.json(result);
	},
};
