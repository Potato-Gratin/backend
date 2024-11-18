import type { Request, Response } from "express";
import { BadgeTextModel } from "../models/badge_text";

const getBadgeTexts = (req: Request, res: Response): void => {
	const badgeTexts = BadgeTextModel.getAllBadgeTexts();
	res.json(badgeTexts);
};

const getBadgeTextById = (req: Request, res: Response): void => {
	const id = Number.parseInt(req.params.badgeTextId, 10);
	const badgeText = BadgeTextModel.getBadgeTextById(id);
	if (badgeText) {
		res.json(badgeText);
	} else {
		res.status(404).send("Badge text not found");
	}
};

export const BadgeTextController = {
	getBadgeTexts,
	getBadgeTextById,
};
