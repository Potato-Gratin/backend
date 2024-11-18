import express from "express";
import { BadgeTextController } from "../controllers/badge_text";

const router = express.Router();

router.get("/", BadgeTextController.getBadgeTexts);
router.get("/:badgeTextId", BadgeTextController.getBadgeTextById);

export default router;
