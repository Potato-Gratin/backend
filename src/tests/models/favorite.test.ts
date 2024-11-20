import supabase from "../../libs/supabase";
import { FavoriteModel } from "../../models/favorite";

let testArticleId: string;
let testUserId: string;

describe("FavoriteModel", () => {
	beforeAll(async () => {
		const { data: userData, error: userError } = await supabase
			.from("user")
			.insert({
				display_id: "test_display_id",
				name: "test_name",
				description: "test_description",
			})
			.select("*")
			.single();

		if (userError) {
			throw new Error(userError.message);
		}
		testUserId = userData.id;

		const { data: articleData, error: articleError } = await supabase
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

		if (articleError) {
			throw new Error(articleError.message);
		}
		testArticleId = articleData.id;
	});

	afterAll(async () => {
		await supabase.from("article").delete().eq("id", testArticleId);
		await supabase.from("user").delete().eq("id", testUserId);
	});

	beforeEach(async () => {
		await supabase.from("favorite").insert({
			user_id: testUserId,
			article_id: testArticleId,
		});
	});

	afterEach(async () => {
		await supabase.from("favorite").delete().eq("article_id", testArticleId);
	});

	describe("getFavoriteCount", () => {
		it("指定した記事IDのいいね数が正しく取得できるか", async () => {
			const count = await FavoriteModel.getFavoriteCount(testArticleId);
			expect(count).toBe(1);
		});
	});
});
