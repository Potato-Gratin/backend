import type { Request, Response } from "express";
import { UserModel } from "../models/user";

export const UserController = {
	/**
	 * 新しいユーザーを作成する
	 * @param req
	 * @param res
	 */
	createUser: async (req: Request, res: Response) => {
		// リクエストボディからユーザー情報を取得
		const form = req.body;
		if (!form) {
			res.status(400).json({ message: "Request body is required" });
			return;
		}

		const result = await UserModel.create(form);
		if (result.isSuccess()) {
			const user = result.value;
			res.status(201).json(user);
		} else {
			const e = result.value;
			if (e.code === "23505") { // 一意制約違反
				res.status(409).json({ message: e.message });
			} else {
				res.status(500).json({ message: e.message });
			}
		}
	},

	search: async (req: Request, res: Response) => {
		try {
			const { q, page: pageStr = "1" } = req.query;

			if (!q || typeof q !== "string") {
				res.status(400).json({ message: "Query parameter 'q' is required" });
				return;
			}
			if (typeof pageStr !== "string") {
				res
					.status(400)
					.json({ message: "Query parameter 'page' must be a number" });
				return;
			}

			const users = await UserModel.search(q, Number.parseInt(pageStr, 10));
			res.status(200).json(users);
		} catch (error) {
			res.status(500).json({ message: "Internal Server Error: " });
		}
	},

	findById: async (req: Request, res: Response) => {
		try {
			const { id } = req.params;

			const user = await UserModel.findById(id);

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
	},

	updateByDisplayId: async (req: Request, res: Response) => {
		try {
			const displayId = req.params.displayId;
			const updateData = req.body;

			const updatedUser = await UserModel.updateByDisplayId(
				displayId,
				updateData,
			);
			res.status(200).json(updatedUser);
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
						message: "user creation failed",
					});
				}
			} else {
				res.status(500).json({
					message: "An unknown error occurred",
				});
			}
		}
	},
};
