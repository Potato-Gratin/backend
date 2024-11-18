import { Request, Response } from 'express';
import { BadgeModel } from '../models/badge';

export const BadgeController = {
  addBadge: (req: Request, res: Response) => {
    const { articleId, reviewId } = req.params;
    const userId = req.body.userId;
    const badge = BadgeModel.addBadge(articleId, parseInt(reviewId), userId);
    res.status(201).json(badge);
  },
  getBadgesByReview: (req: Request, res: Response) => {
    const { articleId, reviewId } = req.params;
    const badges = BadgeModel.getBadgesByReview(articleId, parseInt(reviewId));
    res.status(200).json(badges);
  },
  getReceivedBadges: (req: Request, res: Response) => {
    const { displayId } = req.params;
    const badges = BadgeModel.getReceivedBadges(displayId);
    res.status(200).json(badges);
  },
  getSentBadges: (req: Request, res: Response) => {
    const { displayId } = req.params;
    const badges = BadgeModel.getSentBadges(displayId);
    res.status(200).json(badges);
  }
};
