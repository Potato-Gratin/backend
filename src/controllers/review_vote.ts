import { Request, Response } from "express";
import { ReviewVoteModel } from "../models/review_vote";

export const ReviewVoteController = {
  getScore: (req: Request, res: Response) => {
    const { articleId, reviewId } = req.params;
    const votes = ReviewVoteModel.getReviewVotes().filter(
      (vote) => vote.article_id === articleId && vote.review_id === parseInt(reviewId)
    );
    if (votes.length === 0) {
      res.status(404).send("Not Found");
      return
    }
    const score = votes.reduce((total, vote) => total + vote.score, 0);
    res.json({ score });
  },
  addOrUpdateVote: (req: Request, res: Response) => {
    const { articleId, reviewId } = req.params;
    const { user_id, score } = req.body;
    ReviewVoteModel.addOrUpdateVote({ review_id: parseInt(reviewId), article_id: articleId, user_id, score });
    res.status(200).send("Vote added or updated");
  },
  deleteVote: (req: Request, res: Response) => {
    const { articleId, reviewId, userId } = req.params;
    ReviewVoteModel.deleteVote(parseInt(reviewId), articleId, userId);
    res.status(200).send("Vote deleted");
  },
};
