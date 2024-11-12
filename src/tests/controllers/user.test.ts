import type { Request, Response } from "express";
import { UserController } from "../../controllers/user";
import { UserModel } from "../../models/user";

jest.mock("../../models/user");

describe("UserController", () => {
	describe("createUser", () => {
		let req: Partial<Request>;
		let res: Partial<Response>;
		let statusMock: jest.Mock;
		let jsonMock: jest.Mock;

		beforeEach(() => {
			req = {
				body: {
					user: {
						displayId: "testDisplayId",
						name: "testName",
						description: "testDescription",
					},
				},
			};
			statusMock = jest.fn().mockReturnThis();
			jsonMock = jest.fn();
			res = {
				status: statusMock,
				json: jsonMock,
			};
		});

		it("正常に終了した場合、201 created を返すか", async () => {
			(UserModel.create as jest.Mock).mockResolvedValue(req.body.user);

			await UserController.createUser(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(201);
			expect(jsonMock).toHaveBeenCalledWith(req.body.user);
		});

		it("display_idが存在しない場合、400 Bad Requests を返すか", async () => {
			req.body.user.displayId = "";

			await UserController.createUser(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(400);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "displayId is required",
			});
		});

		it("nameが存在しない場合、400 Bad Requests を返すか", async () => {
			req.body.user.name = "";

			await UserController.createUser(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(400);
			expect(jsonMock).toHaveBeenCalledWith({ message: "name is required" });
		});

		it("display_id が重複している場合、409 Conflicted を返すか", async () => {
			(UserModel.create as jest.Mock).mockRejectedValue(
				new Error("displayId is conflicted"),
			);

			await UserController.createUser(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(409);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "displayId is conflicted",
			});
		});

		it("サーバーエラーが発生した場合、500 Internal Server Error を返すか", async () => {
			(UserModel.create as jest.Mock).mockRejectedValue(
				new Error("some other error"),
			);

			await UserController.createUser(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(500);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "ユーザーの作成に失敗しました",
				error: "some other error",
			});
		});
	});
});
