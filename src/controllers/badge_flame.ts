import { Request, Response } from "express";
import { BadgeFlame } from "../models/badge_flame";

// バッジフレーム一覧取得
export const getBadgeFlames = async (req: Request, res: Response) => {
  try {
    const badgeFlames = await BadgeFlame.findAll();
    res.json(badgeFlames);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// バッジフレーム取得
export const getBadgeFlameById = async (req: Request, res: Response) => {
  try {
    const badgeFlame = await BadgeFlame.findById(parseInt(req.params.badgeFlameId, 10));
    if (badgeFlame) {
      res.json(badgeFlame);
    } else {
      res.status(404).json({ error: "Badge Flame Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
