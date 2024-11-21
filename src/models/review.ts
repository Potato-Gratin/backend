import supabase from "../libs/supabase";

export const ReviewModel = {
	getArticleReviews: (articleId: string, page = 1) => {
		// テストデータを返す
		return Array(10).fill({
			id: "test-review-id",
			article_id: articleId,
			content: "This is a test review.",
			created_at: new Date(),
			updated_at: new Date(),
			user_id: "test-user-id",
			parent_review_id: null,
			parent_article_id: null,
		});
	},
	addReview: (articleId: string, content: string, userId: string) => {
		// テストデータを返す
		return {
			id: "new-review-id",
			article_id: articleId,
			content: content,
			created_at: new Date(),
			updated_at: new Date(),
			user_id: userId,
			parent_review_id: null,
			parent_article_id: null,
		};
	},
	getReviewsByDisplayId: async (
		displayId: string, // 取得したいユーザーのdisplayID
		limit: number, // 1ページあたりのデータ件数
		offset: number, // 開始位置（スキップする行数）
	) => {
		const { data, error } = await supabase
			.from("review") // "reviews" テーブルを指定
			.select("*") // 全カラムを取得
			.eq("display_id", displayId) // 指定された displayId に一致するデータをフィルタリング
			.order("created_at", { ascending: false }) // 作成日時で降順ソート
			.range(offset, offset + limit - 1); // 範囲を指定してデータ取得

		// エラーチェック
		if (error) {
			throw new Error(`Failed to fetch reviews: ${error.message}`);
		}

		// レビューリストを返す
		return data;
	},
	deleteReview: (articleId: string, reviewId: string) => {
		// テストデータを返す
		return { success: true };
	},
};
