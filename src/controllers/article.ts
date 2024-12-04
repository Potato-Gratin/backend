import type { Request, Response } from "express";
import { ArticleModel } from "../models/article";

export const ArticleController = {
	createArticle: async (req: Request, res: Response) => {
		let data = req.body;

		const result = await ArticleModel.createArticle(data);
		if (result.isSuccess()) {
			res.status(201).json(result.value);
		} else {
			const e = result.value;
			switch (e.code) {
				case "23503":   // 外部キー制約違反
					res.status(404).json({ message: e.message });
					break;
				default:
					res.status(500).json({ message: e.message });
			}
		}
	},

	findAll: async (req: Request, res: Response) => {
		try {
			const { page: pageStr = "1" } = req.query;

			if (typeof pageStr !== "string") {
				res
					.status(400)
					.json({ message: "Query parameter 'page' must be a number" });
				return;
			}

			const articles = await ArticleModel.findAll(Number.parseInt(pageStr));
			res.status(200).json(articles);
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	},

	/**
	 * 記事をIDで検索する
	 * @param req
	 * @param res
	 */
	findById: async (req: Request, res: Response) => {
		try {
			const { displayId } = req.params;

			const article = await ArticleModel.findById(displayId);

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
			res.status(500).json({ message: "Internal Server Error: " });
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
