import express from "express";
import { ArticleController } from "../controllers/article";

export const articleRouter = express.Router();

articleRouter.get("/search", ArticleController.search);
articleRouter.get("/:id", ArticleController.findById);
articleRouter.patch("/:id", ArticleController.updateById);
articleRouter.post("/", ArticleController.create);
articleRouter.delete("/:id", ArticleController.delete);
