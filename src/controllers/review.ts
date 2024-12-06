import type { Request, Response } from "express";
import { ReviewModel } from "../models/review";
import { UserModel } from "../models/user";

export const ReviewController = {
	addReview: (req: Request, res: Response) => {
		const { articleId } = req.params;
		const { content, userId } = req.body;
		const newReview = ReviewModel.addReview(articleId, content, userId);
		res.status(201).json(newReview);
	},

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

	getUserReviews: async (req: Request, res: Response) => {
		// displayId から userId を解決
		const { displayId } = req.params;
		const result1 = await UserModel.findByDisplayId(displayId);
		if (result1.isFailure()) {
			const e = result1.value;
			console.log(e);
			res.status(500).json({ message: e.message });
			return;
		}
		const user = result1.value;
		if (user === null) {
			res.status(404).json({ message: "User not found" });
			return;
		}

		const userId = user.id;
		const page = Number.parseInt(req.query.page as string) || 1;

		const result2 = await ReviewModel.findByUserId(userId, page);

		if (result2.isFailure()) {
			const e = result2.value;
			console.log(e);
			res.status(500).json({ message: e.message });
		}

		const reviews = result1.value;
		res.status(200).json(reviews);
	},

	deleteReview: (req: Request, res: Response) => {
		const { articleId, reviewId } = req.params;
		const result = ReviewModel.deleteReview(articleId, reviewId);
		res.json(result);
	},
};
