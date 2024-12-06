import express from "express";
import { UserController } from "../controllers/user";

export const userRouter = express.Router();

userRouter.post("/", UserController.createUser);
userRouter.get("/search", UserController.search);
userRouter.get("/:id", UserController.findById);
userRouter.get("/:displayId", UserController.findByDisplayId);
userRouter.patch("/:displayId", UserController.updateByDisplayId);

export default userRouter;
