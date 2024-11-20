import supabase from "../libs/supabase";

export interface Review {
	id: string;
	article_id: string;
	content: string | null;
	created_at: string;
	updated_at: string;
	user_id: string;
	parent_review_id: string;
	parent_article_id: string;
}

export const ReviewModel = {
	getReviewsByArticleId: async (
		articleId: string, // 取得したい記事のID
		limit: number, // 1ページあたりのデータ件数
		offset: number // 開始位置（スキップする行数）
	) => {
		const { data, error } = await supabase
			.from("review") // "reviews" テーブルを指定
			.select("*") // 全カラムを取得
			.eq("article_id", articleId) // 指定された articleId に一致するデータをフィルタリング
			.order("created_at", { ascending: false }) // 作成日時で降順ソート
			.range(offset, offset + limit - 1); // 範囲を指定してデータ取得
	
		// エラーチェック
		if (error) {
			throw new Error(`Failed to fetch reviews: ${error.message}`);
		}
	
		// レビューリストを返す
		return data;
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
	getUserReviews: (displayId: string) => {
		// テストデータを返す
		return Array(10).fill({
			id: "test-review-id",
			article_id: "test-article-id",
			content: "This is a test review.",
			created_at: new Date(),
			updated_at: new Date(),
			user_id: displayId,
			parent_review_id: null,
			parent_article_id: null,
		});
	},
	deleteReview: (articleId: string, reviewId: string) => {
		// テストデータを返す
		return { success: true };
	},
};
