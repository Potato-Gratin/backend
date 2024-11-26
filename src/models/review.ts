import supabase from "../libs/supabase";

export interface Review {
	id: string;
	article_id: string;
	content: string;
	created_at?: string;
	updated_at?: string;
	user_id: string;
	parent_review_id?: string
	parent_article_id?: string
}

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
	addReview: async (
		article_id: string,
		content: string,
		user_id: string,
		parent_review_id?: string,
		parent_article_id?: string
	) => {
		// 挿入データの初期化
		const reviewData: {
			article_id: string;
			content: string;
			user_id: string;
			parent_review_id?: string; // nullを避ける
			parent_article_id?: string; 
		} = {
			article_id,
			content,
			user_id,
		};
	
		// parent_review_id が指定されている場合
		if (parent_review_id) {
			// 親レビューの情報を確認
			const { data: parentReview, error } = await supabase
				.from("review")
				.select("article_id") // 「記事ID」だけを取得
				.eq("id", parent_review_id) // 親レビューのIDを基準に検索
				.single(); // 1つだけ取得
	
			if (error || !parentReview) {
				// 親レビューが見つからない場合、エラーをスロー
				throw new Error("Invalid parent review ID.");
			}
	
			// 親レビューが存在する場合、その記事IDを `parent_article_id` に設定
			reviewData.parent_review_id = parent_review_id;
			reviewData.parent_article_id = parentReview.article_id;
		}
	
		// Supabase にデータを挿入
		const { data, error } = await supabase
			.from("review")
			.insert([reviewData]) // 配列でラップして渡す
			.select();
	
		if (error) {
			throw new Error(`Failed to add review: ${error.message}`);
		}
	
		return data[0]; // 挿入されたレビューを返す
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
