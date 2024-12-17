import type { Request, Response } from "express";
import { BadgeModel } from "../models/badge";

export const BadgeController = {
	addBadge: (req: Request, res: Response) => {
		const { articleId, reviewId } = req.params;
		const userId = req.body.userId;
		const badge = BadgeModel.addBadge(
			articleId,
			Number.parseInt(reviewId),
			userId,
		);
		res.status(201).json(badge);
	},
	getBadgesByReview: async (req: Request, res: Response) => {
		const { reviewId } = req.params;
		const result = await BadgeModel.getBadgesByReview(reviewId);
		if (result.isFailure()) {
			const e = result.value;
			console.log(e);
			res.status(500).json({ message: e.message });
			return;
		}

		const badge = result.value;
		if (!badge) {
			res.status(404).json({ message: "badge not found" });
		}
		res.status(200).json(badge);
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
	},
};
