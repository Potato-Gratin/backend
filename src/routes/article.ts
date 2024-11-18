import express from "express";
import { ArticleController } from "../controllers/article";

export const articleRouter = express.Router();

articleRouter.get("/:id", ArticleController.findById);
articleRouter.patch("/:id", ArticleController.updateById);
