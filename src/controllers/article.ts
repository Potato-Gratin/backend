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
			res.status(500).json({
				message: "Internal Server Error",
			});
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
				res.status(500).json({ message: "Internal Server Error" });
			} else {
				res.status(500).json({
					message: "An unknown error occurred while updating the article.",
				});
			}
		}
	},

	create: async (req: Request, res: Response) => {
		try {
			const { title, content, user_id } = req.body;
			const newArticle = await ArticleModel.create({ title, content, user_id });
			res.status(201).json(newArticle);
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	},
	search: async (req: Request, res: Response) => {
		try {
			const { q, page: pageStr = "1" } = req.query;

			if (!q || typeof q !== "string") {
				res.status(400).json({ message: "Query parameter 'q' is required" });
				return;
			}
			if (typeof pageStr !== "string") {
				res
					.status(400)
					.json({ message: "Query parameter 'page' must be a number" });
				return;
			}

			const articles = await ArticleModel.search(q, Number.parseInt(pageStr));
			res.status(200).json(articles);
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	},
	update: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const updatedArticle = await ArticleModel.updateById(id, req.body);
			if (!updatedArticle) {
				res.status(404).json({ message: "Article not found" });
			} else {
				res.status(200).json(updatedArticle);
			}
		} catch (error) {
			res.status(400).json({ message: "Bad Request" });
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;
			const deletedArticle = await ArticleModel.deleteById(id);
			if (!deletedArticle) {
				res.status(404).json({ message: "Article not found" });
			} else {
				res.status(200).json({ message: "Article deleted successfully" });
			}
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	},
};
