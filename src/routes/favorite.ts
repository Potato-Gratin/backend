import express from "express";
import { FavoriteController } from "../controllers/favorite";

export const favoriteRouter = express.Router();

favoriteRouter.get("/:id/count", FavoriteController.getFavoriteCount);
favoriteRouter.post("/:id", FavoriteController.createFavorite);
favoriteRouter.delete("/:id", FavoriteController.removeFavorite);
