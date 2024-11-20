import type { Request, Response } from "express";
import { FavoriteController } from "../../controllers/favorite";
import { ArticleModel } from "../../models/article";
import { FavoriteModel } from "../../models/favorite";

jest.mock("../../models/article");
jest.mock("../../models/favorite");

describe("FavoriteController", () => {
	describe("getFavoriteCount", () => {
		let req: Partial<Request>;
		let res: Partial<Response>;
		let statusMock: jest.Mock;
		let jsonMock: jest.Mock;

		beforeEach(() => {
			req = {
				params: {
					id: "testArticleId",
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
			const article = { id: "testArticleId" };
			const favoriteCount = 5;

			(ArticleModel.findById as jest.Mock).mockResolvedValue(article);
			(FavoriteModel.getFavoriteCount as jest.Mock).mockResolvedValue(
				favoriteCount,
			);

			await FavoriteController.getFavoriteCount(
				req as Request,
				res as Response,
			);

			expect(statusMock).toHaveBeenCalledWith(200);
			expect(jsonMock).toHaveBeenCalledWith({
				articleId: "testArticleId",
				favoriteCount,
			});
		});

		it("記事が見つからない場合、404 Not Found を返すか", async () => {
			(ArticleModel.findById as jest.Mock).mockResolvedValue(null);

			await FavoriteController.getFavoriteCount(
				req as Request,
				res as Response,
			);

			expect(statusMock).toHaveBeenCalledWith(404);
			expect(jsonMock).toHaveBeenCalledWith({ message: "Article not found" });
		});

		it("サーバーエラーが発生した場合、500 Internal Server Error を返すか", async () => {
			(ArticleModel.findById as jest.Mock).mockRejectedValue(
				new Error("some other error"),
			);

			await FavoriteController.getFavoriteCount(
				req as Request,
				res as Response,
			);

			expect(statusMock).toHaveBeenCalledWith(500);
			expect(jsonMock).toHaveBeenCalledWith({
				message: "Failed to retrieve favorite count.",
			});
		});
	});
});
