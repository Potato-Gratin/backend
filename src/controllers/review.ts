import type { Request, Response } from "express";
import { ReviewModel } from "../models/review";
import { ArticleModel } from "../models/article";

export const ReviewController = {
	getArticleReviews: (req: Request, res: Response) => {
		const { articleId } = req.params;
		const page = Number.parseInt(req.query.page as string) || 1;
		const reviews = ReviewModel.getArticleReviews(articleId, page);
		res.json(reviews);
	},
	addReview: async (req: Request, res: Response) => {
		const { content, user_id, parent_review_id } = req.body;
		const { article_id } = req.params; 

		try {
			// 記事が存在するか確認 (controllers/article の findById を使用)
			const article = await ArticleModel.findById(article_id);
			if (!article) {
			  return res.status(404).json({
				error: `Article with ID ${article_id} not found.`,
			  });
			}
		  // addReview メソッドを実行
		  const newReview = await ReviewModel.addReview(article_id, content, user_id, parent_review_id);
	
		  // 成功時に新しいレビュー情報を返す
		  return res.status(201).json(newReview);
		} catch (error) {
		  // エラー時に詳細を返す
		  console.error("Error adding review:");
		  return res.status(500).json({
			error: "Failed to add review.",
		  });
		}
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
