import type { Request, Response } from "express";
import { ArticleModel } from "../models/article";

export const ArticleController = {
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
			res.status(500).json({ message: "Internal Server Error" });
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
