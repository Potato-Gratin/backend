import type { Request, Response } from "express";
import { ArticleController } from "../../controllers/article";
import { ArticleModel } from "../../models/article";

jest.mock("../../models/article");

describe("ArticleController", () => {
	describe("findById", () => {
		let req: Partial<Request>;
		let res: Partial<Response>;
		let statusMock: jest.Mock;
		let jsonMock: jest.Mock;

		beforeEach(() => {
			req = {
				params: {
					id: "testId",
				},
			};
			statusMock = jest.fn().mockReturnThis();
			jsonMock = jest.fn();
			res = {
				status: statusMock,
				json: jsonMock,
			};
		});

		it("記事が見つかった場合、200 OK を返すか", async () => {
			const article = {
				id: "testId",
				title: "testTitle",
				content: "testContent",
				user_id: "testUserId",
			};

			(ArticleModel.findById as jest.Mock).mockResolvedValue(article);

			await ArticleController.findById(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(200);
			expect(jsonMock).toHaveBeenCalledWith(article);
		});

		it("記事が見つからない場合、404 Not Found を返すか", async () => {
			(ArticleModel.findById as jest.Mock).mockResolvedValue(null);

			await ArticleController.findById(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(404);
			expect(jsonMock).toHaveBeenCalledWith({ message: "Article not found" });
		});

		it("サーバーエラーが発生した場合、500 Internal Server Error を返すか", async () => {
			(ArticleModel.findById as jest.Mock).mockRejectedValue(
				new Error("some other error"),
			);

			await ArticleController.findById(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(500);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "Internal Server Error",
			});
		});
	});

	describe("updateById", () => {
		let req: Partial<Request>;
		let res: Partial<Response>;
		let statusMock: jest.Mock;
		let jsonMock: jest.Mock;

		beforeEach(() => {
			req = {
				params: {
					id: "testId",
				},
				body: {
					title: "updatedTitle",
					content: "updatedContent",
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
			const updatedArticle = {
				id: "testId",
				title: "updatedTitle",
				content: "updatedContent",
				user_id: "testUserId",
			};

			(ArticleModel.updateById as jest.Mock).mockResolvedValue(updatedArticle);

			await ArticleController.updateById(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(200);
			expect(jsonMock).toHaveBeenCalledWith(updatedArticle);
		});

		it("記事が見つからない場合、404 Not Found を返すか", async () => {
			(ArticleModel.updateById as jest.Mock).mockRejectedValue(
				new Error("Article not found"),
			);

			await ArticleController.updateById(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(404);
			expect(jsonMock).toHaveBeenCalledWith({ message: "Article not found" });
		});

		it("無効な更新データの場合、400 Bad Request を返すか", async () => {
			(ArticleModel.updateById as jest.Mock).mockRejectedValue(
				new Error("Invalid update data"),
			);

			await ArticleController.updateById(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(400);
			expect(jsonMock).toHaveBeenCalledWith({ message: "Invalid update data" });
		});

		it("サーバーエラーが発生した場合、500 Internal Server Error を返すか", async () => {
			(ArticleModel.updateById as jest.Mock).mockRejectedValue(
				new Error("some other error"),
			);

			await ArticleController.updateById(req as Request, res as Response);

			expect(statusMock).toHaveBeenCalledWith(500);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "Internal Server Error",
			});
		});
	});
});
