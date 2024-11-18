import express from "express";
import { FavoriteController } from "../controllers/favorite";

export const favoriteRouter = express.Router();

favoriteRouter.get("/:id/favorites", FavoriteController.getFavoriteCount);
