import supabase from "../../libs/supabase";
import { ArticleModel } from "../../models/article";

let testArticleId: string;
let testUserId: string;

describe("ArticleModel", () => {
	beforeAll(async () => {
		const { data, error } = await supabase
			.from("user")
			.insert({
				display_id: "test_display_id",
				name: "test_name",
				description: "test_description",
			})
			.select("*")
			.single();

		if (error) {
			throw new Error(error.message);
		}
		testUserId = data.id;
	});

	afterAll(async () => {
		await supabase.from("user").delete().eq("id", testUserId);
	});

	beforeEach(async () => {
		await supabase.from("article").delete().eq("id", testArticleId);
		await supabase.from("favorite").delete().eq("article_id", testArticleId);
		const { data, error } = await supabase
			.from("article")
			.insert({
				title: "test_title",
				content: "test_content",
				published_at: null,
				is_public: false,
				user_id: testUserId,
			})
			.select("*")
			.single();

		if (error) {
			throw new Error(error.message);
		}
		testArticleId = data.id;
	});

	afterEach(async () => {
		await supabase.from("article").delete().eq("id", testArticleId);
		await supabase.from("favorite").delete().eq("article_id", testArticleId);
	});

	describe("findById", () => {
		it("指定したIDの記事が見つかるか", async () => {
			const article = await ArticleModel.findById(testArticleId);
			if (!article) throw new Error("Article not found");

			expect(article).toMatchObject({
				id: testArticleId,
				title: "test_title",
				content: "test_content",
				is_public: false,
				view_count: 0,
				user_id: testUserId,
			});
		});

		it("存在しないIDの場合は null が返されるか", async () => {
			const article = await ArticleModel.findById(
				"00000000-0000-0000-0000-000000000000",
			);
			expect(article).toBeNull();
		});
	});
});
