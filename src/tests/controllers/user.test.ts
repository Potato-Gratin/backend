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
				message: "user creation failed",
			});
		});
	});

	describe("findByDisplayId", () => {
		let req: Partial<Request>;
		let res: Partial<Response>;
		let statusMock: jest.Mock;
		let jsonMock: jest.Mock;

		beforeEach(() => {
			req = {
				params: {
					displayId: "testDisplayId",
				},
			};
			statusMock = jest.fn().mockReturnThis();
			jsonMock = jest.fn();
			res = {
				status: statusMock,
				json: jsonMock,
			};
		});

		it("ユーザーが見つかった場合、200 OK を返すか", async () => {
			const user = {
				displayId: "testDisplayId",
				name: "testName",
				description: "testDescription",
			};

			(UserModel.findByDisplayId as jest.Mock).mockResolvedValue(user);

			await UserController.findByDisplayId(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(200);
			expect(jsonMock).toHaveBeenCalledWith(user);
		});

		it("ユーザーが見つからない場合、404 Not Found を返すか", async () => {
			(UserModel.findByDisplayId as jest.Mock).mockResolvedValue(null);

			await UserController.findByDisplayId(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(404);
			expect(jsonMock).toHaveBeenCalledWith({ message: "User not found" });
		});

		it("サーバーエラーが発生した場合、500 Internal Server Error を返すか", async () => {
			(UserModel.findByDisplayId as jest.Mock).mockRejectedValue(
				new Error("some other error"),
			);

			await UserController.findByDisplayId(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(500);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "Internal Server Error",
			});
		});
	});

	describe("updateByDisplayId", () => {
		let req: Partial<Request>;
		let res: Partial<Response>;
		let statusMock: jest.Mock;
		let jsonMock: jest.Mock;

		beforeEach(() => {
			req = {
				params: {
					displayId: "testDisplayId",
				},
				body: {
					name: "updatedName",
					description: "updatedDescription",
				},
			};
			statusMock = jest.fn().mockReturnThis();
			jsonMock = jest.fn();
			res = {
				status: statusMock,
				json: jsonMock,
			};
		});

		it("正常に更新された場合、200 OK を返すか", async () => {
			const updatedUser = {
				displayId: "testDisplayId",
				name: "updatedName",
				description: "updatedDescription",
			};

			(UserModel.updateByDisplayId as jest.Mock).mockResolvedValue(updatedUser);

			await UserController.updateByDisplayId(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(200);
			expect(jsonMock).toHaveBeenCalledWith(updatedUser);
		});

		it("display_id が重複している場合、409 Conflicted を返すか", async () => {
			(UserModel.updateByDisplayId as jest.Mock).mockRejectedValue(
				new Error("displayId is conflicted"),
			);

			await UserController.updateByDisplayId(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(409);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "displayId is conflicted",
			});
		});

		it("サーバーエラーが発生した場合、500 Internal Server Error を返すか", async () => {
			(UserModel.updateByDisplayId as jest.Mock).mockRejectedValue(
				new Error("some other error"),
			);

			await UserController.updateByDisplayId(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(500);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "user creation failed",
			});
		});
	});
});
