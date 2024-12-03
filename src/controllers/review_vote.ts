import type { Request, Response } from "express";
import { ReviewVoteModel } from "../models/review_vote";

export const ReviewVoteController = {
	getScore: (req: Request, res: Response) => {
		const { articleId, reviewId } = req.params;
		const votes = ReviewVoteModel.getReviewVotes().filter(
			(vote) =>
				vote.article_id === articleId &&
				vote.review_id === Number.parseInt(reviewId),
		);
		if (votes.length === 0) {
			res.status(404).send("Not Found");
			return;
		}
		const score = votes.reduce((total, vote) => total + vote.score, 0);
		res.json({ score });
	},
	addOrUpdateVote: (req: Request, res: Response) => {
		const { articleId, reviewId } = req.params;
		const { user_id, score } = req.body;
		ReviewVoteModel.addOrUpdateVote({
			review_id: Number.parseInt(reviewId),
			article_id: articleId,
			user_id,
			score,
		});
		res.status(200).send("Vote added or updated");
	},
	deleteVote: async (req: Request, res: Response) => {
		const { reviewId, userId } = req.params;

		// 必須パラメータのバリデーション
		if (!reviewId || !userId) {
			return res.status(400).json({ error: "Invalid request parameters." });
		}

		try {
			// `reviewId` を数値に変換
			const review_id = Number.parseInt(reviewId);

			// モデルの `deleteVote` を呼び出し
			await ReviewVoteModel.deleteVote(review_id, userId);

			// 成功レスポンス
			res.status(200).json({ message: "Vote deleted successfully." });
		} catch (error) {
			// `error` の型を絞り込む
			if (error instanceof Error) {
				// エラーメッセージに基づいてレスポンスを分ける
				if (error.message.includes("Failed to delete review vote")) {
					res.status(404).json({ error: "Review vote not found." });
				} else {
					res.status(500).json({
						error: "Failed to delete review vote due to server error.",
					});
				}
			}
		}
	},
};
