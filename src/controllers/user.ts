import type { Request, Response } from "express";
import { UserModel } from "../models/user";

export const UserController = {
	/**
	 * 新しいユーザーを作成する
	 * @param req
	 * @param res
	 */
	createUser: async (req: Request, res: Response) => {
		try {
			const { displayId, name, description } = req.body.user;

			// リクエストデータのバリデーション
			if (!displayId) {
				res.status(400).json({ message: "displayId is required" });
			}
			if (!name) {
				res.status(400).json({ message: "name is required" });
			}

			// ユーザー作成処理
			const user = await UserModel.create(displayId, name, description);

			res.status(201).json(user);
		} catch (error) {
			if (error instanceof Error) {
				if (error.message === "displayId is conflicted") {
					res.status(409).json({ message: error.message });
				} else if (
					error.message === "displayId is required" ||
					error.message === "name is required"
				) {
					res.status(400).json({ message: error.message });
				} else {
					res.status(500).json({
						message: "ユーザーの作成に失敗しました",
					});
				}
			} else {
				res.status(500).json({
					message: "不明なエラーが発生しました",
				});
			}
		}
	},

  findById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const user = await UserModel.findByDisplayId(id);

			if (!user) {
				res.status(404).json({ message: "User not found" });
			} else {
				res.status(200).json(user);
			}
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	},

	findByDisplayId: async (req: Request, res: Response) => {
		try {
			const { displayId } = req.params;

			const user = await UserModel.findByDisplayId(displayId);

			if (!user) {
				res.status(404).json({ message: "User not found" });
			} else {
				res.status(200).json(user);
			}
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error" });
		}
	}
};
