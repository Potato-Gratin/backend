import type { Request, Response } from "express";
import { ReviewModel } from "../models/review";

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
	
		// 必要なパラメータが不足していないか確認
		if (!article_id || !content || !user_id) {
		  return res.status(400).json({
			error: "Missing required fields: articleId, content, or user_id.",
		  });
		}
		
		try {
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
