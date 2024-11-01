import express from "express";
import { UserController } from '../controllers/user'; 

export const router = express.Router();

router.post("/", UserController.createUser);

export default router;