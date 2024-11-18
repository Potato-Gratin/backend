import type { Request, Response } from "express";
import { ArticleModel } from "../models/article";

export const ArticleController = {
	/**
	 * 記事をIDで検索する
	 * @param req
	 * @param res
	 */
	findById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const article = await ArticleModel.findById(id);

			if (!article) {
				res.status(404).json({ message: "Article not found" });
			} else {
				res.status(200).json(article);
			}
		} catch (error) {
			res.status(500).json({ message: "Failed to retrieve the article. Please try again later." });
		}
	},

	/**
	 * 記事をIDで更新する
	 * @param req
	 * @param res
	 */
	updateById: async (req: Request, res: Response) => {
		try {
			const id = req.params.id;
			const updateData = req.body;

			const updatedArticle = await ArticleModel.updateById(id, updateData);

			res.status(200).json(updatedArticle);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "Article not found") {
					res.status(404).json({ message: "Article not found" }); // 404 Not Found
					return;
				}
				if (error.message === "Invalid update data") {
					res.status(400).json({ message: "Invalid update data" }); // 400 Bad Request
					return;
				}
				res.status(500).json({ message: `Unexpected error: ${error.message}` });
			} else {
				res.status(500).json({ message: "An unknown error occurred while updating the article." });
			}
		}
	},
};
