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
			res.status(400).json({ message: "Request must be have data." });
			return;
		}

		const result = await UserModel.create(form);
		if (result.isFailure()) {
			const e = result.value;
			if (e.code === "23505") {
				// 一意制約違反
				res.status(409).json({ message: e.message });
			} else {
				console.log(e);
				res.status(500).json({ message: e.message });
			}
		}

		const user = result.value;
		res.status(201).json(user);
	},

	search: async (req: Request, res: Response) => {
		const { q, page: pageStr = "1" } = req.query;

		if (!q || typeof q !== "string") {
			res.status(400).json({ message: "Query param 'q' is required." });
			return;
		}
		if (typeof pageStr !== "string") {
			res.status(400).json({ message: "Query param 'page' is invalid." });
			return;
		}
		const page = Number.parseInt(pageStr, 10);
		if (Number.isNaN(page) || page <= 0) {
			res
				.status(400)
				.json({
					message:
						"Query parameter 'page' must be an integer greater than or equal to 1.",
				});
		}

		const result = await UserModel.search(q, page);
		if (result.isFailure()) {
			const e = result.value;
			console.log(e);
			res.status(500).json({ message: e.message });
		}

		const users = result.value;
		res.status(200).json(users);
	},

	findById: async (req: Request, res: Response) => {
		const { id } = req.params;

		const result = await UserModel.findById(id);
		if (result.isFailure()) {
			const e = result.value;
			console.log(e);
			res.status(500).json({ message: e.message });
			return;
		}

		const user = result.value;
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	},

	findByDisplayId: async (req: Request, res: Response) => {
		const { displayId } = req.params;

		const result = await UserModel.findByDisplayId(displayId);
		if (result.isFailure()) {
			const e = result.value;
			console.log(e);
			res.status(500).json({ message: e.message });
			return;
		}

		const user = result.value;
		if (!user) {
			res.status(404).json({ message: "User not found" });
		}
		res.status(200).json(user);
	},

	updateByDisplayId: async (req: Request, res: Response) => {
		const displayId = req.params.displayId;
		const updateData = req.body;

		if (!updateData) {
			res.status(400).json({ message: "Request must be have data." });
			return;
		}

		const result = await UserModel.updateByDisplayId(displayId, updateData);

		if (result.isFailure()) {
			const e = result.value;
			switch (e.code) {
				case "23505":
					res.status(409).json({ message: e.message });
					return;
				case "23514":
					res.status(400).json({ message: e.message });
					return;
				default:
					console.log(e);
					throw new Error(`Database Error: ${e.message}`);
			}
		}

		const updatedUser = result.value;
		res.status(200).json(updatedUser);
	},
};
