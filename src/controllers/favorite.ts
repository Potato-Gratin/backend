import type { Request, Response } from "express";
import { ArticleModel } from "../models/article";
import { FavoriteModel } from "../models/favorite";

export const FavoriteController = {
	/**
	 * 記事のいいね数を取得する
	 * @param req
	 * @param res
	 */
	getFavoriteCount: async (req: Request, res: Response): Promise<void> => {
		try {
			const { id: articleId } = req.params;

			// 記事が存在するか確認
			const article = await ArticleModel.findById(articleId);
			if (!article) {
				res.status(404).json({ message: "Article not found" });
				return;
			}

			const favoriteCount = await FavoriteModel.getFavoriteCount(articleId);

			res.status(200).json({ articleId, favoriteCount });
		} catch (error) {
			res.status(500).json({ message: "Failed to retrieve favorite count." });
		}
	},

	// TODO: 実装
	addFavorite: (req: Request, res: Response) => {
		const { id } = req.params;
		const { user_id } = req.body;
		const newFavorite = FavoriteModel.addFavorite(user_id, id);
		res.status(201).json(newFavorite);
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
