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
	  
		// バリデーション: 必須パラメータが提供されているか
		if (!reviewId || !userId) {
		  return res.status(400).json({ error: "Invalid request parameters." });
		}
	  
		try {
		  // 削除処理の実行
		  const isDeleted = await ReviewVoteModel.deleteVote(
			Number.parseInt(reviewId),
			userId
		  );
	  
		  if (!isDeleted) {
			// 削除対象が見つからない場合は 404 を返す
			return res.status(404).json({ error: "Review vote not found." });
		  }
	  
		  res.status(200).json({ message: "Vote deleted successfully." });
		} catch (error) {
		  console.error("Error in deleteVote:", error);
		  res.status(500).json({ error: "Failed to delete review vote." });
		}
	  },
	  
};
