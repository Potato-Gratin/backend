import express from "express";
import { BadgeTextController } from "../controllers/badge_text";

export const badgeTextRouter = express.Router();

badgeTextRouter.get("/", BadgeTextController.getBadgeTexts);
badgeTextRouter.get("/:badgeTextId", BadgeTextController.getBadgeTextById);

