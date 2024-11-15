import type { Request, Response } from "express";
import { ArticleController } from "../../controllers/article";
import { ArticleModel } from "../../models/article";
import { UserModel } from "../../models/user";
import supabase from "../../libs/supabase";

jest.mock("../../models/article");
jest.mock("../../models/user");

let testUserId: string;

describe("ArticleController", () => {
  describe("createArticle", () => {
    let req: Partial<Request>;
    let res: Partial<Response>;
    let statusMock: jest.Mock;
    let jsonMock: jest.Mock;

    beforeAll(async () => {
      const { data: user, error } = await supabase.from("user").insert({
        display_id: "test_display_id",
        name: "test_user_name",
        description: "test_user_description",
      }).select().single();
      if (error) throw error;
      testUserId = user.id;
    });

    afterAll(async () => {
      await supabase.from("user").delete().eq("id", testUserId);
    });

    beforeEach(() => {
      req = {
        body: {
          article: {
            user_id: testUserId,
            title: "testTitle",
            content: "testContent",
            published_at: new Date(),
            is_public: true,
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

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("正常に終了した場合、作成した記事を返すか", async () => {
      const article = req.body.article;
      (ArticleModel.create as jest.Mock).mockResolvedValue(article);
      await ArticleController.createArticle(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(201);
      expect(jsonMock).toHaveBeenCalledWith(article);
    });

    it("user_idが存在しない場合、400 Bad Requests を返すか", async () => {
      req.body.article.user_id = undefined;

      await ArticleController.createArticle(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(400);
      expect(jsonMock).toHaveBeenCalledWith({ error: "Invalid article data" });
    });

    it("user_id に対応するユーザーが存在しない場合、404 Not Found を返すか", async () => {
      (UserModel.findById as jest.Mock).mockResolvedValue(null);

      await ArticleController.createArticle(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(404);
      expect(jsonMock).toHaveBeenCalledWith({ error: "User not found" });
    });

    it("サーバーエラーが発生した場合、500 Internal Server Error を返すか", async () => {
      (ArticleModel.create as jest.Mock).mockRejectedValue(
        new Error("some other error"),
      );

      await ArticleController.createArticle(req as Request, res as Response);

      expect(statusMock).toHaveBeenCalledWith(500);
      expect(jsonMock).toHaveBeenCalledWith({ error: "some other error" });
    });
  });
});
