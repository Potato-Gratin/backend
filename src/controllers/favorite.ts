import type { Request, Response } from "express";
import { ArticleModel } from "../models/article";
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

const createFavorite = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { user_id } = req.body;

	try {
		// 記事IDが存在するか確認
		const article = await ArticleModel.findById(id);
		if (!article) {
			res.status(404).json({ message: "Article not found" });
		}

		// 新しい「いいね」を作成
		const newFavorite = FavoriteModel.createFavorite(user_id, id);
		res.status(201).json(newFavorite);
	} catch (error) {
		res.status(500).json({ message: "Failed to create favorite." });
	}
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
	createFavorite,
	removeFavorite,
};
