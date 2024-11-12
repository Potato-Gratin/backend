import express from "express";
import { UserController } from "../controllers/user";

export const userRouter = express.Router();

userRouter.post("/", UserController.createUser);

export default userRouter;
