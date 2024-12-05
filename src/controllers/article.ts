import type { Request, Response } from "express";
import { ArticleModel } from "../models/article";

export const ArticleController = {
	createArticle: async (req: Request, res: Response) => {
		const data = req.body;

		const result = await ArticleModel.createArticle(data);
		if (result.isSuccess()) {
			res.status(201).json(result.value);
		} else {
			const e = result.value;
			if (e.code === "23503") {
				// 外部キー制約違反
				res.status(404).json({ message: e.message });
			} else {
				res.status(500).json({ message: e.message });
			}
		}
	},

	findAll: async (req: Request, res: Response) => {
		const { page: pageStr = "1" } = req.query;
		if (typeof pageStr !== "string") {
			res.status(400).json({ message: "Query param 'page' is invalid." });
			return;
		}
		const page = Number.parseInt(pageStr, 10);
		if (Number.isNaN(page) || page <= 0) {
			res.status(400).json({
				message:
					"Query parameter 'page' must be an integer greater than or equal to 1.",
			});
		}

		const result = await ArticleModel.findAll(page);
		if (result.isFailure()) {
			const e = result.value;
			console.log(e);
			res.status(500).json({ message: e.message })
		}

		const articles = result.value;
		res.status(200).json(articles);
	},

	/**
	 * 記事をIDで検索する
	 * @param req
	 * @param res
	 */
	findById: async (req: Request, res: Response) => {
		const { displayId } = req.params;

		const result = await ArticleModel.findById(displayId);
		if (result.isFailure()) {
			const e = result.value;
			console.log(e);
			res.status(500).json({ message: e.message })
		}

		const article = result.value
		if (!article) {
			res.status(404).json({ message: "Article not found" });
		}
		res.status(200).json(article);
	},

	/**
	 * 記事をIDで更新する
	 * @param req
	 * @param res
	 */
	updateById: async (req: Request, res: Response) => {
		const id = req.params.id;
		const updateData = req.body;

		const result = await ArticleModel.updateById(id, updateData);
		if (result.isFailure()) {
			const e = result.value
			switch (e.code) {
				case "23502":
					throw new Error("Missing required fields"); // 必須フィールドエラー
				default:
					throw new Error(`Database Error: ${e.message}`);
			}
		}

		const article = result.value
		res.status(200).json(article);
	},

	search: async (req: Request, res: Response) => {
		const { q, page: pageStr = "1" } = req.query;

		if (!q || typeof q !== "string") {
			res.status(400).json({ message: "Query param 'q' is required." });
			return;
		}
		if (typeof pageStr !== "string") {
			res.status(400).json({ message: "Query param 'page' is invalid." });
			return;
		}
		const page = Number.parseInt(pageStr, 10);
		if (Number.isNaN(page) || page <= 0) {
			res.status(400).json({
				message:
					"Query parameter 'page' must be an integer greater than or equal to 1.",
			});
		}

		const result = await ArticleModel.search(q, page);
		if (result.isFailure()) {
			const e = result.value
			console.log(e);
			res.status(500).json({ message: e.message })
		}

		const articles = result.value
		res.status(200).json(articles);
	},

	update: async (req: Request, res: Response) => {
		const { id } = req.params;
		const result = await ArticleModel.updateById(id, req.body);
		if (result.isFailure()) {
			const e = result.value
			console.log(e);
			res.status(500).json({ message: e.message })
		}

		const article = result.value
		if (!article) {
			res.status(404).json({ message: "Article not found" });
		}
		res.status(200).json(article);
	},

	// TODO: Result 型を使用した応答に置き換え
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
