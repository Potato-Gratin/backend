import express from "express";
import { ArticleController } from "../controllers/article";

export const articleRouter = express.Router();

articleRouter.get("/:id", ArticleController.findById);
articleRouter.post("/", ArticleController.create);
articleRouter.get("/search", ArticleController.search);
articleRouter.patch("/:id", ArticleController.update);
articleRouter.delete("/:id", ArticleController.delete);
