import express from "express";
import { getBadgeFlames, getBadgeFlameById } from "../controllers/badge_flame";

export const badgeFlameRouter = express.Router();

badgeFlameRouter.get("/badge_flames", getBadgeFlames);
badgeFlameRouter.get("/badge_flames/:badgeFlameId", getBadgeFlameById);
