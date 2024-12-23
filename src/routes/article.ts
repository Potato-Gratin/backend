import express from "express";
import { ArticleController } from "../controllers/article";

export const articleRouter = express.Router();

articleRouter.post("/", ArticleController.createArticle);
articleRouter.get("/", ArticleController.findAll);
articleRouter.get("/search", ArticleController.search);
articleRouter.get("/users/:displayId", ArticleController.findById);
articleRouter.get("/:id", ArticleController.findById);
articleRouter.patch("/:id", ArticleController.updateById);
articleRouter.delete("/:id", ArticleController.delete);
