import type { Request, Response } from "express";
import { ReviewVoteModel } from "../models/review_vote";

// PostgrestError型をインポートしてエラー型を明示的に指定する
interface PostgrestError {
	code: string;
	message: string;
  }

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
	addOrUpdateVote: async (req: Request, res: Response) => {
		const { review_id, user_id, score } = req.body;
	
		try {
		  // レビュー票の追加または更新を実行
		  const updatedVote = await ReviewVoteModel.addOrUpdateVote(review_id, user_id, score);
	
		  res.status(200).json(updatedVote);
		} catch (error) {
			 // 型アサーションを使用して PostgrestError 型に変換
			 const e = error as PostgrestError;
		  // エラーコードが 23503 の場合、レビューや記事が存在しないエラー
		  if (e.code === "23503") {
			res.status(404).json({ 
			  error: "Article or Review not found." // 23503 エラーは外部キー制約違反（記事またはレビューが存在しない場合）
			});
		  }
	
		  res.status(500).json({ error: "Failed to update review vote." });
		}
	  },
	deleteVote: (req: Request, res: Response) => {
		const { articleId, reviewId, userId } = req.params;
		ReviewVoteModel.deleteVote(Number.parseInt(reviewId), articleId, userId);
		res.status(200).send("Vote deleted");
	},
};
