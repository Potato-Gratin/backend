import supabase from "../../libs/supabase";
import { ArticleModel } from "../../models/article";

let testUserId: string;

describe("ArticleModel", () => {
	beforeAll(async () => {
		const { data: user, error } = await supabase.from("user").insert({
			display_id: "test_display_id",
			name: "test_user_name",
			description: "test_user_description",
		}).select().single();
		if (error) throw error;
		testUserId = user.id;
	});

	beforeEach(async () => {
		await supabase.from("article").delete().eq("user_id", testUserId);
	});

	afterEach(async () => {
		await supabase.from("article").delete().eq("user_id", testUserId);
	});

	afterAll(async () => {
		await supabase.from("user").delete().eq("id", testUserId);
	});

	describe("create", () => {
		it("user_idのみで記事が正常に追加されるか", async () => {
			const article = await ArticleModel.create({ user_id: testUserId });
			expect(article).toMatchObject({
				user_id: testUserId,
				title: null,
				content: null,
				is_public: false,
				view_count: 0,
			});
			expect(article).toHaveProperty("id");
			expect(article).toHaveProperty("created_at");
			expect(article).toHaveProperty("updated_at");
		});

		it("任意データがある場合に記事が正常に追加されるか", async () => {
			const articleData = {
				title: "test_title",
				content: "test_content",
				published_at: new Date().toISOString(),
				is_public: true,
				user_id: testUserId,
			};
			const article = await ArticleModel.create(articleData);
			expect(article).toMatchObject(articleData);
			expect(article).toHaveProperty("id");
			expect(article).toHaveProperty("created_at");
			expect(article).toHaveProperty("updated_at");
		});

		it("エラーが発生した場合に500エラーが返されるか", async () => {
			jest.spyOn(supabase.from("article"), "insert").mockImplementationOnce(() => {
				throw new Error("Internal Server Error");
			});
			await expect(ArticleModel.create({ user_id: testUserId })).rejects.toThrow("Internal Server Error");
		});
	});
});
