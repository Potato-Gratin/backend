import express from "express";
import { FavoriteController } from "../controllers/favorite";

export const favoriteRouter = express.Router();

favoriteRouter.get("/:id/count", FavoriteController.getFavoriteCount);
favoriteRouter.post("/:id", FavoriteController.addFavorite);
favoriteRouter.delete("/:id", FavoriteController.removeFavorite);
