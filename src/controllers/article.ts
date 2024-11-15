import type { Request, Response } from "express";
import { ArticleModel } from "../models/article";

export const ArticleController = {
    /**
	 * 新しいユーザーを作成する
	 * @param req
	 * @param res
	 */
   findById: async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const article = await ArticleModel.findById(id);

        if (!article) {
            res.status(404).json({ message: "Article not found"});
        } else {
            res.status(200).json(article);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error"});
    }
   }
}