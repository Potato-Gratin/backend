import express from "express";
import { FavoriteController } from "../controllers/favorite";

export const favoriteRouter = express.Router();

favoriteRouter.get("/count", FavoriteController.getFavoriteCount);
favoriteRouter.post("/", FavoriteController.addFavorite);
favoriteRouter.delete("/", FavoriteController.removeFavorite);
