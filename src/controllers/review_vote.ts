import type { Request, Response } from "express";
import { ReviewVoteModel } from "../models/review_vote";

export const ReviewVoteController = {
	getReviewScore: async (req: Request, res: Response) => {
        const { reviewId, articleId } = req.params;

        try {
            // モデルからスコア合計を取得
            const totalScore = await ReviewVoteModel.getReviewScore(reviewId, articleId);

            if (totalScore === null) {
                // 記事かレビューが存在しない場合
                res.status(404).json({
                    message: `Article with ID ${articleId} or Review with ID ${reviewId} not found.`,
                });
				return;
            }

            res.status(200).json({ reviewId, articleId, score: totalScore });
        } catch (error) {
            res.status(500).json({
                message: `Failed to fetch review score`,
            });
        }
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
	deleteVote: (req: Request, res: Response) => {
		const { articleId, reviewId, userId } = req.params;
		ReviewVoteModel.deleteVote(Number.parseInt(reviewId), articleId, userId);
		res.status(200).send("Vote deleted");
	},
};
