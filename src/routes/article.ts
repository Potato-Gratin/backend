import express from "express";
import { UserController } from "../controllers/user";

export const articleRouter = express.Router();

articleRouter.get("/users/:displayId/articles", UserController.findByDisplayId);
