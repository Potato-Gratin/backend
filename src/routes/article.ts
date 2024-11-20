import express from "express";
import { ArticleController } from "../controllers/article";

export const articleRouter = express.Router();

articleRouter.post("/", ArticleController.create);
articleRouter.get("/search", ArticleController.search);
articleRouter.get("/users/:displayId", ArticleController.findById);
articleRouter.patch("/:id", ArticleController.updateById);
articleRouter.delete("/:id", ArticleController.delete);
