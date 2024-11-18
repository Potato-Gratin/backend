import { Request, Response } from "express";
import { FavoriteModel } from "../models/favorite";

const getFavoriteCount = (req: Request, res: Response) => {
  const { id } = req.params;
  const favorites = FavoriteModel.getFavoritesByArticleId(id);
  if (favorites) {
    res.json({ count: favorites.length });
  } else {
    res.status(404).send("Article not found");
  }
};

const addFavorite = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const newFavorite = FavoriteModel.addFavorite(user_id, id);
  res.status(201).json(newFavorite);
};

const removeFavorite = (req: Request, res: Response) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const removedFavorite = FavoriteModel.removeFavorite(user_id, id);
  if (removedFavorite) {
    res.json(removedFavorite);
  } else {
    res.status(404).send("Favorite not found");
  }
};

export const FavoriteController = {
  getFavoriteCount,
  addFavorite,
  removeFavorite
};
