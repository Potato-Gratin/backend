import type { Request, Response } from "express";
import { FavoriteModel } from "../models/favorite";

export const FavoriteController = {
	createFavorite: async (req: Request, res: Response) => {
		const { id: article_id } = req.params;
		const { user_id } = req.body;
		if (!user_id) {
			res.status(400).json({ message: "user_id is required." });
			return;
		}

		const newFavorite = await FavoriteModel.createFavorite(user_id, article_id);
		res.status(201).json(newFavorite);
	},

	/**
	 * 記事のいいね数を取得する
	 * @param req
	 * @param res
	 */
	getFavoriteCount: async (req: Request, res: Response): Promise<void> => {
		const { id: articleId } = req.params;

		const result = await FavoriteModel.getFavoriteCount(articleId);
		if (result.isFailure()) {
			const e = result.value;
			console.log(e);
			res.status(500).json({ message: e.message });
		}

		const count = result.value;
		res.status(200).json({ count });
	},

	// TODO: 実装
	removeFavorite: (req: Request, res: Response) => {
		const { id } = req.params;
		const { user_id } = req.body;
		const removedFavorite = FavoriteModel.removeFavorite(user_id, id);
		if (removedFavorite) {
			res.json(removedFavorite);
		} else {
			res.status(404).send("Favorite not found");
		}
	},
};
